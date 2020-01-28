const fs = require('fs');
const args = require('yargs').argv;
const fetch = require('node-fetch');
const orderBy = require('lodash.orderby');
const issuesFragment = require('./issuesFragment');
const ChangelogTemplate = require('./ChangelogTemplate');
const getIssueMeta = require('./getIssueMeta');

const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const authToken = process.env.GITHUB_AUTH_TOKEN;
const branch = process.env.CIRCLE_BRANCH;
const changelogLabel = process.env.CHANGELOG_LABEL;

const fetchIssuesGroupedByVersion = async () => {
  const issueQueryResponse = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${authToken}` },
    body: JSON.stringify({
      query: `query issues {
        repository(owner: "${owner}", name: "${repo}") {
          ${issuesFragment}
        }
      }`,
    }),
  }).then(res => res.json());
  const releases = new Map();
  issueQueryResponse.data.repository.issues.nodes.forEach((issue) => {
    const isInvalid = issue.labels.nodes.some(({ name }) => name.includes('Rejected') || name.includes('Duplicate') || !name.includes(changelogLabel));
    const issueMeta = getIssueMeta(issue.comments.nodes);
    if (!isInvalid && issueMeta) {
      releases.set(issueMeta, [...(releases.get(issueMeta) || []), issue]);
    }
  }, {});
  const arrayOfVersions = [];
  releases.forEach((issues, issueMeta) => {
    const { version, deployedAt } = JSON.parse(issueMeta);
    arrayOfVersions.push({ version, deployedAt, issues });
  });
  return orderBy(arrayOfVersions, 'version', 'desc');
};

const createChangelog = async () => {
  const closedIssuesFileContent = fs.readFileSync(args.input);
  const closedIssues = closedIssuesFileContent && JSON.parse(closedIssuesFileContent);
  let newIssues = [];
  const oldIssuesGroupedByLabel = await fetchIssuesGroupedByVersion();
  if (closedIssues && closedIssues.issues && closedIssues.issues.length !== 0) {
    const deployedAt = new Date().toISOString();
    newIssues = [{ version: branch, deployedAt, issues: closedIssues.issues }];
    await Promise.all(closedIssues.issues.map(({ number }) => fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}/comments`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `bearer ${authToken}`,
      },
      body: JSON.stringify({
        body: `Issue has been deployed in **${branch}**.<!--${JSON.stringify({ version: branch, deployedAt })}-->`,
      }),
    })));
  }
  const HTML = ChangelogTemplate({
    versions: [
      ...newIssues,
      ...oldIssuesGroupedByLabel.map(({ version, deployedAt, issues }) => ({
        version,
        deployedAt,
        issues,
      })),
    ],
  });
  fs.writeFileSync(args.output, HTML);
};

createChangelog();

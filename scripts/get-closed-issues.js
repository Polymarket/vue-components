const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const args = require('yargs').argv;
const fetch = require('node-fetch');
const issuesFragment = require('./issuesFragment');
const getIssueMeta = require('./getIssueMeta');

const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const authToken = process.env.GITHUB_AUTH_TOKEN;
const branch = process.env.CIRCLE_BRANCH;
const developmentBranch = process.env.DEVELOPMENT_BRANCH;
const changelogLabel = process.env.CHANGELOG_LABEL;

const getClosedIssues = async () => {
  const { stdout } = await exec(`git rev-list --right-only --count origin/${branch}...origin/${developmentBranch}`);
  const commitsBehindDevelopmentBranch = Number.parseInt(stdout);
  console.log(`Commits behind development branch (${developmentBranch}):`, commitsBehindDevelopmentBranch);
  let newIssues = [];
  if (commitsBehindDevelopmentBranch === 0) {
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
    const issues = issueQueryResponse.data.repository.issues.nodes;
    newIssues = issues.filter(({ comments, labels }) => {
      const isInvalid = labels.nodes.some(({ name }) => name.includes('Rejected') || name.includes('Duplicate') || !name.includes(changelogLabel));
      const issueMeta = getIssueMeta(comments.nodes);
      return !isInvalid && !issueMeta;
    });
  }
  fs.writeFileSync(args.output, JSON.stringify({ issues: newIssues }));
};

getClosedIssues();

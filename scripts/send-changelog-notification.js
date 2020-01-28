const fs = require('fs');
const fetch = require('node-fetch');
const args = require('yargs').argv;

const branch = process.env.CIRCLE_BRANCH;
const slackUrl = process.env.SLACK_WEBHOOK_URL;

const sendChangelog = async () => {
  const closedIssuesFileContent = fs.readFileSync(args.input);
  const closedIssues = closedIssuesFileContent && JSON.parse(closedIssuesFileContent);
  if (closedIssues && closedIssues.issues && closedIssues.issues.length !== 0) {
    await fetch(slackUrl, {
      method: 'POST',
      body: JSON.stringify({
        username: `${branch}`,
        text: `_New version deployed_ \n${closedIssues.issues.reduce((acc, { title, url, number }) => `${acc}- ${title} <${url}|#${number}> \n`, '')}`,
        mrkdwn: true,
      }),
    });
  }
};

sendChangelog();

const issuesFragment = `issues(first: 100, states: CLOSED, orderBy: {field: UPDATED_AT, direction: DESC}) {
  nodes {
    number
    title
    body
    bodyHTML
    createdAt
    closedAt
    comments(last: 5) {
      nodes {
        body
      }
    }
    assignees(first: 10) {
      nodes {
        name
      }
    }
    labels(first: 15) {
      nodes {
        name
      }
    }
    url
  }
}`;

module.exports = issuesFragment;

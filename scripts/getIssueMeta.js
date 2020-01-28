const htmlCommentRegex = /.*<!--+({.*})+-->.*/;

const getIssueMeta = (comments) => {
  const issueMeta = comments.reduce((acc, { body }) => {
    const hasComment = htmlCommentRegex.test(body);
    if (hasComment) {
      return body.replace(htmlCommentRegex, '$1');
    }
    return acc;
  }, null);
  return issueMeta;
};

module.exports = getIssueMeta;

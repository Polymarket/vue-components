const ChangelogTemplate = ({ versions }) => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Changelog</title>
      <meta name="description" content="Change-log">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    </head>
    <body>
      <div class="container mt-3 mb-3">
        <div class="row justify-content-center">
          <h1>Change-log</h1>
        </div>
        ${versions.reduce((acc, { version, deployedAt, issues }) => `
          ${acc}
          <div class="accordion" id="accordionId">
            <h3>${version}</h3>
            <em>${deployedAt}</em>
            <div class="mt-3 mb-3">
              ${issues.reduce((acc, {
    number, url, title, createdAt, closedAt, bodyHTML, assignees,
  }) => `
                ${acc}
                <div class="card">
                  <div class="card-header" id="${title}">
                    <a data-toggle="collapse" href="#issue-${number}">
                      #${number} ${title}
                    </a>
                  </div>
                  <div class="collapse" id="issue-${number}">
                    <div class="card-body">
                      <em class="mb-2">
                        created at: ${createdAt}
                      </em>
                      <em class="mb-2">
                        closed at: ${closedAt}
                      </em>
                      <em class="mb-2">
                        assignees: ${assignees.nodes.map(({ name }) => name).join(', ')}
                      </em>
                      <div>${bodyHTML}</div>
                      <a href="${url}" target="_blank">link to issue</a>
                    </div>
                  </div>
                </div>`, '')}
            </div>
          </div>
        `, '')}
      </div>
    </body>
  </html>
`;

module.exports = ChangelogTemplate;

// stores IN MEMORY
const users = {};

// process file ()
const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  response.write(content);
  response.end();
};

// return current collection of people/entries
const getUsers = (request, response) => {
  const responseJSON = {
    users: Object.values(users), // Converts user objects into an array
  };

  respondJSON(request, response, 200, responseJSON);
};

// Not Found handler
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  notFound,
};

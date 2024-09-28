const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// end points collection
const urlStruct = {
  // INSERT ENDPOINTS
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCss,
  '/getUsers': jsonHandler.getUsers,
  '/notReal': jsonHandler.notReal,
};

// handle navigation
const onRequest = (request, response) => {
  // DO THINGS HERE
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    jsonHandler.notFound(request, response);
  }
};

// server start
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});

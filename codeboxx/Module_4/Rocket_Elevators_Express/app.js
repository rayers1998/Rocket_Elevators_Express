// Import the express module to create a web application
const express = require('express');

// Import the dotenv module to load environment variables from the .env file
const dotenv = require('dotenv');
// Load the environment variables from the .env file into process.env
dotenv.config();

// Create an instance of the express application
const app = express();

// Use middleware to parse JSON for incoming requests
app.use(express.json());

// Define the port on which the server will listen, using an environment variable or defaulting to 3000 if not defined
const port = process.env.PORT || 3000;

// Import route handlers from separate route modules
const helloRouter = require('./routes/hello');
const statusRouter = require('./routes/status');
const errorRouter = require('./routes/error');
const emailListRouter = require('./routes/emailList');
const regionAvgRouter = require('./routes/regionAvg');
const calcResidentialRouter = require('./routes/calcResidential');
const contactUsRouter = require('./routes/contactUs');

// Mount the route handlers for each path
app.use('/hello', helloRouter); // Handles requests to /hello
app.use('/status', statusRouter); // Handles requests to /status
app.use('/error', errorRouter); // Handles requests to /error
app.use('/email-list', emailListRouter); // Handles requests to /email-list
app.use('/region-avg', regionAvgRouter); // Handles requests to /region-avg
app.use('/calc-residential', calcResidentialRouter); // Handles requests to /calc-residential
app.use('/contact-us', contactUsRouter); // Handles POST requests to /contact-us

// Start the server to listen on the specified port
app.listen(port, () => {
  // Display a message in the server console once the server has started and is listening on the port
  console.log(`Server listening on port ${port}`);
});

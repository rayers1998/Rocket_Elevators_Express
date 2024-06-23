// Import the Express module to create a new router.
const express = require('express');
const router = express.Router();

// Define a GET endpoint at the root path of the router ('/').
router.get('/', (req, res) => {
  // Respond to the client with an HTTP status code 500, indicating an internal server error.
  // Send a JSON response containing an 'error' key with a message explaining the error.
  res.status(500).send({ error: 'An error has occurred' });
});

// Export the router object to be used in the main application file (e.g., app.js).
// This allows the main application to include this router and associate it with a specific path.
module.exports = router;

// Import the express module to set up the router
const express = require('express');
const router = express.Router();

// Define a GET route at the root path of the router
// This route will be accessible via /status when mounted by app.js
router.get('/', (req, res) => {
  // Get the port from environment variables or default to 3000
  const port = process.env.PORT || 3000;
  // Get the environment from environment variables or default to 'development'
  const environment = process.env.ENVIRONMENT || 'development';
  // Send a response with the port and environment where the server is running
  res.send(`Server running on port: ${port} in ${environment} environment.`);
});

// Export the router to be used in the main app.js file
module.exports = router;

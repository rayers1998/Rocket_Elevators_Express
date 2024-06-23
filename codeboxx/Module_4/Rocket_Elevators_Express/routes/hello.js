// Import the express module to create a router
const express = require('express');
const router = express.Router();

// Define a GET route at the root of the router
router.get('/', (req, res) => {
// Get the port on which the server is running from environment variables, or use 3000 by default
  const port = process.env.PORT || 3000;
  
// Log to the server console which port the server is running on
  console.log(`Server is running on port: ${port}`);
  
// Send a response to the client with the text 'Hello World'
  res.send('Hello World');
});

// Export the router so it can be used in the main app.js file
module.exports = router;

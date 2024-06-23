// Import the Express module to create and manage server routes
const express = require('express');
// Create a new router object to handle routes
const router = express.Router();

// Define a POST route at the root path of this router
router.post('/', (req, res) => {
  // Extract data from the request body
  const { first_name, last_name, message } = req.body;

  // Check if all required data is provided
  // If any of the required fields are missing, send a 400 Bad Request response with an error message
  if (!first_name || !last_name || !message) {
    return res.status(400).json({ error: "Please provide the first name, last name, and message." });
  }

  // Create a response object with the sender's full name and their message
  const response = {
    sender: `${first_name} ${last_name}`,
    message: message
  };

  // Log the response object to the server console for debugging purposes
  console.log(response);

  // Send the response object back to the client with a 200 OK status
  res.status(200).json(response);
});

// Export the router for use in the main app.js file
module.exports = router;

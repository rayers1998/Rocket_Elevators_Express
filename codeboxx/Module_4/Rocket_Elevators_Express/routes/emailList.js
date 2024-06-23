// Import the express module to set up the router
const express = require('express');
const router = express.Router();

// Import agent data from the 'agents.js' file located in the parent directory
const agentData = require('../agents'); 

// Define a GET route at the root path of the router
router.get('/', (req, res) => {
  // Extract the email of each agent using the .map() method
  // Convert the array of emails into a single string with emails separated by a comma and a space using .join()
  const emailList = agentData.map(agent => agent.email).join(', ');
  
  // Send the email list as the response to the client's request
  res.send(emailList);
});

// Export the router to be used in the main application file (app.js)
// This allows integrating this router into the main application
module.exports = router;

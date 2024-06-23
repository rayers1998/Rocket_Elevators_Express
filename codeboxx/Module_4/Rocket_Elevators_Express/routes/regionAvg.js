// Import the express module to set up the router
const express = require('express');
const router = express.Router();

// Import agent data from a file located in the parent directory
const agentData = require('../agents');

// Define the GET route for '/region-avg' to be mounted in app.js
// This route returns the average ratings and fees for agents in a given region
router.get('/', (req, res) => {
  // Extract the 'region' parameter from the query string
  const { region } = req.query;

  // Check if the 'region' parameter is provided, if not, send a 400 error
  // This ensures that the client provides the required 'region' parameter in their request
  if (!region) {
    return res.status(400).send({ message: 'The region parameter is required.' });
  }

  // Filter agents to find those in the specified region
  // This creates a new array containing only agents whose 'region' matches the provided 'region' parameter
  const agentsInRegion = agentData.filter(agent => agent.region.toLowerCase() === region.toLowerCase());

  // If no agents are found in the region, return a 404 error
  // This handles the case where the specified region has no agents
  if (agentsInRegion.length === 0) {
    return res.status(404).send({ message: `No agents found in the region: ${region}.` });
  }

  // Calculate the total ratings and fees for agents in the region
   const total = agentsInRegion.reduce((acc, current) => {
    return {
      totalRating: acc.totalRating + parseFloat(current.rating), // Sum up the ratings
      totalFee: acc.totalFee + parseFloat(current.fee), // Sum up the fees
      count: acc.count + 1 // Count the number of agents
    };
  }, { totalRating: 0, totalFee: 0, count: 0 });

  // Compute the average ratings and fees
  const averageRating = (total.totalRating / total.count).toFixed(2);
  const averageFee = (total.totalFee / total.count).toFixed(2);

  // Send the result in JSON format with the region, average rating, and average fee
  // This responds to the client with the calculated averages
  res.json({
    region: region, // The region for which the averages were calculated
    average_rating: parseFloat(averageRating), // The average rating of agents in the region
    average_fee: parseFloat(averageFee) // The average fee of agents in the region
  });
});

// Export the router to be used in the main app.js file
// This allows the main app.js to include this router and set up the route
module.exports = router;

// Import the express module to create a router
const express = require('express');
// Create a new router object to handle routes
const router = express.Router();

// Define a GET route at the root path of this router
router.get('/', (req, res) => {
  // Extract the apartments, floors, and tier parameters from the query string of the request
  const { apartments, floors, tier } = req.query;

  // Check if the tier is valid by ensuring it is one of the allowed values ('standard', 'premium', or 'excelium')
  if (!['standard', 'premium', 'excelium'].includes(tier)) {
    // If the tier is invalid, send a 400 Bad Request response with an error message
    return res.status(400).send({ message: 'Invalid category.' });
  }

  // Check if apartments and floors are numbers
  // isNaN returns true if the value is not a number
  if (isNaN(apartments) || isNaN(floors)) {
    // If either apartments or floors are not numbers, send a 400 Bad Request response with an error message
    return res.status(400).send({ message: 'Apartments and floors must be numbers.' });
  }

  // Check if apartments and floors are integers
  // Number.isInteger checks if the value is an integer
  if (!Number.isInteger(+apartments) || !Number.isInteger(+floors)) {
    // If either apartments or floors are not integers, send a 400 Bad Request response with an error message
    return res.status(400).send({ message: 'Apartments and floors must be integers.' });
  }

  // Check if apartments and floors are greater than zero
  if (+apartments <= 0 || +floors <= 0) {
    // If either apartments or floors are less than or equal to zero, send a 400 Bad Request response with an error message
    return res.status(400).send({ message: 'Apartments and floors must be greater than zero.' });
  }

  // Calculate the number of required elevators and the total cost
  const { elevatorsRequired, totalCost } = calculateElevatorsAndCost(+apartments, +floors, tier);

  // Send the calculated results in JSON format
  res.json({ elevatorsRequired, totalCost });
});

// Function to calculate the number of required elevators and the total cost
const calculateElevatorsAndCost = (apartments, floors, tier) => {
  // Calculate the number of elevators required by dividing the number of apartments by the number of floors and then by 2 (assuming 2 apartments per elevator per floor)
  const elevatorsRequired = Math.ceil(apartments / floors / 2);

  // Determine the cost per elevator based on the tier
  const costPerElevator = tier === 'standard' ? 10000 : tier === 'premium' ? 15000 : 20000;

  // Calculate the total cost by multiplying the number of elevators required by the cost per elevator
  const totalCost = elevatorsRequired * costPerElevator;

  // Return an object containing the number of elevators required and the total cost
  return { elevatorsRequired, totalCost };
};

// Export the router so it can be used in the main app.js file
module.exports = router;

const express = require('express');
const multer = require('multer');
const Sequelize = require('sequelize');
const csvtojson = require('csvtojson');

const JsonDataModel = require('./models/json_data_model');

const app = express();

// Configure Multer
const uploadMiddleware = multer({
  dest: './uploads/'
});

// Define the endpoint for uploading CSV files
app.post('/upload-csv', uploadMiddleware.single('csvFile'), async (req, res) => {
  // Get the CSV file from the request
  const csvFile = req.file;

  // Convert the CSV file to JSON
  const jsonData = await csvtojson.fromFile(csvFile.path);

  // Create a new `JsonDataModel` instance
  const jsonDataModel = new JsonDataModel();
  jsonDataModel.json_data = jsonData;

  // Save the `JsonDataModel` instance to the database
  await jsonDataModel.save();

  // Send a response to the user
  res.status(200).json({ message: 'CSV file uploaded successfully' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});



const express = require('express');
const Sequelize = require('sequelize');
const csvtojson = require('csvtojson');

const JsonDataModel = require('./models/json_data_model');

const app = express();

// Define the endpoint for uploading CSV files
app.post('/upload-csv', async (req, res) => {
  // Get the CSV file from the request
  const csvFile = req.files.csvFile;

  // Convert the CSV file to JSON
  const jsonData = await csvtojson.fromFile(csvFile.path);

  // Create a new `JsonDataModel` instance
  const jsonDataModel = new JsonDataModel();
  jsonDataModel.json_data = jsonData;

  // Save the `JsonDataModel` instance to the database
  await jsonDataModel.save();

  // Send a response to the user
  res.status(200).json({ message: 'CSV file uploaded successfully' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


const Sequelize = require('sequelize');

const sequelize = new Sequelize('csv_to_json_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const JsonDataModel = sequelize.define('json_data', {
  json_data: Sequelize.JSON
});

module.exports = JsonDataModel;
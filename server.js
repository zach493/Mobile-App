const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const app = express();

app.use(cors());  // To enable Cross-Origin Resource Sharing (CORS) for the web client

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'flights.cdiagk8o8g4x.ap-southeast-1.rds.amazonaws.com', // Your RDS endpoint
  user: 'admin', // Your RDS username
  password: 'xx6UM3oJEa72Hjo5TbmV', // Your RDS password
  database: 'flights', // Your RDS database name
  port: 3306, // MySQL default port
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    process.exit(1); // Exit the application if DB connection fails
  } else {
    console.log('Connected to the database');
  }
});

// Endpoint to fetch all flights
app.get('/flight_info', (req, res) => {
  db.query('SELECT * FROM flight_info', (err, results) => {
    if (err) {
      console.error('Error fetching flight data:', err);
      res.status(500).send('Error fetching flight data');
    } else {
      res.json(results);
    }
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).send('Error fetching user data');
    } else {
      res.json(results);
    }
  });
});

app.get('/bookings', (req, res) => {
  db.query('SELECT * FROM bookings', (err, results) => {
    if (err) {
      console.error('Error fetching booking data:', err);
      res.status(500).send('Error fetching booking data');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to fetch a specific flight by ID
app.get('/flight_info/:id', (req, res) => {
  const flightId = req.params.id;
  db.query('SELECT * FROM flight_info WHERE flight_id = ?', [flightId], (err, results) => {
    if (err) {
      console.error('Error fetching flight details:', err);
      res.status(500).send('Error fetching flight details');
    } else {
      res.json(results[0]);
    }
  });
});

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next(); // Pass the request to the next middleware
});

// Load the SSL certificate and private key
const sslOptions = {
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('cert.pem'),
};

// Create HTTPS server
https.createServer(sslOptions, app).listen(3660, () => {
  console.log('HTTPS Server running on https://localhost:3660');
});

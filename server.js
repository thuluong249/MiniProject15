// Dependencies

const express = require("express");
const path = require("path");

// Sets up the Express App

const app = express();
const PORT = process.env.Port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// (DATA)

const table = [];

const waitlist = [];

// Routes

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "homepage.html")));

app.get("/reservation", (req, res) =>
  res.sendFile(path.join(__dirname, "reservation.html"))
);
app.get("/viewtable", (req, res) =>
  res.sendFile(path.join(__dirname, "viewtable.html"))
);

// Displays all characters
app.get("/api/table", (req, res) => {
  return res.json(table);
});

// Displays a single character, or returns false
app.get("/api/waitlist", (req, res) => {
  return res.json(waitlist);
});

// Create New Characters - takes in JSON input
app.post("/api/table", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const reservation = req.body;

  if (table.length < 5) {
    table.push(reservation);
  } else {
    waitlist.push(reservation);
  }
  res.json(reservation);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

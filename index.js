const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = "mongodb+srv://Ticket-db:likpHHxHMFOMHlJt@cluster0.cyspe14.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const db = client.db('Ticket-db');
    const ticketCollection = db.collection('Tickets');

    // GET ALL TICKETS
    app.get('/Tickets', async (req, res) => {
      const result = await ticketCollection.find().toArray(); // FIXED
      res.send(result);
    });

    console.log("Connected to MongoDB");
  } finally {}
}

run().catch(console.dir);

// Server Start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('Server is Running!')
})

async function run() {
  try {
    await client.connect();

    const db = client.db('Ticket-db');
    const ticketCollection = db.collection('Tickets');

    app.get('/Tickets', async (req, res) => {
      const result = await ticketCollection.find().toArray();
      res.send(result);
    });

    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(error);
  }
}
run();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

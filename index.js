const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 5000;

// ENABLE CORS
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = "mongodb+srv://Ticket-db:likpHHxHMFOMHlJt@cluster0.cyspe14.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // CONNECT to DB
    await client.connect();

    const db = client.db("Ticket-db");
    const ticketCollection = db.collection("Tickets");

    // GET All Tickets
    app.get("/Tickets", async (req, res) => {
      try {
        const result = await ticketCollection.find().toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: "Internal Server Error" });
      }
    });

    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error(err);
  }
}

run();

// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("Server is Running!");
});

// START SERVER
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

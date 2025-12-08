const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = 5000;
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
    // ✅ Mongo Connect
   // await client.connect();

    const db = client.db("Ticket-db");
    const ticketCollection = db.collection("Tickets");

    // ✅ GET All Tickets
    app.get("/Tickets", async (req, res) => {
      const result = await ticketCollection.find().toArray();
      res.send(result);
    });

    // ✅ ✅ ✅ GET Single Ticket by ID (THIS IS YOUR FIX)
    app.get("/Tickets/:id", async (req, res) => {
      const id = req.params.id;

      const result = await ticketCollection.findOne({
        _id: new ObjectId(id),
      });

      if (!result) {
        return res.status(404).send({ message: "Ticket not found" });
      }

      res.send(result);
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

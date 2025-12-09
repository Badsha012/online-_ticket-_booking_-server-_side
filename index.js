const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri =
  "mongodb+srv://Ticket-db:likpHHxHMFOMHlJt@cluster0.cyspe14.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const db = client.db("Ticket-db");
    const ticketCollection = db.collection("Tickets");
    const bookingsCollection = db.collection("Booking");

    // ✅ GET all tickets
    app.get("/tickets", async (req, res) => {
      const result = await ticketCollection.find().toArray();
      res.send(result);
    });

    // ✅ GET single ticket
    app.get("/tickets/:id", async (req, res) => {
      const id = req.params.id;
      const result = await ticketCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // ✅ GET all bookings
    app.get("/booking", async (req, res) => {
      const result = await bookingsCollection.find().toArray();
      res.send(result);
    });

    // 🔥🔥🔥 MOST IMPORTANT → POST BOOKING API 
    app.post("/booking", async (req, res) => {
      const bookingData = req.body;
      const result = await bookingsCollection.insertOne(bookingData);
      res.send(result);
    });

    // ✅ PATCH booking status
    app.patch("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;
      const result = await bookingsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );
      res.send(result);
    });

    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error(err);
  }
}

run();

// Default route
app.get("/", (req, res) => {
  res.send("Server is Running!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

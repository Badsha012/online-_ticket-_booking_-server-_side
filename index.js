const express = require('express')
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express()
const port = 5000

const uri = "mongodb+srv://Ticket-db:likpHHxHMFOMHlJt@cluster0.cyspe14.mongodb.net/?appName=Cluster0";

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // MUST CONNECT HERE
    //await client.connect();

    const db = client.db('Ticket-db')
    const ticketCollection = db.collection('Tickets')

    // GET ALL TICKETS API
    app.get('/Tickets', async (req, res) => {
      const result = await ticketCollection.find().toArray(); // FIXED
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB Successfully!");

  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

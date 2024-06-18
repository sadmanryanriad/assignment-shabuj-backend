const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ni8nft9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const upcomingEventImages = client
      .db("sge")
      .collection("upcoming-event-img");
    const marqueeList = client.db("sge").collection("marquee-list");

    //get upcoming event images
    app.get("/upcoming-events", async (req, res) => {
      try {
        const result = await upcomingEventImages.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res
          .status(500)
          .send({ error: "An error occurred while fetching upcoming events" });
      }
    });
    //get marquee list
    app.get("/marquee-list", async (req, res) => {
      try {
        const result = await marqueeList.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res
          .status(500)
          .send({ error: "An error occurred while fetching upcoming events" });
      }
    });
    const SuccessStoryList = client.db("sge").collection("success-story-list");
    //get success-story-list
    app.get("/success-story-list", async (req, res) => {
      try {
        const result = await SuccessStoryList.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res
          .status(500)
          .send({ error: "An error occurred while fetching upcoming events" });
      }
    });
    const eventList = client.db("sge").collection("event-list");
    //get event-list
    app.get("/event-list", async (req, res) => {
      try {
        const result = await eventList.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res
          .status(500)
          .send({ error: "An error occurred while fetching upcoming events" });
      }
    });
    const consultationForms = client.db("sge").collection("consultation-forms");
    //insert consultation forms data into database
    app.post("/consultation-forms", async (req, res) => {
      try {
        const formData = req.body;
        const result = await consultationForms.insertOne(formData);
        res.send(result);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res
          .status(500)
          .send({ error: "An error occurred while fetching upcoming events" });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

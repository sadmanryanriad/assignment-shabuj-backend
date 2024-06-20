const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    //delete event by id
    app.delete("/upcoming-events/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await upcomingEventImages.deleteOne(query);
        res.send(result);
      } catch (error) {
        req.send({ error: "An error occurred while fetching upcoming events" });
      }
    });
    //add upcoming event image
    app.post("/upcoming-events", async (req, res) => {
      try {
        const formData = req.body;
        const result = await upcomingEventImages.insertOne(formData);
        res.send(result);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res
          .status(500)
          .send({ error: "An error occurred while fetching upcoming events" });
      }
    });

    const marqueeList = client.db("sge").collection("marquee-list");
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
    //delete marquee-list id
    app.delete("/marquee-list/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await marqueeList.deleteOne(query);
        res.send(result);
      } catch (error) {
        req.send({ error: "An error occurred while fetching upcoming events" });
      }
    });
    //add marquee-list image
    app.post("/marquee-list", async (req, res) => {
      try {
        const formData = req.body;
        const result = await marqueeList.insertOne(formData);
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
    //add success-story-list
    app.post("/success-story-list", async (req, res) => {
      try {
        const formData = req.body;
        const result = await SuccessStoryList.insertOne(formData);
        res.send(result);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res
          .status(500)
          .send({ error: "An error occurred while fetching upcoming events" });
      }
    });
    //delete success-story-list by id
    app.delete("/success-story-list/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await SuccessStoryList.deleteOne(query);
        res.send(result);
      } catch (error) {
        req.send({ error: "An error occurred while fetching upcoming events" });
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
    //add success-story-list
    app.post("/event-list", async (req, res) => {
      try {
        const formData = req.body;
        const result = await eventList.insertOne(formData);
        res.send(result);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res
          .status(500)
          .send({ error: "An error occurred while fetching upcoming events" });
      }
    });
    //delete success-story-list by id
    app.delete("/event-list/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await eventList.deleteOne(query);
        res.send(result);
      } catch (error) {
        req.send({ error: "An error occurred while fetching upcoming events" });
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
    //get consultation forms data
    app.get("/consultation-forms", async (req, res) => {
      try {
        const result = await consultationForms.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res
          .status(500)
          .send({ error: "An error occurred while fetching upcoming events" });
      }
    });
      //delete consultation Form by id
      app.delete("/consultation-forms/:id", async (req, res) => {
        try {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          const result = await consultationForms.deleteOne(query);
          res.send(result);
        } catch (error) {
          req.send({ error: "An error occurred while fetching upcoming events" });
        }
      });


      const coreStrength = client.db("sge").collection("core-strengths");
      //get core Strength
      app.get("/core-strength", async (req, res) => {
        try {
          const result = await coreStrength.find().toArray();
          res.send(result);
        } catch (error) {
          console.error("Error fetching upcoming events:", error);
          res
            .status(500)
            .send({ error: "An error occurred while fetching upcoming events" });
        }
      });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

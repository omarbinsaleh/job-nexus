require('dotenv').config();
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@main.yolij.mongodb.net/?retryWrites=true&w=majority&appName=Main`
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fev0e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})


async function run() {
  try {
    // create data base and collections:
    const db = client.db('Job_Nexus');
    const jobsCollection = db.collection('jobs'); // jobs collections

    // the default route:
    app.get('/', (req, res) => {
      res.send('Hello from Job Nexus Server....')
    })

    // the hello routes:
    app.get('/hello', (req, res) => {
      res.send({message:"Hello World"});
    });

    // add job:
    app.post('/jobs/add', async (req, res) => {
      const data = req.body;
      const result = await jobsCollection.insertOne(data);
      res.send(result);
    });

    // get all jobs
    app.get('/jobs', async(req, res) => {
      const data = await jobsCollection.find().toArray()
      res.send(data);
    })

    // Send a ping to confirm a successful connection
    // await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)


app.listen(port, () => console.log(`Server running on port ${port}`))

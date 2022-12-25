const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MongoDB_User}:${process.env.MongoDB_PASS}@cluster0.ugwei28.mongodb.net/?retryWrites=true&w=majority
`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    client.connect();

    const AuthenticationUsers = client
      .db("authentication-users")
      .collection("all-users-collection");
    console.log("connect");

    app.put("/users/:email", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          user: user,
        },
      };
      const result = await AuthenticationUsers.updateOne(
        filter,
        updateDoc,
        options
      );

      res.send({ result, status: 200, success: true });
    });

    // viewers
    app.get("/viewUser/:email", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          user: user,
        },
      };
      const email = req.params.email;
      const query = { email: email };
      const result = await AuthenticationUsers.findOne(query);
      res.send(result);
    });

    // viewers
    app.get("/update/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await AuthenticationUsers.findOne(query);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(" Authentication server is Running");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

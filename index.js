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

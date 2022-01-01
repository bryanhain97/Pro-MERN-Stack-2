const { MongoClient } = require('mongodb');
require('dotenv').config();
const client = new MongoClient(
    process.env.MONGODB_ATLAS_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

module.exports = async function runDb() {
    try {
        await client.connect();
        const database = client.db('ProMernStackV2');
        const issues = database.collection('issues');
        const query = { name: { first: "John", last: "Doe" } };
        const issue = await issues.findOne(query);
        console.log(issue);
    }
    finally {
        client.close();
    }
}
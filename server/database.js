require('dotenv').config();

const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_ATLAS_URI;

function testWithCallbacks(callback) {
    console.log('\n--- testWithCallbacks ---');
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect((err, client) => {
        if (err) {
            callback(err);
            return;
        }
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('employees');
        const employee = { id: 1, name: 'A. Callback', age: 23 };
        collection.insertOne(employee, (err, result) => {
            if (err) {
                client.close();
                callback(err);
                return;
            }
            console.log('Result of insert:\n', result.insertedId);
            collection.find({ _id: result.insertedId })
                .toArray((err, docs) => {
                    if (err) {
                        client.close();
                        callback(err);
                        return;
                    }
                    console.log('Result of find:\n', docs);
                    client.close();
                    callback(err);
                })
        })
    })
}

testWithCallbacks(err => {
    if (err) {
        console.log(err)
    }
})
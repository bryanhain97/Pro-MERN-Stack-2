const express = require('express');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const app = express();

let aboutMessage = "Issue Tracker API v1.0";
const issueDB = [
    { id: 1, status: 'New', owner: 'Ravan', effort: 5, created: new Date('2019-01-15'), due: undefined, title: 'Error in console when clicking Add' },
    { id: 2, status: 'Assigned', owner: 'Eddie', effort: 14, created: new Date('2019-01-16'), due: new Date('2019-02-01'), title: 'Missing bottom border on panel' }
]
const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList,
    },
    Mutation: {
        setAboutMessage,
    },
};
function issueList() {
    return issueDB;
}
function setAboutMessage(_, { message }) {
    return aboutMessage = message;
};

const GraphQLServer = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
});

app.use(express.static('./public'));

GraphQLServer.applyMiddleware({ app, path: '/graphql' });
app.listen(3000, () => console.log(`App started on PORT 3000`));
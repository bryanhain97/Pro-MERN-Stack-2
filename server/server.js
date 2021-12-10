const express = require('express');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const app = express();

let aboutMessage = "Issue Tracker API v1.0";

const resolvers = {
    Query: {
        about: () => aboutMessage
    },
    Mutation: {
        setAboutMessage,
    },
};
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
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

let aboutMessage = "Issue Tracker API v1.0";

const typeDefs = `
type Query {
    about: String!
}
type Mutation {
    setAboutMessage(message: String!): String
}
`;
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
}
const GraphQLServer = new ApolloServer({ typeDefs, resolvers });
const app = express();

app.use(express.static('./public'));

GraphQLServer.applyMiddleware({ app, path: '/graphql' });
app.listen(3000, () => console.log(`App started on PORT 3000`));
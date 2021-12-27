const express = require('express');
const fs = require('fs');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const app = express();
const { Kind } = require('graphql/language');

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        const dateValue = new Date(value);
        return Number.isNaN(dateValue.getTime()) ? undefined : dateValue;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            const value = new Date(ast.value);
            return Number.isNaN(value.getTime()) ? undefined : value;
        }
        return undefined;
    },
})

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
        issueAdd
    },
    GraphQLDate
};
function issueList() {
    return issueDB;
}
function setAboutMessage(_, { message }) {
    return aboutMessage = message;
};
function issueAdd(_, { issue }) {
    issueValidate(_, { issue });
    issue.created = new Date();
    issue.id = issueDB.length + 1;
    if (issue.status == undefined) issue.status = 'New';
    issueDB.push(issue);
    return issue;
}
function issueValidate(_, { issue }) {
    const errors = [];
    if (issue.title.length < 3) {
        errors.push('Field "title" must be at least 3 characters long.')
    }
    if (issue.status == 'Assigned' && !issue.owner) {
        errors.push('Field "owner" is required when status is "Assigned"');
    }
    if (errors.length > 0) throw new UserInputError('Invalid input(s)', { errors })
}
const GraphQLServer = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    }
});

app.use(express.static('./public'));

GraphQLServer.applyMiddleware({ app, path: '/graphql' });
app.listen(3000, () => console.log(`App started on PORT 3000`));
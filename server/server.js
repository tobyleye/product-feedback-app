const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

app = express();

const MONGO_URI =
  "mongodb://127.0.0.1:27017/productfeedbackdb?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(() => {console.log('db connected')})
    .catch(() => {console.log('error connecting db')})

app.get('/healthcheck', (req, res) => {
    res.json('EVERYTHING SEEM FINE')
})

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.listen(3000, () => console.log('app is running on port 3000'))
const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const session = require('express-session')
const todoRoutes = require('./routes/todos')
const passport = require('passport')
const cors = require('cors')

app = express();

const MONGO_URI =
  "mongodb://127.0.0.1:27017/productfeedbackdb?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(() => {console.log('db connected')})
    .catch(() => {console.log('error connecting db')})

app.use(session({
    secret: 'session secret',
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.get('/healthcheck', (req, res) => {
    res.json('EVERYTHING SEEM FINE')
})

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.use('/todos', todoRoutes)

app.listen(4000, () => console.log('app is running on port 4000'))
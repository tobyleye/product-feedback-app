require('dotenv').config()
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

async function createServer() {
  await mongoose.connect(process.env.MONGODB_URI);
  app = express();

  app.use(
    session({
      secret: "session secret",
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(
    cors({
      origin: ['http://localhost:3000',],
      credentials: true,
    })
  );

  app.get("/healthcheck", (req, res) => {
    res.json("EVERYTHING SEEM FINE");
  });

  app.use(
    "/graphql",
    graphqlHTTP({
      graphiql: true,
      schema,
    })
  );

  app.listen(PORT, () =>
    console.log(`app is running on port ${PORT} `)
  );

  return app;
}

createServer();

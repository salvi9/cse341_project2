const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const { auth, requiresAuth } = require("express-openid-connect");

const port = process.env.PORT || 8080;
const app = express();

const config = {
  authRequired: true,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:8080",
  clientID: "qBzE1mfZVPvTZ02SpLTlJgoc4Bflh2Dw",
  issuerBaseURL: "https://dev-kotdc84ycyixelxm.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

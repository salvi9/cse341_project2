const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const { auth, requiresAuth } = require("express-openid-connect");

const port = process.env.PORT || 8080;
const app = express();

const config = {
  authRequired: true,
  auth0Logout: true,
  secret: "HH0JRZqQQ1YAb-NBvvr8fCYWjQPNacggp5fvErivKh60-24_LPyiH64I_zOOTJXU",
  baseURL: "https://cse341-project2-jkeq.onrender.com",
  clientID: "a36xodSxREXaLHZaGz2QchlxZuS08np2",
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

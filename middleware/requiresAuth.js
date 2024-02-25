const { requiresAuth } = require("express-openid-connect");

app.get("/users", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/products", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(
    token,
    config.auth.jwtKey,
    {
      maxAge: config.auth.maxAge
    },
    async (err, payload) => {
      if (err) {
        return res.status(401).send({ error: "You must be logged in" });
      }

      const { email, userId } = payload;

      req.user = userId;
      req.userEmail = email;
      next();
    }
  );
};

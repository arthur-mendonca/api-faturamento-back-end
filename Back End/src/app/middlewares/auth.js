require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "default_secret";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }
  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send({ error: "Token error!" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token malFormatted" });
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) return res.status(401).send({ error: "Token invalid" });

    if (decoded) {
      res.locals.userId = decoded.id;
      console.log(decoded);
    }

    return next();
  });
};

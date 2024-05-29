const { verify } = require("crypto");
const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).send("Access denied!");
    }

    const decode = jwt.verify(token, "secret");
    req.userId = decode.userId;
    next();
  } catch (err) {
    req.status(400).send("Invalid Token");
  }
};

module.export = { verifyAuth };

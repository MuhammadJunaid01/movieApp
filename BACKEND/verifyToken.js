const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    console.log("verify hitted");
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        res.status(401).json("token not valid");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

module.exports = verify;

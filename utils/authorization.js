const jwt = require('jsonwebtoken')

verifyJwtToken = (req, res, next) => {
  const header = req.headers.authorization
 
  if (!header) {
    return res.status(403).json({ status: 'failed', message: 'Authorization is empty' });

  }
  const token = header.split("Bearer ")[1]
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.user_id = decoded.user_id;
    next();
  });
};


module.exports = verifyJwtToken;




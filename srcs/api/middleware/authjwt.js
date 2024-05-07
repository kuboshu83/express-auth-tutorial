const jwt = require("jsonwebtoken");
const { respondJson, errMsgJson } = require("../utils");
require("dotenv").config();
SECRET_KEY = process.env.JWT_SECRET_KEY;

const extractJwtFromAuthHeader = (header) => {
  const PREFIX = "Bearer ";
  if (!header || !header.startsWith(PREFIX)) {
    return null;
  }
  const token = header.replace(PREFIX, "");
  return token;
};

const authorize = (req, res, next) => {
  const sendJson = respondJson(res);
  const authHeader = req.headers["authorization"];
  const token = extractJwtFromAuthHeader(authHeader);
  if (!token) {
    return sendJson(401, errMsgJson("unauthorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    req.id = id;
    next();
  } catch (err) {
    console.log(err);
    return sendJson(401, errMsgJson("unauthorized"));
  }
};

module.exports = {
  authorize,
};

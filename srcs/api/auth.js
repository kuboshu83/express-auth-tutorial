const express = require("express");
const router = express.Router();
const { respondJson, errMsgJson } = require("./utils");
const userdb = require("../infrastructure/userdb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const createJwt = ({ id }) => {
  const token = jwt.sign({ id }, SECRET_KEY);
  return token;
};

router.post("/login", async (req, res) => {
  const sendJson = respondJson(res);
  const { email, password } = req.body;
  if (!email || !password) {
    return sendJson(
      400,
      errMsgJson("email and password parameters are required")
    );
  }
  const foundUser = await userdb.findByEmail(email);
  if (!foundUser) {
    return sendJson(400, errMsgJson("no such user"));
  }
  const hashedPassword = foundUser.password;
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    return sendJson(400, errMsgJson("no such user"));
  }
  const id = foundUser.id;
  const token = createJwt({ id });
  return sendJson(200, { token });
});

module.exports = router;

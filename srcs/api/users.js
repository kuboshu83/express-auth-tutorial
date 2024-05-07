const express = require("express");
const router = express.Router();
router.use(express.json());
const userdb = require("../infrastructure/userdb");
const { respondJson, errMsgJson } = require("./utils");

router.post("/register", async (req, res) => {
  const sendJson = respondJson(res);
  const { email, password } = req.body;
  if (!email || !password) {
    sendJson(400, errMsgJson("email and password parameters are required"));
  }
  try {
    const savedUser = await userdb.createAndSaveUser({ email, password });
    sendJson(200, savedUser);
  } catch (err) {
    console.log(err);
    sendJson(500, errMsgJson("error at creating or saving user"));
  }
});

router.get("/email", async (req, res) => {
  const sendJson = respondJson(res);
  const { email } = req.body;
  if (!email) {
    sendJson(400, errMsgJson("email parameter is required"));
  }
  try {
    const foundUser = await userdb.findByEmail(email);
    sendJson(200, foundUser);
  } catch (err) {
    console.log(err);
    sendJson(500, errMsgJson("error at finding post"));
  }
});

module.exports = router;

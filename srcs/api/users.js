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

module.exports = router;

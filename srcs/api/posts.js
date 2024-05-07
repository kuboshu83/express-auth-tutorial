const express = require("express");
const router = express.Router();
router.use(express.json());
const postdb = require("../infrastructure/postdb");
const { respondJson, errMsgJson } = require("./utils");
const jwt = require("jsonwebtoken");
require("dotenv").config();
SECRET_KEY = process.env.JWT_SECRET_KEY;

const extractUserIdFromJwt = (token) => {
  if (!token) {
    return null;
  }
  return token;
};

const authorize = (req, res, next) => {
  const sendJson = respondJson(res);
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    sendJson(401, errMsgJson("unauthorized"));
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    req.id = id;
    next();
  } catch (err) {
    console.log(err);
    sendJson(401, errMsgJson("unauthorized"));
  }
};

router.post("/register", authorize, async (req, res) => {
  const sendJson = respondJson(res);
  const { title, content } = req.body;
  const authorId = req.id;
  if (!authorId) {
    sendJson(401, errMsgJson("unautorized"));
  }
  try {
    const savedPost = await postdb.createAndSavePost({
      title,
      content,
      authorId,
    });
    sendJson(200, savedPost);
  } catch (err) {
    console.log(err);
    sendJson(500, errMsgJson("error at creating and saving post"));
  }
});

module.exports = router;

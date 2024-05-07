const express = require("express");
const router = express.Router();
const postdb = require("../infrastructure/postdb");
const { respondJson, errMsgJson } = require("./utils");
const { authorize } = require("./middleware/authjwt");

router.use(express.json());

router.post("/register", authorize, async (req, res) => {
  const sendJson = respondJson(res);
  const { title, content } = req.body;
  const authorId = req.id;
  if (!authorId) {
    return sendJson(401, errMsgJson("unautorized"));
  }
  try {
    const savedPost = await postdb.createAndSavePost({
      title,
      content,
      authorId,
    });
    return sendJson(200, savedPost);
  } catch (err) {
    console.log(err);
    return sendJson(500, errMsgJson("error at creating and saving post"));
  }
});

module.exports = router;

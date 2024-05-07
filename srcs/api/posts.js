const express = require("express");
const router = express.Router();
router.use(express.json());
const postdb = require("../infrastructure/postdb");
const { respondJson, errMsgJson } = require("./utils");

const extractUserIdFromJwt = (token) => {
  if (!token) {
    return null;
  }
  return token;
};

router.post("/register", async (req, res) => {
  const sendJson = respondJson(res);
  const { title, content } = req.body;
  // TODO: ヘッダからjwtを受け取って処理するようにする
  const authorId = extractUserIdFromJwt(
    "user_b5eee0c9-e665-4c94-a8f6-2ce61900a80e"
  );
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

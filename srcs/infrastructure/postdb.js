const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");

const generatePostId = () => {
  const uuid = crypto.randomUUID();
  return `post_${uuid}`;
};

const createNewPost = ({ title, content, authorId }) => {
  const id = generatePostId();
  return { id, title, content, authorId };
};

const savePost = async ({ id, title, content, authorId }) => {
  const savedPost = await prisma.post.create({
    data: { id, title, content, authorId },
  });
  return savedPost;
};

const createAndSavePost = async ({ title, content, authorId }) => {
  const newPost = await createNewPost({ title, content, authorId });
  const savedPost = savePost(newPost);
  return savedPost;
};

module.exports = {
  createAndSavePost,
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const generateUserId = () => {
  const uuid = crypto.randomUUID();
  return `user_${uuid}`;
};

const hashPassword = async (password, saltRounds = 10) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const createNewUser = async ({ email, password }) => {
  const id = generateUserId();
  const hashedPassword = await hashPassword(password);
  const newUser = { id, email, password: hashedPassword };
  return newUser;
};

const saveUser = async ({ id, email, password }) => {
  const savedUser = await prisma.user.create({ data: { id, email, password } });
  return savedUser;
};

const createAndSaveUser = async ({ email, password }) => {
  const newUser = await createNewUser({ email, password });
  const savedUser = await saveUser(newUser);
  return savedUser;
};

const findByEmail = async (email) => {
  const foundUser = await prisma.user.findUnique({ where: { email } });
  return foundUser;
};

module.exports = {
  createAndSaveUser,
  findByEmail,
};

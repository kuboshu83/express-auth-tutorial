const express = require("express");
const app = express();
require("dotenv").config();

const userRoute = require("./api/users");
const postRoute = require("./api/posts");
const authRoute = require("./api/auth");

const PORT = process.env.PORT;

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

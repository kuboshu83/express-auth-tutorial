const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  return res.status(200).send("Hello Nodejs");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

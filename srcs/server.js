const express = require("express");
const app = express();
require("dotenv").config();

const userRoute = require("./api/users");

const PORT = process.env.PORT;

app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

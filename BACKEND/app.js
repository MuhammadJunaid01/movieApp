const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRute = require("./routes/auth");
const userRute = require("./routes/users");

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successfull!"))
  .catch((error) => console.log(error));

app.use("/api/auth", authRute);
app.use("/api/users", userRute);
app.get("/", (req, res) => {
  res.send("Backend server start");
});

app.listen(PORT, () => {
  console.log(`Backend Server start on poirt ${PORT}`);
});

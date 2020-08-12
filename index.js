const tasks = require("./routers/tasks");
const userUpload = require("./routers/upload");

const config = require("config");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
  );
  next();
});

console.log("Environment :: ", process.env.NODE_ENV);
console.log("Environment Name :: ", config.get("name"));

app.use("/uploads", express.static("uploads"));
app.use("/api/task", tasks);
app.use("/api/imageUpload", userUpload);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}.....!`);
});

const mongoURL = process.env.MONGODB_URI || config.get("mongoURL");
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected ...!"))
  .catch((err) => console.log("!---- Connection ERROR ----!"));

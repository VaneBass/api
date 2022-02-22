const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
// const path = require("path");

dotenv.config();

let mongoUrl =
  "mongodb+srv://dbUser:4fAD5gzjtpTDAg51@mgcluster.btzks.mongodb.net/blog?retryWrites=true&w=majority";

// 连接数据库
main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(mongoUrl, {
      autoIndex: false,
    })
    .then(console.log("Connected to MongoDB"));
}

app.all("*", (request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  response.header("Access-Control-Allow-Methods", "*");
  response.header("Content-Type", "application/json;charset=utf-8");
  // 回调
  next();
});

// 解析json
app.use(express.json());

// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// 挂载子路由
routes(app);

// 监听端口
app.listen("5000", () => {
  console.log("Backend is running...");
});

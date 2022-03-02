const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");

// 使用 dotenv
dotenv.config();

// 连接数据库
main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(process.env.MONGO_URL, {
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

// 挂载子路由
routes(app);

// 监听端口
app.listen(process.env.PORT, () => {
  console.log("Backend is running...");
});

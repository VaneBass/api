const user = require("./users");
const post = require("./posts");
const category = require("./categories");

module.exports = (app) => {
  app.use("/api/auth", user);
  app.use("/api/posts", post);
  app.use("/api/category", category);
};

const router = require("express").Router();
const User = require("../models/User");

// 注册用户
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
    });

    const user = await newUser.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

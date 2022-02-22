const router = require("express").Router();
const Category = require("../models/Category");

// 新增分类
router.post("/", async (req, res) => {
  try {
    const newCategory = new Category(req.body);

    const category = await newCategory.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 删除分类
router.delete("/:catname", async (req, res) => {
  try {
    await Category.findOneAndDelete({ catname: req.params.catname });
    res.status(200).json("done");
  } catch (error) {
    res.status(500).json(error);
  }
});

// 获取所有分类
router.get("/", async (req, res) => {
  try {
    let categories = await Category.find({}, "catname");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

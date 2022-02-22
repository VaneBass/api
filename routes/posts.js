const router = require("express").Router();
const Post = require("../models/Post");

// 新增博客
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);

    const post = await newPost.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 更新博客
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.id === req.body.id) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(401).json("You can delete only your own  post");
      }
    } else {
      res.status(401).json("You can update only your own  post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// 删除博客
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("done");
  } catch (error) {
    res.status(500).json(error);
  }
});

// 获取一篇博客
router.get("/singlePost/:id", async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 获取所有博客
router.get("/", async (req, res) => {
  const catName = req.query.category;

  try {
    let posts = null;

    if (catName) {
      posts = await Post.find(
        {
          category: {
            $in: [catName],
          },
        },
        { _id: 1, title: 1, category: 1, updatedAt: 1 }
      ).sort("-updatedAt");
    } else {
      posts = await Post.find(
        {},
        { _id: 1, title: 1, category: 1, updatedAt: 1 }
      ).sort("-updatedAt");
    }

    paginater(posts, req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 分页函数
function paginater(posts, req, res) {
  // 获取每页的文章数量
  let perPageNumber = Number(
    req.query.perPageNumber ? req.query.perPageNumber : 6
  );

  // 获取当前页码 从1开始
  let currentPage = Number(req.query.currentPage ? req.query.currentPage : 1);

  // 总页数
  // 数组长度/每页文章数 结果向上取整
  let totalPage = Math.ceil(posts.length / perPageNumber);

  // 分页
  // 起始下标，从哪一项开始列举
  let startNum = (currentPage - 1) * perPageNumber;

  // 结束下标
  // 当前页码 * 每页显示的数量 或者 posts的长度
  let endNum =
    currentPage * perPageNumber <= posts.length
      ? currentPage * perPageNumber
      : posts.length;

  // 根据分页结果获取最终的posts
  posts = posts.slice(startNum, endNum);

  res.status(200).json({ posts, currentPage, totalPage });
}

// 根据搜索框内容获取结果
router.get("/search", async (req, res) => {
  const searchWord = req.query.searchWord;

  let reg = new RegExp(searchWord, "i");

  try {
    let posts = null;

    if (searchWord) {
      posts = await Post.where("title", reg);
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

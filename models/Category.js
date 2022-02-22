const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    catname: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);

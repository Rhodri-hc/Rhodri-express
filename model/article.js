const mongoose = require("mongoose");
const baseModel = require('./base-model')

const articleSchema = new mongoose.Schema({
  ...baseModel,
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: null,
  }
});

module.exports = articleSchema;
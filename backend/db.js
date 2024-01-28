const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:5wa9bEJXFrVHG8BB@cluster0.06mojht.mongodb.net/todos"
);
const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};

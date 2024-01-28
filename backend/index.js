const express = require("express");
const { createTodo, updateTodo } = require("./types");

const { todo } = require("./db");
const jwt = require("jsonwebtoken");
const app = express();

const cors = require("cors");

app.use(express.json());
app.use(cors());

// body{
//   title:String,
//   description:string,
// }

app.post("/todo", async function (req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Wrong Inputs",
    });
  }

  //put in mongodb

  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.json({
    msg: "Todo created",
  });
});

app.get("/todos", async function (req, res) {
  const todos = await todo.find({});
  res.json({
    todos,
  });
});

app.put("/completed", async function (req, res) {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Wrong Inputs",
    });
  }

  //update in db
  await todo.update({ _id: req.body.id }, { completed: true });
  res.json({
    msg: "Todo is completed",
  });
});

app.listen(3000, function () {
  console.log("listening at 3000");
});

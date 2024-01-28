import { useState } from "react";
import "./CreateTodo.css";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const isButtonDisabled = !title || !description;

  return (
    <div className="container">
      <div className="hero">
        <h1>Todo Application</h1>
        <p>Streamline Your Day, One Task at a Time</p>
      </div>
      <input
        className="input"
        type="text"
        placeholder="Enter the title"
        value={title}
        onChange={function (e) {
          const value = e.target.value;
          setTitle(value);
        }}
      />
      <input
        className="input"
        type="text"
        placeholder="Enter the description"
        value={description}
        onChange={function (e) {
          const value = e.target.value;
          setDescription(value);
        }}
      />
      <button
        id="btn-addTodo"
        disabled={isButtonDisabled}
        onClick={() => {
          fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }).then(async function (res) {
            const json = await res.json();
            alert("Todo Added");
          });
        }}
      >
        Add a todo
      </button>
    </div>
  );
}

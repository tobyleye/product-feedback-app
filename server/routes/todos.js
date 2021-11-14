const { Router } = require("express");

let router = Router();

router.get("/", (req, res) => {
  let todos = req.session.todos || [];
  let content;
  if (todos.length === 0) {
    content = "<p>You have no todos. add now</p>";
  } else {
    let listHtml = todos.map((t) => `<li>${t}</li>`).join("\n");
    content = `<ul>${listHtml}</ul>`;
  }
  res.send(`<div>
            <h3>Welcome to todos</h3>
           ${content}
            <form method="post" action="/todos">
                <input type="text" name="todo"/>
                <button type="submit">submit</button>
            </form>
        </div>`);
});

router.post("/", (req, res) => {
  const { todo } = req.body;
  if (todo) {
    let todos = req.session.todos || [];
    todos.push(todo);
    req.session.todos = todos;
  }
  res.redirect("/todos");
});

module.exports = router;
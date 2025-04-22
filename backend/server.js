const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const getTodos = () => {
  const data = fs.readFileSync('db.json', 'utf8');
  return JSON.parse(data).todos || [];
};

const saveTodos = (todos) => {
  fs.writeFileSync('db.json', JSON.stringify({ todos }, null, 2));
};

app.get('/todos', (req, res) => {
  res.json(getTodos());
});

app.post('/todos', (req, res) => {
  const todos = getTodos();
  const newTodo = { id: Date.now(), ...req.body };
  todos.push(newTodo);
  saveTodos(todos);
  res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
  let todos = getTodos();
  todos = todos.filter(todo => todo.id !== Number(req.params.id));
  saveTodos(todos);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
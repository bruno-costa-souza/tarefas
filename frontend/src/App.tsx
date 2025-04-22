import React, { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';

type Todo = {
  id: number;
  title: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Todo[]>('http://localhost:5000/todos')
      .then(res => setTodos(res.data));
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#f5f5f5';
    document.body.style.color = darkMode ? '#eee' : '#222';
    document.body.style.transition = 'background-color 0.3s ease';
  }, [darkMode]);

  const addTodo = (): void => {
    if (!newTodo.trim()) return;
    axios.post<Todo>('http://localhost:5000/todos', { title: newTodo })
      .then(res => setTodos([...todos, res.data]));
    setNewTodo('');
  };

  const deleteTodo = (id: number): void => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => setTodos(todos.filter((todo: Todo) => todo.id !== id)));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTodo(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const theme = darkMode ? darkStyles : lightStyles;

  return (
    <div style={theme.container}>
      <button onClick={() => setDarkMode(!darkMode)} style={theme.toggleButton}>
        {darkMode ? '🌞 Modo Claro' : '🌙 Modo Escuro'}
      </button>
      <h1 style={theme.title}>✅ Tarefas Concluídas</h1>
      <div style={theme.inputContainer}>
        <input
          value={newTodo}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Digite uma nova tarefa..."
          style={theme.input}
        />
        <button onClick={addTodo} style={theme.addButton}>Adicionar</button>
      </div>

      <ul style={theme.list}>
        {todos.map((todo: Todo) => (
          <li key={todo.id} style={theme.listItem}>
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)} style={theme.deleteButton}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const darkStyles = {
  container: {
    maxWidth: 600,
    margin: '40px auto',
    padding: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    fontFamily: 'Arial, sans-serif',
    color: '#eee'
  },
  title: {
    textAlign: 'center' as const
  },
  inputContainer: {
    display: 'flex',
    marginBottom: 20,
    gap: 10
  },
  input: {
    flex: 1,
    padding: 10,
    border: '1px solid #444',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#2c2c2c',
    color: '#fff'
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    backgroundColor: '#2c2c2c',
    padding: '10px 15px',
    marginBottom: 10,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #333',
    color: '#ccc'
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    padding: '5px 10px',
    cursor: 'pointer'
  },
  toggleButton: {
    marginBottom: 20,
    padding: '8px 12px',
    border: 'none',
    borderRadius: 6,
    backgroundColor: '#333',
    color: '#fff',
    cursor: 'pointer'
  }
};

const lightStyles = {
  container: {
    maxWidth: 600,
    margin: '40px auto',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    color: '#222'
  },
  title: {
    textAlign: 'center' as const
  },
  inputContainer: {
    display: 'flex',
    marginBottom: 20,
    gap: 10
  },
  input: {
    flex: 1,
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#000'
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    backgroundColor: '#f4f4f4',
    padding: '10px 15px',
    marginBottom: 10,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #ddd',
    color: '#333'
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    padding: '5px 10px',
    cursor: 'pointer'
  },
  toggleButton: {
    marginBottom: 20,
    padding: '8px 12px',
    border: 'none',
    borderRadius: 6,
    backgroundColor: '#ccc',
    color: '#000',
    cursor: 'pointer'
  }
};

export default App;

import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import CompletedTask from './pages/CompletedTask';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [todos, setTodos] = useState([
    { id: '1', title: 'TODO TITLE', subtitle: 'TODO SUB TITLE', detail: '', status: 'active' },
    { id: '2', title: 'TODO TITLE', subtitle: 'TODO SUB TITLE', detail: '', status: 'active' },
    { id: '3', title: 'TODO TITLE', subtitle: 'TODO SUB TITLE', detail: '', status: 'completed' }
  ]);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const addTodo = useCallback(({ title, detail }) => {
    const id = String(Date.now());
    setTodos(prev => [{ id, title, subtitle: detail || 'TODO SUB TITLE', detail, status: 'active' }, ...prev]);
  }, []);

  const loadTodo = useCallback((id) => todos.find(t => t.id === id), [todos]);

  const updateTodo = useCallback((id, { title, detail }) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, title, subtitle: detail || t.subtitle, detail } : t));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleStatus = useCallback((id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'active' : 'completed' } : t));
  }, []);

  return (
    <div className="App">
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<TodoPage todos={todos} onToggle={toggleStatus} onDelete={deleteTodo} />}
          />
          <Route
            path="/add"
            element={<AddTodo onAdd={addTodo} />}
          />
          <Route
            path="/edit/:id"
            element={<EditTodo loadTodo={loadTodo} onUpdate={updateTodo} />}
          />
          <Route
            path="/completed"
            element={<CompletedTask todos={todos} />}
          />
          <Route
            path="*"
            element={
              <div style={{ padding: 24 }}>
                <h2>Page not found</h2>
                <p>
                  Go back to <Link to="/">Home</Link>
                </p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

const LOCAL_STORAGE_KEY = 'localStorage.todos';

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if  (name === '') return 
    setTodos(prevTodos =>{
      return [...prevTodos, {id: uuidv4(), name: name, completed: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodo(){
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }

  return(
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input class="inNome" ref={todoNameRef} type="text" name="todoList"/>
      <button onClick={handleAddTodo}>Add todo</button>
      <button onClick={handleClearTodo}>Apagar completos</button>
      <div>{todos.filter(todo => !todo.completed).length} por completar</div>
    </>
  )
}

export default App;

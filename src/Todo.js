import React from 'react'

export default function todo ({ todo, toggleTodo }) {
  
    function handleTodoClick(){
        toggleTodo(todo.id);
    }

    return (
    <div>
      <label>
        <input
          class="checkbox"
          type='checkbox'
          checked={todo.completed}
          onChange={handleTodoClick}
        />
        
        {todo.name}
      </label>
    </div>
  )
}

import React from 'react'
import type { Todo } from "../types/todo"

type TodoItemProps = {
    todo: Todo;
    onDelete: (id: string) => void
    onToggle: (id: string) => void;
};

const TodoItems = ({ todo, onDelete, onToggle }: TodoItemProps) => {
  return (

        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>

            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}

            />

            <span className="todo-text">
                {todo.text}
            </span>

            <button className="delete-btn"
                    type="button" 
                    onClick = {() => onDelete(todo.id)}>

                Delete

            </button>

        </li>
  )
}

export default TodoItems
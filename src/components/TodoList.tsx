import React from 'react'
import type { Todo } from './types/todo'
import TodoItems from "./TodoItems";

type TodoListProps = {
    todos: Todo[];
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
};

const TodoList = ({todos, onToggle, onDelete}: TodoListProps) => {

  return (

    <ul className="todo-list">
        {todos.map(todo => (

            <TodoItems
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onToggle={onToggle}
            />

        ))}
    </ul>
    
  )
}

export default TodoList
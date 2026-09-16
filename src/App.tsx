import './App.css'
import type { Todo } from './types/todo'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import FilterTab from './components/FilterTab'
import useLocalStorage from './hooks/useLocalStorage'
import { Routes, Route } from 'react-router-dom'


type Filter = "all" | "active" | "completed";


function App() {

    const [todos, setTodos] =
        useLocalStorage<Todo[]>("todos", []);


    // Add Todo
    function addTodo(text: string) {

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: text,
            completed: false
        };

        setTodos(prevTodos => [
            ...prevTodos,
            newTodo
        ]);
    }


    // Delete Todo
    function deleteTodo(todoId: string) {

        setTodos(prevTodos =>
            prevTodos.filter(todo =>
                todo.id !== todoId
            )
        );
    }


    // Toggle Todo
    function toggleTodo(todoId: string) {

        setTodos(prevTodos =>
            prevTodos.map(todo => {

                if (todo.id === todoId) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                }

                return todo;
            })
        );
    }


    return (
        <Routes>

            <Route
                path="/"
                element={
                    <TodoPage
                        todos={todos}
                        filter="all"
                        onAdd={addTodo}
                        onDelete={deleteTodo}
                        onToggle={toggleTodo}
                    />
                }
            />

            <Route
                path="/active"
                element={
                    <TodoPage
                        todos={todos}
                        filter="active"
                        onAdd={addTodo}
                        onDelete={deleteTodo}
                        onToggle={toggleTodo}
                    />
                }
            />

            <Route
                path="/completed"
                element={
                    <TodoPage
                        todos={todos}
                        filter="completed"
                        onAdd={addTodo}
                        onDelete={deleteTodo}
                        onToggle={toggleTodo}
                    />
                }
            />

        </Routes>
    );
}


type TodoPageProps = {
    todos: Todo[];
    filter: Filter;
    onAdd: (text: string) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
};


function TodoPage({
    todos,
    filter,
    onAdd,
    onDelete,
    onToggle
}: TodoPageProps) {

    let filteredTodos = todos;


    if (filter === "active") {
        filteredTodos =
            todos.filter(todo => !todo.completed);
    }


    if (filter === "completed") {
        filteredTodos =
            todos.filter(todo => todo.completed);
    }


    return (
        <main className="todo-app">

            <h1>Todo App</h1>

            <TodoForm onAdd={onAdd} />

            <FilterTab />

            <TodoList
                todos={filteredTodos}
                onDelete={onDelete}
                onToggle={onToggle}
            />

        </main>
    );
}


export default App;
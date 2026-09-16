import React from 'react'
import { useState } from 'react'

type TodoFormProps = {
    onAdd: (text: string) => void;
};

const TodoForm = ( {onAdd}: TodoFormProps) => {

    const [text, setText] = useState('')

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        const trimmedText = text.trim();

        if (!trimmedText) {
            return;
        }

        onAdd(trimmedText);

        setText("");
    }


    return (

        <form onSubmit={handleSubmit} className="todo-form">

            <input className="todo-input"
                type="text"
                placeholder='Enter a todo'
                autoComplete='off'
                value = {text}
                onChange = { (event) => setText(event.target.value) }
            />

            <button type='submit'>
                Add
            </button>

        </form>


    )
}

export default TodoForm
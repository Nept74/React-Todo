import React, {useState} from "react";
import style from './AddTodo.module.css'

// добавление задачи
function AddTodo ({todo, setTodo}) {

    const [value, setValue] = useState('')

    function saveTodo() {
        if(value){
            setTodo(
                [...todo, {
                    id: (new Date()).getTime(),
                    title: value,
                    status: 'await'
                }]
            )
        }
        setValue('')
    }
    return (
        <div className={style.addTodo}>
            <input className={style.input} placeholder="Введите задачу" value={value} onChange={ (e)=>setValue(e.target.value)}/>
            <button className={style.button} onClick={saveTodo}>Сохранить</button>
        </div>
    )
}

export default AddTodo
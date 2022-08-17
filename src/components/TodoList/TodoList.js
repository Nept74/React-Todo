import React, {useState} from "react";
import style from './TodoList.module.css'

function TodoList({todo, setTodo}) {

    const [edit, setEdit] = useState(null)
    const [value, setValue] = useState('')

    // удаление задачи
    function deleteTodo(id) {
        let newTodo = [...todo].filter(item => item.id!=id)
        setTodo(newTodo)
    }
    // при нажатии на кнопку статус поочередно меняется между "ожидание", "в процессе" и "сделано",
    // с пользовательской части видно только ссответственное изменение цвета (серый, желтый и зеленый)
    function statusTodo(id) {
        let newTodo = [...todo].filter(item => {
            if(item.id == id) {
                if (item.status === 'await'){
                    item.status = 'inProgress'
                } else if (item.status === 'inProgress'){
                    item.status = 'done'
                } else {
                    item.status = 'await'
                }
            }
            return item
        })
        setTodo(newTodo)
    }

    // редактирование задачи
    function editTodo(id, title) {
        setEdit(id)
        setValue(title)
    }

    // сохранение измененной задачи
    function saveTodo(id) {
        let newTodo = [...todo].map(item => {
            if(item.id == id) {
                item.title = value
            }
            return item
        })
        setTodo(newTodo)
        setEdit(null)
    }
    return (
        <div>
            { // отрисовка задач
                todo.map( item => (
                    <div key={item.id}
                         className={ style.todo + " " + item.status }>
                        {   // условная отрисовка редактирования задачи
                            edit == item.id ?
                                <div>
                                <input onChange={(e) => setValue(e.target.value)}  value={value} />
                                </div> :
                                <div className={style.title}>{ item.title }</div>
                        }
                        {
                            edit == item.id ?
                                <div>
                                    <button onClick={ ()=>saveTodo(item.id)}>Сохранить</button>
                                </div> :
                                <div className={ style.button_container }>
                                    <buttton class='button' onClick ={ ()=>deleteTodo(item.id)}>Удалить</buttton>
                                    <buttton class='button' onClick ={ ()=>editTodo(item.id, item.title)}>Редактировать</buttton>
                                    <buttton class='button' onClick ={ ()=>statusTodo(item.id)}>Статус</buttton>
                                </div>

                        }
                    </div>
                ))
            }
        </div>
    )
}
export default TodoList
import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import cross from './cross.svg';
import './App.css';

interface ToDo {
    text: string;
    date: string;
    done: boolean;
}

function App() {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState<ToDo[]>([]);

    useEffect(() => {
        const todosData = localStorage.getItem('todos');
        if (todosData) {
            setTodos(JSON.parse(todosData));
        }
    }, []);

    const addTODO = (event: React.FormEvent) => {
        event.preventDefault();
        if (newTodo.trim() !== '') {
            const currentDate = new Date();
            const newToDo: ToDo = {
                text: newTodo,
                date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
                done: false
            };
            setTodos([...todos, newToDo]);
            localStorage.setItem('todos', JSON.stringify(todos));
            setNewTodo("");
        } else {
            alert("Вы не ввели текст");
        }
    };

    const deleteALL = () => {
        setTodos([]);
        localStorage.setItem('todos', JSON.stringify([]));
    };

    const checkTODO: React.MouseEventHandler<HTMLElement> = (e: React.MouseEvent<HTMLElement>) => {
		const targetNode = e.target as HTMLElement;
		if(targetNode.className.includes('delete_img')){
			return;
		}
		let parentNode = targetNode.closest('.todo') as HTMLElement;
		if(!parentNode.className.includes('done')){
			parentNode.classList.add('done');
		} else {
			parentNode.className = 'todo';
		}			
		const updatedTodos = [...todos];
		setTodos(updatedTodos);
		localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };
	
	const deleteTODO = (index: number) => {
		const updatedTodos = todos.filter((_, i) => i !== index);
		setTodos(updatedTodos);
		localStorage.setItem('todos', JSON.stringify(updatedTodos))
	}

    return (
        <div>
			<div className="all_content">
				<div className="header">
					<div className="text_header">
						<h1>Список дел</h1>
					</div>
					<form id="form" className="header" onSubmit={addTODO}>
						<input id="text_new" value={newTodo} onChange={e => setNewTodo(e.target.value)} type="text" placeholder="Новый элемент списка"/>
						<button id="add_button" type="submit" className="main_button">Создать</button>
						<button id="clean_button" type="reset" className="main_button" onClick={deleteALL}>Очистить всё</button>
					</form>
				</div>
				
				<div className="content">
					<div className="none none_todo">Не найдено ни одного дела</div>	
					<ol className="all_todos">
						{todos.map((todo, index) => (
							<li className="todo" key={index} onClick = {checkTODO}>
								<div className="note">
									<input className="checkbox" type="checkbox" checked={todo.done}  />
									<label className="text">
										<span>{todo.text}</span>
										<sub>от {todo.date}</sub>
									</label>
								</div>
								<img className="delete_img" src={cross} onClick={() => deleteTODO(index)}/>
							</li>
						))}
					</ol>
				</div>
			</div>
			
			<div className="footer">
				<p className="text_footer">Copyright &copy;</p>
			</div>
			
        </div>
    );
}
export default App;

import React, { useCallback, useContext, useState } from 'react';
import axios from 'axios';
import { TodoListContext } from '../config/TodoListContext';
import { accessToken } from '../App';

const CreateTodo = props => {
	const { addTodo } = useContext(TodoListContext);
	const { onRequestClose } = props;

	const [todoText, setTodoText] = useState('');
	const onTodoTextChange = useCallback(e => {
		setTodoText(e.currentTarget.value);
	}, []);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const onCreateTodoClicked = useCallback(e => {
		e.preventDefault();
		setIsLoading(true);
		axios({
			url: 'https://todolist-backend-app.herokuapp.com/todos/create',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
			data: { name: todoText },
		}).then(response => {
			addTodo(response.data);
			onRequestClose();
		}).catch(e => {
			setError(e.message);
		}).finally(() => {
			setIsLoading(false);
		});
	}, [addTodo, onRequestClose, todoText]);

	const renderError = error && (
		<div className='alert alert-danger'>
			<button className='close' data-dismiss='alert'>&times;</button>
			{error}
		</div>
	);

	return (
		<form onSubmit={onCreateTodoClicked}>
			<div className='modal-body'>
				{renderError}
				<div className='form-group'>
					<label htmlFor='todoText'>Task title</label>
					<input
						className='form-control'
						id='todoText'
						type='text'
						placeholder='Enter title'
						required
						autoFocus
						onChange={onTodoTextChange}
					/>
				</div>
			</div>
			<div className='modal-footer'>
				<button type='button' className='btn btn-secondary' onClick={onRequestClose} disabled={isLoading}>
					Close
				</button>
				<input type='submit' className='btn btn-primary' disabled={isLoading} value='Add' />
			</div>
		</form>
	);
};

export default CreateTodo;

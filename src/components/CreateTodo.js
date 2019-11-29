import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { accessToken } from '../App';

const CreateTodo = props => {
	const { onRequestClose, addTodo } = props;

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const [todoText, setTodoText] = useState('');

	const onTodoTextChange = useCallback(e => {
		setTodoText(e.currentTarget.value);
	}, []);

	const onCreateTodoClicked = useCallback(e => {
		e.preventDefault();
		setIsLoading(true);
		axios({
			url: 'https://todolist-backend-app.herokuapp.com/todos/create',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': accessToken,
			},
			data: {
				name: todoText,
			},
		}).then((response) => {
			addTodo({
				id: response.data.id,
				name: response.data.name,
				completed: response.data.completed,
			});
			onRequestClose();
		}).catch((error) => {
			setError(error.message);
		}).finally(() => {
			setIsLoading(false);
		});
	}, [todoText]);

	return (
		<form onSubmit={onCreateTodoClicked}>
			<div className='modal-body'>
				{
					error &&
					<div className='alert alert-danger'>
						{error}
					</div>
				}
				<div className='form-group'>
					<label htmlFor='todoText'>TodoText</label>
					<input
						className='form-control'
						id='todoText'
						type='text'
						placeholder='Enter TodoText'
						minLength={2}
						required
						onChange={onTodoTextChange}
					/>
				</div>
			</div>
			<div className='modal-footer'>
				<button type='button' className='btn btn-secondary' onClick={onRequestClose} disabled={isLoading}>
					Close
				</button>
				<input type='submit' className='btn btn-primary' disabled={isLoading} />
			</div>
		</form>
	);
};

export default CreateTodo;

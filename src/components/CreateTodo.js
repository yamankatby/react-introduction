import React, { useCallback, useEffect, useState } from 'react';

const CreateTodo = () => {
	const [todoText, setTodoText] = useState('');

	useEffect(() => {
		document.title = 'TodoList App ' + todoText;
		return () => {
			document.title = 'TodoList App';
		};
	}, [todoText]);

	const onTodoTextChange = useCallback(e => {
		setTodoText(e.currentTarget.value);
	}, []);

	const onCreateTodoClicked = useCallback(e => {
		e.preventDefault();
		alert(todoText);
	}, [todoText]);

	return (
		<>
			<h5>Create new Todo</h5>
			<hr />
			<form onSubmit={onCreateTodoClicked}>
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
				<input type='submit' className='btn btn-primary' />
			</form>
		</>
	);
};

export default CreateTodo;

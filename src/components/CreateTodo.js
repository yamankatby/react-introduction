import React from 'react';

let todoText = '';
const CreateTodo = () => {
	const onTodoTextChange = (e) => {
		todoText = e.currentTarget.value;
	};
	const onCreateTodoClicked = (e) => {
		e.preventDefault();
		alert(todoText);
	};

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

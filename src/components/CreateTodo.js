import React, { useCallback, useState } from 'react';

const CreateTodo = props => {
	const { onRequestClose } = props;

	const [todoText, setTodoText] = useState('');

	const onTodoTextChange = useCallback(e => {
		setTodoText(e.currentTarget.value);
	}, []);

	const onCreateTodoClicked = useCallback(e => {
		e.preventDefault();
		alert(todoText);
	}, [todoText]);

	return (
		<form onSubmit={onCreateTodoClicked}>
			<div className='modal-body'>
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
				<button type='button' className='btn btn-secondary' onClick={onRequestClose}>
					Close
				</button>
				<input type='submit' className='btn btn-primary' />
			</div>
		</form>
	);
};

export default CreateTodo;

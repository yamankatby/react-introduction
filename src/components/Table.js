import React from 'react';

const Table = props => {
	const {
		todos,
		onCreateTodoClick,
		onToggleTodoClick,
		onEditTodoClick,
		onRemoveTodoClick,
	} = props;

	const renderTodoList = todos.map((todo) => (
		<tr>
			<td>{todo.name}</td>
			<td>{todo.completed ? 'Yes' : 'No'}</td>
			<td>
				<div className='btn-group btn-group-sm'>
					<button className='btn btn-primary' onClick={() => onToggleTodoClick(todo.id)}>Toggle</button>
					<button className='btn btn-primary' onClick={() => onEditTodoClick(todo.id)}>Edit</button>
					<button className='btn btn-danger' onClick={() => onRemoveTodoClick(todo.id)}>Remove</button>
				</div>
			</td>
		</tr>
	));

	return (
		<div className='card mt-3'>
			<div className='card-header d-flex justify-content-between align-items-center'>
				TodoList
				<button className='btn btn-primary btn-sm' onClick={onCreateTodoClick}>
					Create
				</button>
			</div>
			<div className='card-body'>
				<table className='table table-bordered table-hover'>
					<thead>
					<tr>
						<th>Text</th>
						<th>Completed</th>
						<th style={{ width: 182 }}>Options</th>
					</tr>
					</thead>
					<tbody>
					{renderTodoList}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;

import React, { useContext } from 'react';
import { TodoListContext } from '../config/TodoListContext';

const Table = props => {
	const { filteredTodos } = useContext(TodoListContext);
	const { onCreateTodoClick, onToggleTodoClick, onEditTodoClick, onRemoveTodoClick } = props;

	const renderTodoList = filteredTodos.map(todo => (
		<tr>
			<td>{todo.name}</td>
			<td>{todo.completed ? 'Yes' : 'No'}</td>
			<td>
				<div className='btn-group btn-group-sm'>
					<button className='btn btn-primary' onClick={() => onToggleTodoClick(todo.id)}>
						Toggle
					</button>
					<button className='btn btn-primary' onClick={() => onEditTodoClick(todo.id)}>
						Edit
					</button>
					<button className='btn btn-danger' onClick={() => onRemoveTodoClick(todo.id)}>
						Delete
					</button>
				</div>
			</td>
		</tr>
	));
	const renderTable = filteredTodos.length !== 0 && (
		<table className='table table-bordered table-hover'>
			<thead>
			<tr>
				<th>Title</th>
				<th style={{ width: 190 }}>Completed</th>
				<th style={{ width: 190 }}>More</th>
			</tr>
			</thead>
			<tbody>{renderTodoList}</tbody>
		</table>
	);
	const renderEmptyState = filteredTodos.length === 0 && (
		<div className='alert alert-primary'>
			<strong>Nicely done!</strong> You've finished all your tasks. Take a second to recharge.
		</div>
	);
	return (
		<div className='card mt-3'>
			<div className='card-header d-flex justify-content-between align-items-center'>
				My Tasks
				<button className='btn btn-primary btn-sm' onClick={onCreateTodoClick}>
					Add a task
				</button>
			</div>
			<div className='card-body'>
				{renderTable}
				{renderEmptyState}
			</div>
		</div>
	);
};

export default Table;

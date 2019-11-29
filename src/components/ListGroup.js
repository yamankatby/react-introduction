import React, { useContext } from 'react';
import { TodoListContext } from '../config/TodoListContext';

const ListGroupItem = props => {
	const { title, count, tintColor, onClick, active } = props;
	return (
		<button
			type='button'
			className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${active ? 'active' : ''}`}
			onClick={onClick}
		>
			{title}
			{count !== 0 && <span className={`badge-pill badge-${active ? 'light' : tintColor}`}>{count}</span>}
		</button>
	);
};

const ListGroup = () => {
	const {
		allTodos,
		showAllTodos,
		selectedFilter,
		showCompletedTodos,
		showUncompletedTodos,
	} = useContext(TodoListContext);

	return (
		<ul className='list-group list-group-horizontal-md'>
			<ListGroupItem
				title='All tasks'
				count={allTodos.length}
				tintColor='primary'
				onClick={showAllTodos}
				active={selectedFilter === 'all'}
			/>
			<ListGroupItem
				title='Incompleted tasks'
				count={allTodos.filter(todo => todo.completed === false).length}
				tintColor='danger'
				onClick={showUncompletedTodos}
				active={selectedFilter === 'uncompleted'}
			/>
			<ListGroupItem
				title='Completed tasks'
				count={allTodos.filter(todo => todo.completed === true).length}
				tintColor='warning'
				onClick={showCompletedTodos}
				active={selectedFilter === 'completed'}
			/>
		</ul>
	);
};

export default ListGroup;

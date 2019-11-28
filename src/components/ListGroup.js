import React from 'react';

const ListGroupItem = props => {
	const { title, count, tintColor, onClick } = props;
	return (
		<button
			type='button'
			className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
			onClick={onClick}
		>
			{title}
			<span className={`badge-pill badge-${tintColor}`}>{count}</span>
		</button>
	);
};

const ListGroup = props => {
	const { allTodos, onAllFilterSelect, onCompletedFilterSelect, onUncompletedFilterSelect } = props;

	return (
		<ul className='list-group list-group-horizontal-md'>
			<ListGroupItem
				title='All'
				count={allTodos.length}
				tintColor='primary'
				onClick={onAllFilterSelect}
			/>
			<ListGroupItem
				title='Completed'
				count={allTodos.filter(todo => todo.completed === true).length}
				tintColor='warning'
				onClick={onCompletedFilterSelect}
			/>
			<ListGroupItem
				title='Uncompleted'
				count={allTodos.filter(todo => todo.completed === false).length}
				tintColor='danger'
				onClick={onUncompletedFilterSelect}
			/>
		</ul>
	);
};

export default ListGroup;

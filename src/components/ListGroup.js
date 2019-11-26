import React from 'react';

const ListGroupItem = props => {
	return (
		<li className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
			{props.title}
			<span className={`badge-pill badge-${props.tintColor}`}>{props.count}</span>
		</li>
	);
};

const ListGroup = () => {
	return (
		<ul className='list-group list-group-horizontal-md'>
			<ListGroupItem title='All' count={5} tintColor='primary' />
			<ListGroupItem title='Completed' count={3} tintColor='warning' />
			<ListGroupItem title='Uncompleted' count={2} tintColor='danger' />
		</ul>
	);
};

export default ListGroup;

import React from 'react';

const Table = props => {
	const { onCreateTodoClick } = props;
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
					<tr>
						<td>Learn React</td>
						<td>Not yet</td>
						<td>
							<div className='btn-group btn-group-sm'>
								<button className='btn btn-primary'>Toggle</button>
								<button className='btn btn-primary'>Edit</button>
								<button className='btn btn-danger'>Remove</button>
							</div>
						</td>
					</tr>
					<tr>
						<td>Learn HTML</td>
						<td>Yep!</td>
						<td>
							<div className='btn-group btn-group-sm'>
								<button className='btn btn-primary'>Toggle</button>
								<button className='btn btn-primary'>Edit</button>
								<button className='btn btn-danger'>Remove</button>
							</div>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;

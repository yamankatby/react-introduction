import React from 'react';
import './styles.css';

const Modal = (props) => {
	return (
		<div className='modal-overlay'>
			<div className='container mt-3 mt-sm-5'>
				<div className='modal-body'>
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Modal;

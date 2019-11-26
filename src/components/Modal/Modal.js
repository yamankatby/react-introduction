import React from 'react';
import './styles.css';

const Modal = props => {
	const { visible, children, onRequestClose } = props;
	return (
		<div
			className={visible ? 'modal-overlay modal-overlay--visible' : 'modal-overlay'}
			onClick={onRequestClose}
		>
			<div className='container mt-3 mt-sm-5'>
				<div
					className={visible ? 'modal-body modal-body--visible' : 'modal-body'}
					onClick={e => e.stopPropagation()}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;

import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './styles.css';

const Modal = props => {
	const { title, visible, children, onRequestClose } = props;

	return (
		<CSSTransition
			in={visible}
			timeout={200}
			classNames='my-modal'
			unmountOnExit
		>
			<div className='my-modal' onClick={onRequestClose}>
				<div className='container mt-3 mt-sm-5'>
					<div className='my-modal-body' onClick={e => e.stopPropagation()}>
						<div className='modal-header'>
							<h5 className='modal-title'>{title}</h5>
							<button className='close' onClick={onRequestClose}>
								<span>&times;</span>
							</button>
						</div>
						{children}
					</div>
				</div>
			</div>
		</CSSTransition>
	);
};

export default Modal;

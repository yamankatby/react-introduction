import React from 'react';
import ListGroup from './components/ListGroup';
import Table from './components/Table';
import CreateTodo from './components/CreateTodo';
import Modal from './components/Modal/Modal';

const App = () => {
    return (
        <div className='container mt-3 mt-sm-5'>
            <ListGroup />
            <Table />

            <Modal>
                <CreateTodo />
            </Modal>
        </div>
    );
};

export default App;

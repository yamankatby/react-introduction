import React, { useCallback, useEffect, useState } from 'react';
import ListGroup from './components/ListGroup';
import Table from './components/Table';
import CreateTodo from './components/CreateTodo';
import Modal from './components/Modal/Modal';

const App = () => {
    const [isCreateTodoModalVisible, setIsCreateTodoModalVisible] = useState(false);

    useEffect(() => {
        const listener = e => {
            if (!e.ctrlKey || e.key !== 's') return;

            alert('You don\'t have to save. We are saving automatically.');
            e.preventDefault();
        };

        document.addEventListener('keypress', listener);
        return () => {
            document.removeEventListener('keypress', listener);
        };
    }, []);

    const onOpenCreateTodoModalClicked = useCallback(() => {
        setIsCreateTodoModalVisible(true);
    }, []);

    const onCloseCreateTodoModalClicked = useCallback(() => {
        setIsCreateTodoModalVisible(false);
    }, []);

    return (
        <div className='container mt-3 mt-sm-5'>
            <ListGroup />
            <Table onCreateTodoClick={onOpenCreateTodoModalClicked} />

            <Modal
                visible={isCreateTodoModalVisible}
                onRequestClose={onCloseCreateTodoModalClicked}
            >
                <CreateTodo />
            </Modal>
        </div>
    );
};

export default App;

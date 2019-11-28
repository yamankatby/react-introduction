import React, { useCallback, useEffect, useState } from 'react';
import ListGroup from './components/ListGroup';
import Table from './components/Table';
import CreateTodo from './components/CreateTodo';
import Modal from './components/Modal/Modal';

const todoList = [
    {
        id: 1,
        name: 'Learn React',
        completed: true,
    },
    {
        id: 2,
        name: 'Learn Html',
        completed: false,
    },
    {
        id: 3,
        name: 'Go to shopping',
        completed: false,
    },
    {
        id: 4,
        name: 'Learn Redux',
        completed: false,
    },
];

const App = () => {
    const [allTodos, setAllTodos] = useState(todoList);
    const [filteredTodos, setFilteredTodos] = useState(allTodos);

    const [selectedFilter, setSelectedFilter] = useState('all');

    useEffect(() => {
        setFilteredTodos(() => {
            if (selectedFilter === 'all') return allTodos;
            else if (selectedFilter === 'completed') return allTodos.filter((todo) => todo.completed === true);
            else if (selectedFilter === 'uncompleted') return allTodos.filter((todo) => todo.completed === false);
        });
    }, [allTodos, selectedFilter]);

    const [isCreateTodoModalVisible, setIsCreateTodoModalVisible] = useState(false);

    const onOpenCreateTodoModalClicked = useCallback(() => {
        setIsCreateTodoModalVisible(true);
    }, []);

    const onCloseCreateTodoModalClicked = useCallback(() => {
        setIsCreateTodoModalVisible(false);
    }, []);

    const onAllFilterSelected = useCallback(() => {
        setSelectedFilter('all');
    }, []);
    const onCompletedFilterSelected = useCallback(() => {
        setSelectedFilter('completed');
    }, []);
    const onUncompletedFilterSelected = useCallback(() => {
        setSelectedFilter('uncompleted');
    }, []);

    const onToggleTodoClicked = useCallback((id) => {
        alert('You have requested to Toggle the todo with id equals to ' + id);
    }, []);
    const onEditTodoClicked = useCallback((id) => {
        alert('You have requested to Edit the todo with id equals to ' + id);
    }, []);
    const onRemoveTodoClicked = useCallback((id) => {
        alert('You have requested to Remove the todo with id equals to ' + id);
    }, []);

    return (
        <div className='container mt-3 mt-sm-5'>
            <ListGroup
                allTodos={allTodos}
                onAllFilterSelect={onAllFilterSelected}
                onCompletedFilterSelect={onCompletedFilterSelected}
                onUncompletedFilterSelect={onUncompletedFilterSelected}
            />
            <Table
                todos={filteredTodos}
                onCreateTodoClick={onOpenCreateTodoModalClicked}
                onToggleTodoClick={onToggleTodoClicked}
                onEditTodoClick={onEditTodoClicked}
                onRemoveTodoClick={onRemoveTodoClicked}
            />

            <Modal
                title='Create new Todo'
                visible={isCreateTodoModalVisible}
                onRequestClose={onCloseCreateTodoModalClicked}
            >
                <CreateTodo onRequestClose={onCloseCreateTodoModalClicked} />
            </Modal>
        </div>
    );
};

export default App;

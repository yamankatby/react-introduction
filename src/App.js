import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TodoListContext, TodoListContextProvider } from './config/TodoListContext';
import ListGroup from './components/ListGroup';
import Table from './components/Table';
import CreateTodo from './components/CreateTodo';
import Modal from './components/Modal/Modal';
import './styles.css';

export const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRmYzEyZjVmNWMxZjAwMTc4NDAwMzMiLCJpYXQiOjE1NzQ5NDUwNzF9.6RwrnwfoJ1FA2kl0y3tzbmRqB8sMNDd4Re4U3bTkCBE';

const App = () => {
    const { allTodos, changeAllTodos, editTodo, toggleTodo, removeTodo } = useContext(TodoListContext);

    useEffect(() => {
        setIsLoading(true);
        axios({
            url: 'https://todolist-backend-app.herokuapp.com/todos',
            method: 'GET',
            headers: { Authorization: accessToken },
        }).then(response => {
            changeAllTodos(response.data);
        }).catch(e => {
            setError(e.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [changeAllTodos]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [isCreateTodoModalVisible, setIsCreateTodoModalVisible] = useState(false);
    const onOpenCreateTodoModalClicked = useCallback(() => {
        setIsCreateTodoModalVisible(true);
    }, []);
    const onCloseCreateTodoModalClicked = useCallback(() => {
        setIsCreateTodoModalVisible(false);
    }, []);

    const onToggleTodoClicked = useCallback(id => {
        setIsLoading(true);
        axios({
            url: 'https://todolist-backend-app.herokuapp.com/todos/toggle',
            method: 'POST',
            params: { id },
            headers: { Authorization: accessToken },
        }).then(() => {
            toggleTodo(id);
        }).catch(e => {
            setError(e.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [toggleTodo]);
    const onEditTodoClicked = useCallback(id => {
        const todoIndex = allTodos.findIndex(todo => todo.id === id);
        const todo = allTodos[todoIndex];

        const newName = prompt('Edit Task', todo.name);
        if (newName === null) return;
        if (newName === '' || newName === todo.name) {
            setError('Place enter a valid Task name!!');
            return;
        }

        setIsLoading(true);
        axios({
            url: 'https://todolist-backend-app.herokuapp.com/todos/edit',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken,
            },
            params: { id },
            data: { name: newName },
        }).then(() => {
            editTodo(id, newName);
        }).catch(e => {
            setError(e.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [allTodos, editTodo]);
    const onRemoveTodoClicked = useCallback(id => {
        const confirmed = window.confirm('Are you sure you want to delete the Task?');
        if (!confirmed) {
            return;
        }

        setIsLoading(true);
        axios({
            url: 'https://todolist-backend-app.herokuapp.com/todos/remove',
            method: 'POST',
            headers: { Authorization: accessToken },
            params: { id },
        }).then(() => {
            removeTodo(id);
        }).catch(e => {
            setError(e.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [removeTodo]);

    const renderIsLoading = isLoading && (
        <div className='spinner-overlay'>
            <div className='spinner-body'>
                <div className='spinner' />
            </div>
        </div>
    );
    const renderError = error && (
        <div className='alert alert-danger'>
            <button className='close' data-dismiss='alert'>&times;</button>
            {error}
        </div>
    );

    return (
        <div className='container mt-3 mt-sm-5'>
            {renderIsLoading}
            {renderError}
            <ListGroup />
            <Table
                onCreateTodoClick={onOpenCreateTodoModalClicked}
                onToggleTodoClick={onToggleTodoClicked}
                onEditTodoClick={onEditTodoClicked}
                onRemoveTodoClick={onRemoveTodoClicked}
            />
            <Modal
                title='Add a new task'
                visible={isCreateTodoModalVisible}
                onRequestClose={onCloseCreateTodoModalClicked}
            >
                <CreateTodo onRequestClose={onCloseCreateTodoModalClicked} />
            </Modal>
        </div>
    );
};

export default () => (
    <TodoListContextProvider>
        <App />
    </TodoListContextProvider>
);

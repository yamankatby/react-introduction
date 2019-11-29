import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ListGroup from './components/ListGroup';
import Table from './components/Table';
import CreateTodo from './components/CreateTodo';
import Modal from './components/Modal/Modal';
import './styles.css';

export const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRmYzEyZjVmNWMxZjAwMTc4NDAwMzMiLCJpYXQiOjE1NzQ5NDUwNzF9.6RwrnwfoJ1FA2kl0y3tzbmRqB8sMNDd4Re4U3bTkCBE';

const App = () => {
    const [allTodos, setAllTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState(allTodos);

    const [selectedFilter, setSelectedFilter] = useState('all');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        axios({
            url: 'https://todolist-backend-app.herokuapp.com/todos',
            method: 'GET',
            headers: {
                'Authorization': accessToken,
            },
        }).then((response) => {
            setAllTodos(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

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

    const addTodo = useCallback((todo) => {
        setAllTodos((prevTodos) => [...prevTodos, todo]);
    }, []);

    const onToggleTodoClicked = useCallback((id) => {
        setIsLoading(true);
        axios({
            url: 'https://todolist-backend-app.herokuapp.com/todos/toggle',
            method: 'POST',
            params: {
                id,
            },
            headers: {
                'Authorization': accessToken,
            },
        }).then(() => {
            const itemIndex = allTodos.findIndex(todo => todo.id === id);
            const item = allTodos[itemIndex];
            setAllTodos(prevTodos => [
                ...prevTodos.slice(0, itemIndex),
                {
                    ...item,
                    completed: !item.completed,
                },
                ...prevTodos.slice(itemIndex + 1),
            ]);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [allTodos]);
    const onEditTodoClicked = useCallback((id) => {
        const itemIndex = allTodos.findIndex((todo) => todo.id === id);
        const item = allTodos[itemIndex];

        const newName = prompt('Edit Todo', item.name);
        if (newName !== null) {
            if (newName === '') {
                setError('Place enter the new name!');
                return;
            }

            setIsLoading(true);
            axios({
                url: 'https://todolist-backend-app.herokuapp.com/todos/edit',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },
                params: {
                    id,
                },
                data: {
                    name: newName,
                },
            }).then(() => {
                setAllTodos((prevTodos) => [
                    ...prevTodos.slice(0, itemIndex),
                    {
                        ...prevTodos[itemIndex],
                        name: newName,
                    },
                    ...prevTodos.slice(itemIndex + 1),
                ]);
            }).catch((error) => {
                setError(error.message);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [allTodos]);
    const onRemoveTodoClicked = useCallback((id) => {
        setIsLoading(true);
        axios({
            url: 'https://todolist-backend-app.herokuapp.com/todos/remove',
            method: 'POST',
            headers: {
                'Authorization': accessToken,
            },
            params: {
                id,
            },
        }).then(() => {
            const itemIndex = allTodos.findIndex((todo) => todo.id === id);
            setAllTodos((prevTodos) => [
                ...prevTodos.slice(0, itemIndex),
                ...prevTodos.slice(itemIndex + 1),
            ]);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [allTodos]);

    return (
        <div className='container mt-3 mt-sm-5'>
            {
                isLoading &&
                <div className='spinner-overlay'>
                    <div className='spinner-body'>
                        <div className='spinner' />
                    </div>
                </div>
            }
            {
                error &&
                <div className='alert alert-danger'>
                    <button className='close' data-dismiss='alert'>
                        &times;
                    </button>
                    {error}
                </div>
            }
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
                <CreateTodo onRequestClose={onCloseCreateTodoModalClicked} addTodo={addTodo} />
            </Modal>
        </div>
    );
};

export default App;

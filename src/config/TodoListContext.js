import React, { createContext, useCallback, useEffect, useState } from 'react';

export const TodoListContext = createContext(undefined);

export const TodoListContextProvider = props => {
	const { children } = props;

	// AllTodos states
	const [allTodos, setAllTodos] = useState([]);
	const changeAllTodos = useCallback(todoList => {
		setAllTodos(todoList);
	}, []);
	const addTodo = useCallback(newTodo => {
		setAllTodos(prevTodos => [...prevTodos, newTodo]);
	}, []);
	const editTodo = useCallback((id, newName) => {
		const todoIndex = allTodos.findIndex(todo => todo.id === id);
		const todo = allTodos[todoIndex];
		setAllTodos(prevTodos => [
			...prevTodos.slice(0, todoIndex),
			{
				...todo,
				name: newName,
			},
			...prevTodos.slice(todoIndex + 1),
		]);
	}, [allTodos]);
	const toggleTodo = useCallback(id => {
		const todoIndex = allTodos.findIndex(todo => todo.id === id);
		const todo = allTodos[todoIndex];
		setAllTodos(prevTodos => [
			...prevTodos.slice(0, todoIndex),
			{
				...todo,
				completed: !todo.completed,
			},
			...prevTodos.slice(todoIndex + 1),
		]);
	}, [allTodos]);
	const removeTodo = useCallback(id => {
		const todoIndex = allTodos.findIndex(todo => todo.id === id);
		setAllTodos(prevTodos => [...prevTodos.slice(0, todoIndex), ...prevTodos.slice(todoIndex + 1)]);
	}, [allTodos]);

	// SelectedFilter states
	const [selectedFilter, setSelectedFilter] = useState('all');
	const showAllTodos = useCallback(() => {
		setSelectedFilter('all');
	}, []);
	const showCompletedTodos = useCallback(() => {
		setSelectedFilter('completed');
	}, []);
	const showUncompletedTodos = useCallback(() => {
		setSelectedFilter('uncompleted');
	}, []);

	// FilteredTodos states
	const [filteredTodos, setFilteredTodos] = useState(allTodos);
	useEffect(() => {
		setFilteredTodos(() => {
			if (selectedFilter === 'all') {
				return allTodos;
			} else if (selectedFilter === 'completed') {
				return allTodos.filter(todo => todo.completed === true);
			} else if (selectedFilter === 'uncompleted') {
				return allTodos.filter(todo => todo.completed === false);
			}
		});
	}, [allTodos, selectedFilter]);

	return (
		<TodoListContext.Provider
			value={{
				allTodos,
				changeAllTodos,
				addTodo,
				editTodo,
				toggleTodo,
				removeTodo,

				filteredTodos,

				selectedFilter,
				showAllTodos,
				showCompletedTodos,
				showUncompletedTodos,
			}}
		>
			{children}
		</TodoListContext.Provider>
	);
};

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('ToDo List App', () => {
  test('should display the correct content on the home page', () => {
    render(<App />);

    // Check the header
    expect(screen.getByText('Список дел')).toBeInTheDocument();

    // Check the buttons
    expect(screen.getByText('Создать')).toBeInTheDocument();
    expect(screen.getByText('Очистить всё')).toBeInTheDocument();

    // Check the input field
    expect(screen.getByPlaceholderText('Новый элемент списка')).toBeInTheDocument();

    // Check the placeholder for empty list
    expect(screen.getByText('Не найдено ни одного дела')).toBeInTheDocument();
  });

  test('should add a new todo item', () => {
    render(<App />);

    const inputField = screen.getByPlaceholderText('Новый элемент списка');
    const addButton = screen.getByText('Создать');

    // Fill the input field and click the add button
    fireEvent.change(inputField, { target: { value: 'Buy milk' } });
    fireEvent.click(addButton);

    // Check if the new todo item is displayed
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  test('should display the todo list correctly', () => {
    // Simulate an empty todo list
    render(<App />);
    expect(screen.getByText('Не найдено ни одного дела')).toBeInTheDocument();

    // Simulate a filled todo list
    const todos = [
      { text: 'Buy milk', date: '1.1.2023', done: false },
      { text: 'Clean the house', date: '2.1.2023', done: true },
    ];
    localStorage.setItem('todos', JSON.stringify(todos));
    render(<App />);

    todos.forEach((todo) => {
	  expect(screen.queryByText(todo.text)).toBeInTheDocument();
	  expect(screen.getByRole('checkbox', { checked: todo.done })).toBeInTheDocument();
	});
  });
});
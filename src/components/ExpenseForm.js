import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../features/budget/budgetSlice';

const expenseOptions = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];

const ExpenseForm = () => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [showOptions, setShowOptions] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addExpense({ description, amount: Number(amount), date }));
        setDescription('');
        setAmount('');
        setDate(new Date().toISOString().split('T')[0]);
    };

    const handleOptionClick = (option) => {
        setDescription(option);
        setShowOptions(false);
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <h2>Add Expense</h2>
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onFocus={() => setShowOptions(true)}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {showOptions && (
                    <ul style={{ position: 'absolute', top: '100%', left: 0, width: '100px', backgroundColor: 'white', border: '1px solid #ccc', listStyleType: 'none', padding: 0, margin: 0 }}>
                        {expenseOptions.map((option, index) => (
                            <li key={index} onClick={() => handleOptionClick(option)} style={{ padding: '8px', cursor: 'pointer' }}>
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;

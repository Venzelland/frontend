import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses, deleteExpense } from '../features/budget/budgetSlice';

const ExpenseList = () => {
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.budget.expenses);
    const status = useSelector(state => state.budget.status);
    const error = useSelector(state => state.budget.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchExpenses());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteExpense(id));
    };

    return (
        <div>
            <h2>Expenses</h2>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}
            <ul>
                {expenses.map(expense => (
                    <li key={expense._id}>
                        {expense.description}: ${expense.amount} on {new Date(expense.date).toLocaleDateString()}
                        <button onClick={() => handleDelete(expense._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;

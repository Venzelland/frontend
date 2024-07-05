import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncomes, deleteIncome } from '../features/budget/budgetSlice';

const IncomeList = () => {
    const dispatch = useDispatch();
    const incomes = useSelector(state => state.budget.incomes);
    const status = useSelector(state => state.budget.status);
    const error = useSelector(state => state.budget.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchIncomes());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteIncome(id));
    };

    return (
        <div>
            <h2>Incomes</h2>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}
            <ul>
                {incomes.map(income => (
                    <li key={income._id}>
                        {income.description}: ${income.amount} on {new Date(income.date).toLocaleDateString()}
                        <button onClick={() => handleDelete(income._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IncomeList;

import React from 'react';
import IncomeForm from './components/IncomeForm';
import IncomeList from './components/IncomeList';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const App = () => {
    return (
        <div>
            <h1>Семейный бюджет</h1>
            <IncomeList />
            <IncomeForm />
            <ExpenseList />
            <ExpenseForm />
        </div>
    );
};

export default App;

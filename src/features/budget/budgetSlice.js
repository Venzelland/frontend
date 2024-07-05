// src/features/budget/budgetSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    incomes: [],
    expenses: [],
    status: 'idle',
    error: null,
};

// Асинхронные действия для получения данных с сервера
export const fetchIncomes = createAsyncThunk('budget/fetchIncomes', async () => {
    const response = await axios.get('http://localhost:5000/incomes');
    return response.data;
});

export const fetchExpenses = createAsyncThunk('budget/fetchExpenses', async () => {
    const response = await axios.get('http://localhost:5000/expenses');
    return response.data;
});

export const addIncome = createAsyncThunk('budget/addIncome', async (income) => {
    const response = await axios.post('http://localhost:5000/incomes', income);
    return response.data;
});

export const addExpense = createAsyncThunk('budget/addExpense', async (expense) => {
    const response = await axios.post('http://localhost:5000/expenses', expense);
    return response.data;
});

export const deleteIncome = createAsyncThunk('budget/deleteIncome', async (id) => {
    await axios.delete(`http://localhost:5000/incomes/${id}`);
    return id;
});

export const deleteExpense = createAsyncThunk('budget/deleteExpense', async (id) => {
    await axios.delete(`http://localhost:5000/expenses/${id}`);
    return id;
});



const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIncomes.fulfilled, (state, action) => {
                state.incomes = action.payload;
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.expenses = action.payload;
            })
            .addCase(addIncome.fulfilled, (state, action) => {
                state.incomes.push(action.payload);
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.expenses.push(action.payload);
            })
            .addCase(deleteIncome.fulfilled, (state, action) => {
                state.incomes = state.incomes.filter(income => income._id !== action.payload);
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.expenses = state.expenses.filter(expense => expense._id !== action.payload);
            });
    },
});

export default budgetSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set users url to dummy API data
const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = []

// Create a asyncThunk fetch users function
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL)
    return response.data
})

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

// Export selectors
export const selectAllUsers = (state) => state.users

export default usersSlice.reducer
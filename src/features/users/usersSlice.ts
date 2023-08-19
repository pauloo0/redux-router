import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

// import { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface User {
  id: number
  name: string
}

interface UsersState {
  users: User[]
}

const initialState: UsersState = {
  users: [],
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(USERS_URL)
    return response.data
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = state.users.concat(action.payload)
    })
  },
})

export const selectAllUsers = (state: RootState) => state.users.users
export const selectUserById = (state: RootState, userId: number) =>
  state.users.users.find((user) => user.id === userId)

export default usersSlice.reducer

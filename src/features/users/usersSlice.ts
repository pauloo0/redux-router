import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface User {
  id: string
  name: string
}

interface UsersState {
  users: User[]
}

const initialState: UsersState = {
  users: [
    { id: '0', name: 'Tianna Jenkins' },
    { id: '1', name: 'Kevin Grant' },
    { id: '2', name: 'Madison Price' },
  ],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export const selectAllUsers = (state: RootState) => state.users.users

export default usersSlice.reducer

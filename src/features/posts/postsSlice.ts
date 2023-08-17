import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../utils/types'

const initialState = {
  posts: [
    {
      id: '1',
      title: 'Learning Redux Toolkit',
      content: "I've heard good things.",
    },
    {
      id: '2',
      title: 'Slices...',
      content: 'The more I say slice, the more I want pizza.',
    },
  ],
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.posts.push(action.payload)
    },
  },
})

export const selectAllPosts = (state: RootState) => state.posts.posts

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer

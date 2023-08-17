import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface Post {
  id: string
  title: string
  content: string
}

interface PostsState {
  posts: Post[]
}

const initialState: PostsState = {
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
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload)
      },
      prepare(title: string, content: string) {
        return {
          payload: {
            id: nanoid(), // nanoid is a function from redux toolkit that generates a unique ID string
            title,
            content,
          },
        }
      },
    },
  },
})

export const { postAdded } = postsSlice.actions

export const selectAllPosts = (state: RootState) => state.posts.posts

export default postsSlice.reducer

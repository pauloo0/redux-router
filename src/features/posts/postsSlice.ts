import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

import { sub } from 'date-fns' // date-fns is a library that provides functions for manipulating dates

interface PostReactions {
  thumbsUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

export interface Post {
  id: string
  title: string
  content: string
  userId?: string
  date: string
  reactions: PostReactions
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
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      reactions: {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    },
    {
      id: '2',
      title: 'Slices...',
      content: 'The more I say slice, the more I want pizza.',
      date: sub(new Date(), { minutes: 5 }).toISOString(),
      reactions: {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
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
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(), // nanoid is a function from redux toolkit that generates a unique ID string
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        }
      },
    },
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: keyof PostReactions }>
    ) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const { postAdded, reactionAdded } = postsSlice.actions

export const selectAllPosts = (state: RootState) => state.posts.posts

export default postsSlice.reducer

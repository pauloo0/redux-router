import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns' // date-fns is a library that provides functions for manipulating dates
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

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
  body: string
  userId?: string
  date?: string
  reactions?: PostReactions
}

interface PostsState {
  posts: Post[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL)
    return response.data
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
  }
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: Post) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost)
      return response.data
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
    }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload)
      },
      prepare(title: string, body: string, userId: string) {
        return {
          payload: {
            id: nanoid(), // nanoid is a function from redux toolkit that generates a unique ID string
            title,
            body,
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
      if (existingPost && existingPost.reactions) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Adding date and reactions
        let min = 1
        const loadedPosts = action.payload.map((post: Post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          }
          return post
        })

        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId)
        action.payload.date = new Date().toISOString()
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        }

        state.posts.push(action.payload)
      })
  },
})

export const { postAdded, reactionAdded } = postsSlice.actions

export const selectAllPosts = (state: RootState) => state.posts.posts
export const getPostsStatus = (state: RootState) => state.posts.status
export const getPostsError = (state: RootState) => state.posts.error

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post) => post.id === postId)

export default postsSlice.reducer

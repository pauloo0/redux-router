import { CounterState } from '../features/counter/types'
import { PostState } from '../features/posts/types'

// import { Post } from './../features/posts/types'

export interface RootState {
  counter: CounterState
  posts: PostState
}

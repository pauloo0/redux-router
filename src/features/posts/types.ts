export interface Post {
  id: number
  title: string
  content: string
}

export interface PostState {
  posts: Post[]
}

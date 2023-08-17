import React from 'react'
import { Post } from './postsSlice'

import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

interface PostsExcerptProps {
  post: Post
}

const PostsExcerpt: React.FC<PostsExcerptProps> = ({ post }) => {
  return (
    <article className='rounded-xl border border-zinc-500 p-5'>
      <h3 className='text-3xl font-semibold mb-2'>{post.title}</h3>
      <p className='text-xl font-light'>{post.body.substring(0, 100)}</p>
      <p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default PostsExcerpt

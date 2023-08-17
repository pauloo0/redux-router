import React from 'react'
import { useAppSelector } from '../../app/hooks'

import { selectPostById } from './postsSlice'

import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const SinglePostPage: React.FC = () => {
  const postId = '1'
  const post = useAppSelector((state) => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <article className='rounded-xl border border-zinc-500 p-5'>
      <h3 className='text-3xl font-semibold mb-2'>{post.title}</h3>
      <p className='text-xl font-light'>{post.body}</p>
      <p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default SinglePostPage

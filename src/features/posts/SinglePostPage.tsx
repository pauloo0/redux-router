import React from 'react'
import { useAppSelector } from '../../app/hooks'

import { selectPostById } from './postsSlice'

import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import PostNotFound from './PostNotFound'

import { useParams, Link } from 'react-router-dom'

const SinglePostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>()

  const post = useAppSelector((state) => selectPostById(state, Number(postId)))

  if (!post) {
    return <PostNotFound />
  }

  return (
    <article className='rounded-xl border border-zinc-500 p-5'>
      <h3 className='text-3xl font-semibold mb-2'>{post.title}</h3>
      <p className='text-xl font-light'>{post.body}</p>
      <p className='flex items-center justify-start space-x-4'>
        <Link to={`/post/edit/${post.id}`} className='hover:underline'>
          Edit Post
        </Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default SinglePostPage

import React, { useEffect } from 'react'
import PostsExcerpt from './PostsExcerpt'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import {
  fetchPosts,
  selectAllPosts,
  getPostsStatus,
  getPostsError,
} from './postsSlice'

const PostsList: React.FC = () => {
  const dispatch = useAppDispatch()

  const posts = useAppSelector(selectAllPosts)
  const postsStatus = useAppSelector(getPostsStatus)
  const error = useAppSelector(getPostsError)

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  let content
  if (postsStatus === 'loading') {
    content = <p>"Loading..."</p>
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => {
      if (a.date && b.date) {
        return b.date.localeCompare(a.date)
      } else {
        return 0
      }
    })
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ))
  } else if (postsStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className='mx-auto w-[90vw]'>
      <h2 className='text-4xl font-semibold mb-6'>Posts</h2>
      <div className='grid grid-cols-1 gap-3'>{content}</div>
    </section>
  )
}

export default PostsList

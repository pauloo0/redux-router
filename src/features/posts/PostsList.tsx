import React from 'react'
import { selectAllPosts } from './postsSlice'
import { useSelector } from 'react-redux'

const PostsList: React.FC = () => {
  const posts = useSelector(selectAllPosts)

  const renderedPosts = posts.map((post) => (
    <article className='rounded-xl border border-zinc-500 p-5' key={post.id}>
      <h3 className='text-3xl font-semibold mb-2'>{post.title}</h3>
      <p className='text-xl font-light'>{post.content.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section className='mx-auto w-[90vw]'>
      <h2 className='text-4xl font-semibold mb-6'>Posts</h2>
      <div className='grid grid-cols-1 gap-3'>{renderedPosts}</div>
    </section>
  )
}

export default PostsList

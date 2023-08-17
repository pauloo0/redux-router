import React from 'react'

import AddPostForm from '../features/posts/AddPostForm'
import PostsList from '../features/posts/PostsList'

const Home: React.FC = () => {
  return (
    <div className='bg-zinc-800 min-h-screen text-white py-12'>
      <AddPostForm />
      <hr className='mx-auto w-[90vw] my-8' />
      <PostsList />
    </div>
  )
}

export default Home

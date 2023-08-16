import React from 'react'
import PostsList from './features/posts/PostsList'

const App: React.FC = () => {
  return (
    <div className='bg-zinc-800 h-screen text-white py-12'>
      <PostsList />
    </div>
  )
}

export default App

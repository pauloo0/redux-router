import React from 'react'

// import PostsList from './features/posts/PostsList'
// import AddPostForm from './features/posts/AddPostForm'
import Counter from './features/counter/Counter'

const App: React.FC = () => {
  return (
    <div className='bg-zinc-800 h-screen text-white py-12'>
      {/* <AddPostForm />
      <hr className='mx-auto w-[90vw] my-8' />
      <PostsList /> */}
      <Counter />,
    </div>
  )
}

export default App

import React from 'react'

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

// layouts
import RootLayout from './layouts/RootLayout'

// pages
import PostsList from './features/posts/PostsList'
import SinglePostPage from './features/posts/SinglePostPage'
import AddPostForm from './features/posts/AddPostForm'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<PostsList />} />
      <Route path='post'>
        <Route index element={<AddPostForm />} />
        <Route path=':postId' element={<SinglePostPage />} />
      </Route>
    </Route>
  )
)

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App

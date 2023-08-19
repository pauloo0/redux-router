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
// Posts
import PostsList from './features/posts/PostsList'
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'
import AddPostForm from './features/posts/AddPostForm'
// Users
import UsersList from './features/users/UsersList'
import UserPage from './features/users/UserPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<PostsList />} />
        <Route path='post'>
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePostPage />} />
          <Route path='edit/:postId' element={<EditPostForm />} />
        </Route>
        <Route path='user'>
          <Route index element={<UsersList />} />
          <Route path=':userId' element={<UserPage />} />
        </Route>
      </Route>

      <Route path='*' element={<h1>Page not found</h1>} />
    </>
  )
)

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App

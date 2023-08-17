import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { postAdded } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const AddPostForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const users = useAppSelector(selectAllUsers)

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId))

      setTitle('')
      setContent('')
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section className='mx-auto w-[90vw]'>
      <h2 className='text-4xl font-semibold mb-6'>Add a New Post</h2>
      <form className='flex flex-col '>
        <label htmlFor='postTitle' className='text-xl mb-2'>
          Post Title:
        </label>
        <input
          type='text'
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={onTitleChanged}
          className='px-3 py-2 text-zinc-900 text-xl'
        />
        <label htmlFor='postContent' className='text-xl mb-2 mt-4'>
          Content:
        </label>
        <textarea
          id='postContent'
          name='postContent'
          value={content}
          onChange={onContentChanged}
          className='px-3 py-2 text-zinc-900 text-xl'
        />
        <label htmlFor='postAuthor' className='text-xl mb-2 mt-4'>
          Author:
        </label>
        <select
          id='postAuthor'
          value={userId}
          onChange={onAuthorChanged}
          className='px-3 py-2 text-zinc-900 text-xl'
        >
          <option value=''>Please select an author</option>
          {userOptions}
        </select>
        <button
          type='button'
          onClick={onSavePostClicked}
          className='mt-6 w-full bg-zinc-200 text-zinc-900 py-1 rounded-md text-xl'
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm

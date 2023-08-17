import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'

import { postAdded } from './postsSlice'

const AddPostForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content))

      setTitle('')
      setContent('')
    }
  }

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
        <button
          type='button'
          onClick={onSavePostClicked}
          className='mt-6 w-full bg-zinc-200 text-zinc-900 py-1 rounded-md text-xl'
        >
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm

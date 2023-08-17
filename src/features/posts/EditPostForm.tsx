import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useParams, useNavigate } from 'react-router-dom'

import { selectPostById, updatePost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import PostNotFound from './PostNotFound'

const EditPostForm: React.FC = () => {
  const { postId } = useParams<{ postId: string }>()
  const navigate = useNavigate()

  const post = useAppSelector((state) => selectPostById(state, Number(postId)))
  const users = useAppSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.body || '')
  const [userId, setUserId] = useState(post?.userId)
  const [requestStatus, setRequestStatus] = useState('idle')

  const dispatch = useAppDispatch()

  if (!post) return <PostNotFound />

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value)

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setRequestStatus('pending')
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap()

        setTitle('')
        setContent('')
        setUserId('')
        navigate(`/post/${postId}`)
      } catch (error) {
        if (error instanceof Error) {
          console.log('Failed to save the post: ', error.message)
        }
      } finally {
        setRequestStatus('idle')
      }
    }
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section className='mx-auto w-[90vw]'>
      <h2 className='text-4xl font-semibold mb-6'>Edit Post</h2>
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
          defaultValue={userId}
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

export default EditPostForm

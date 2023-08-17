import React from 'react'
import { useAppDispatch } from '../../app/hooks'

import { reactionAdded, Post } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😲',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕️',
}

interface ReactionButtonsProps {
  post: Post
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ post }) => {
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const reactionKey = name as keyof typeof reactionEmoji
    return (
      <button
        key={reactionKey}
        type='button'
        className='m-1'
        onClick={() =>
          dispatch(
            reactionAdded({
              postId: post.id,
              reaction: reactionKey,
            })
          )
        }
      >
        {emoji} {post.reactions[reactionKey]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}

export default ReactionButtons

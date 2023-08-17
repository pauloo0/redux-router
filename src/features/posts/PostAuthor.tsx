import React from 'react'
import { useAppSelector } from '../../app/hooks'

import { selectAllUsers } from '../users/usersSlice'

interface AuthorProps {
  userId: string | undefined
}

const PostAuthor: React.FC<AuthorProps> = ({ userId }) => {
  const users = useAppSelector(selectAllUsers)
  const author = users.find((user) => user.id === userId)

  return <span>by {author ? author.name : 'Unkown author'}</span>
}

export default PostAuthor

import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'

const UsersList: React.FC = () => {
  const users = useAppSelector(selectAllUsers)

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section className='mx-auto w-[90vw]'>
      <h2 className='text-4xl font-semibold mb-6'>Users</h2>
      <ul className='grid grid-cols-1 gap-3'>{renderedUsers}</ul>
    </section>
  )
}

export default UsersList

import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav className='flex items-center justify-between mx-auto w-[90vw] py-4'>
      <Link to='/' className='font-semibold text-5xl'>
        Redux Router Blog
      </Link>
      <div className='flex items-center justify-center space-x-4 text-xl'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/post'>Posts</NavLink>
      </div>
    </nav>
  )
}

export default Navbar

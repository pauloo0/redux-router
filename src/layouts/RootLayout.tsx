import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../features/navbar/Navbar'

const RootLayout: React.FC = () => {
  return (
    <>
      <header className='bg-fuchsia-700 text-white'>
        <Navbar />
      </header>
      <main className='bg-zinc-800 min-h-screen text-white py-12'>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './counterSlice'
import { RootState } from '../../utils/types'

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.count)
  const dispatch = useDispatch()

  return (
    <section className='h-screen text-center flex flex-col align-center justify-center bg-yellow-50'>
      <p className='text-7xl mb-4'>{count}</p>
      <div className='flex align-center justify-center space-x-4'>
        <button
          className='w-20 h-20 text-4xl bg-slate-400 text-center'
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className='w-20 h-20 text-4xl bg-slate-400 text-center'
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
    </section>
  )
}

export default Counter

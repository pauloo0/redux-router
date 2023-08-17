import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { increment, decrement, reset, incrementByAmount } from './counterSlice'

const Counter: React.FC = () => {
  const count = useAppSelector((state) => state.counter.count)
  const dispatch = useAppDispatch()

  const [incrementAmount, setIncrementAmount] = useState('0')

  const addValue: number = Number(incrementAmount) || 0

  const resetAll = () => {
    setIncrementAmount('0')
    dispatch(reset())
  }

  return (
    <section className='h-screen text-center flex flex-col align-center justify-center'>
      <p className='text-7xl'>{count}</p>
      <div className='mt-8 mb-4 flex align-center justify-center space-x-4'>
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

      <div className='mt-8 mb-4 flex align-center justify-center space-x-4'>
        <input
          type='text'
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
          className='text-slate-900'
        />
        <button
          className='text-4xl bg-slate-400 text-center'
          onClick={() => dispatch(incrementByAmount(addValue))}
        >
          Add Amount
        </button>
        <button
          className='text-4xl bg-slate-400 text-center'
          onClick={resetAll}
        >
          Reset
        </button>
      </div>
    </section>
  )
}

export default Counter

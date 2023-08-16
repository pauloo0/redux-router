import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, incrementByAmount } from './counterSlice'
import { RootState } from '../../utils/types'

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.count)
  const dispatch = useDispatch()

  const [incrementAmount, setIncrementAmount] = useState('0')

  const addValue: number = Number(incrementAmount) || 0

  const resetAll = () => {
    setIncrementAmount('0')
    dispatch(reset())
  }

  return (
    <section className='h-screen text-center flex flex-col align-center justify-center bg-yellow-50'>
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

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'
import { Link, useNavigate } from 'react-router-dom'


const searchbar = () => {

    const [text, setText] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(setQuery(text))
        navigate('/')
        }

  return (
    <div className='sticky top-0 z-50 flex items-center gap-4 p-4 bg-white shadow'>
      <Link 
        to='/'
        onClick={() => {
          setText('')
          dispatch(setQuery(''))
        }}
      >
        <span className='text-4xl font-black text-[#0D330E]'>Pixora</span>
      </Link>

      <form className='flex gap-2 w-full'
        onSubmit={(e) => {
        submitHandler(e)
        }} >
        <input required type="text" placeholder='search anything....'
        className='w-full border-3 border-[#2D531A] bg-white text-[#0D330E] placeholder:text-[#6E8649] rounded-4xl p-2 m-1 outline-none'
        value={text}
        onChange={(e) => {
            setText(e.target.value)
        }}           
        />
        <button className=' bg-[#0D330E] active:scale-95 cursor-pointer text-white border border-[#0D330E] rounded-4xl px-5 m-1'>Search</button>
        <Link to='/collection' className=' bg-[#0D330E] active:scale-95 cursor-pointer text-white border border-[#0D330E] rounded-4xl px-5 m-1 flex items-center'>Collection</Link>
      </form>
    </div>
  )
}

export default searchbar

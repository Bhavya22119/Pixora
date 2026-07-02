import React from 'react'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'
import { Link } from 'react-router-dom'

const HomePage = () => {

        const { query } = useSelector((store) => store.search)
        const dispatch = useDispatch()
        const searches = ['Nature', 'Fashion', 'Travel', 'Food', 'Architecture', 'Cars', 'Space', 'Abstract']
        const previewImages = [
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80',
          'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=500&q=80',
          'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=500&q=80',
          'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=500&q=80',
          'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80',
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80'
        ]


  return (
    <div>
      {query != '' ? <div> <Tabs />
      <ResultGrid /> </div> : 
      <div className='h-[calc(100vh-88px)] overflow-hidden flex items-center justify-center px-5'>
        <div className='max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center'>
          <div>
            <h1 className='text-5xl md:text-6xl font-black text-[#0D330E] leading-tight'>
              Explore visuals that match your mood.
            </h1>

            <p className='text-[#2D531A] text-xl mt-5'>
              Search photos and videos together, then save your favorites in one place.
            </p>

            <div className='flex flex-wrap gap-3 mt-8'>
              {searches.map((item, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      dispatch(setQuery(item))
                    }}
                    className='bg-white border border-[#2D531A] text-[#0D330E] rounded-4xl px-5 py-2 active:scale-95 cursor-pointer hover:bg-[#0D330E] hover:text-white transition'
                  >
                    {item}
                  </button>
                )
              })}
            </div>

            <Link to='/collection' className='inline-flex mt-7 bg-[#0D330E] active:scale-95 text-white rounded-4xl px-6 py-3'>
              View Collection
            </Link>
          </div>

          <div className='hidden md:grid grid-cols-3 gap-4 h-[500px]'>
            <img className='h-72 w-full rounded-3xl object-cover shadow-xl mt-16' src={previewImages[0]} alt='green landscape preview' />
            <img className='h-60 w-full rounded-3xl object-cover shadow-xl' src={previewImages[1]} alt='soft light preview' />
            <img className='h-80 w-full rounded-3xl object-cover shadow-xl mt-10' src={previewImages[2]} alt='travel road preview' />
            <img className='h-56 w-full rounded-3xl object-cover shadow-xl' src={previewImages[3]} alt='sunrise preview' />
            <img className='h-72 w-full rounded-3xl object-cover shadow-xl mt-20' src={previewImages[4]} alt='night sky preview' />
            <img className='h-60 w-full rounded-3xl object-cover shadow-xl' src={previewImages[5]} alt='calm valley preview' />
          </div>
        </div>
      </div>}

    </div>
  )
}

export default HomePage

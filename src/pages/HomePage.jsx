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
          'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80',
          'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=500&q=80',
          'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80',
          'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80'
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

          <div className='relative hidden md:block h-[500px]'>
            <img className='absolute left-0 top-14 h-72 w-52 rounded-3xl object-cover shadow-xl' src={previewImages[0]} alt='nature preview' />
            <img className='absolute left-44 top-0 h-60 w-48 rounded-3xl object-cover shadow-xl' src={previewImages[1]} alt='fashion preview' />
            <img className='absolute right-8 top-20 h-80 w-56 rounded-3xl object-cover shadow-xl' src={previewImages[2]} alt='travel preview' />
            <img className='absolute left-24 bottom-0 h-52 w-60 rounded-3xl object-cover shadow-xl' src={previewImages[3]} alt='creative preview' />
            <img className='absolute right-32 bottom-10 h-48 w-44 rounded-3xl object-cover shadow-xl' src={previewImages[4]} alt='space preview' />

            <div className='absolute left-36 top-56 bg-white/95 shadow-2xl rounded-3xl p-5 border border-[#2D531A]'>
              <h2 className='text-2xl font-black text-[#0D330E]'>Photos + Videos</h2>
              <p className='text-[#477023] mt-1'>One search. One visual feed.</p>
            </div>
          </div>
        </div>
      </div>}

    </div>
  )
}

export default HomePage

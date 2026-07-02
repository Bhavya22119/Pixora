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

          <div className='hidden md:flex justify-center'>
            <div className='relative h-[500px] w-[380px] rounded-[38px] overflow-hidden bg-[#071E07] shadow-[0_30px_90px_rgba(13,51,14,0.28)] border border-[#DCE5D2]'>
              <img 
                className='h-full w-full object-cover opacity-95'
                src='/pixora-home-bg.jpg'
                alt='Pixora floral visual preview'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#071E07]/35 via-transparent to-white/10'></div>
              <div className='absolute inset-4 rounded-[30px] border border-white/20'></div>
            </div>
          </div>
        </div>
      </div>}

    </div>
  )
}

export default HomePage

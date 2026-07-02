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
      <div 
        className='h-[calc(100vh-88px)] overflow-hidden flex items-center justify-center px-5 bg-cover bg-center relative'
        style={{ backgroundImage: "url('/pixora-front-bg.png')" }}
      >
        <div className='absolute inset-0 bg-black/35'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,51,14,0.25),rgba(0,0,0,0.72))]'></div>

        <div className='relative max-w-4xl w-full text-center'>
          <div className='bg-white/10 border border-white/20 backdrop-blur-sm rounded-[34px] px-6 py-10 md:px-12 md:py-12 shadow-[0_30px_90px_rgba(0,0,0,0.35)]'>
            <h1 className='text-5xl md:text-7xl font-black text-white leading-tight'>
              Explore visuals that match your mood.
            </h1>

            <p className='text-white/85 text-xl mt-5 max-w-2xl mx-auto'>
              Search photos and videos together, then save your favorites in one place.
            </p>

            <div className='flex flex-wrap justify-center gap-3 mt-8'>
              {searches.map((item, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      dispatch(setQuery(item))
                    }}
                    className='bg-white/90 border border-white/30 text-[#0D330E] rounded-4xl px-5 py-2 active:scale-95 cursor-pointer hover:bg-[#0D330E] hover:text-white transition'
                  >
                    {item}
                  </button>
                )
              })}
            </div>

            <Link to='/collection' className='inline-flex mt-7 bg-[#0D330E] active:scale-95 text-white rounded-4xl px-6 py-3 border border-white/20'>
              View Collection
            </Link>
          </div>
        </div>
      </div>}

    </div>
  )
}

export default HomePage

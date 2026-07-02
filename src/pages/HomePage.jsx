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
      <div className='min-h-[75vh] flex items-center justify-center px-5'>
        <div className='max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center'>
          <div>
            <h1 className='text-5xl md:text-7xl font-black text-[#0D330E] leading-tight'>
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

          <div className='grid grid-cols-3 gap-4 h-[440px]'>
            <div className='rounded-3xl bg-[#6E8649] mt-16'></div>
            <div className='rounded-3xl bg-[#477023] mb-20'></div>
            <div className='rounded-3xl bg-[#2D531A] mt-8'></div>
            <div className='rounded-3xl bg-[#0D330E] mb-10'></div>
            <div className='rounded-3xl bg-[#6E8649] mt-24'></div>
            <div className='rounded-3xl bg-[#477023] mb-24'></div>
          </div>
        </div>
      </div>}

    </div>
  )
}

export default HomePage

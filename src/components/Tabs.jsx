import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTabs } from '../redux/features/searchSlice'


const Tabs = () => {

    const tabs = ['All' , 'Photos' , 'Videos']

    const dispatch = useDispatch()

    const activeTab = useSelector((state) => state.search.activeTab)


  return (
    <div className='flex gap-2 mx-4 p-2'>
      {tabs.map(function(elem , idx){
        return (
            <button 
                className= {`${(activeTab == elem ? 'bg-[#0D330E] text-white ' : 'bg-white text-[#0D330E]')}  active:scale-95 cursor-pointer border text-2xl border-[#2D531A] rounded-4xl px-4`}
                key={idx}
                onClick={() => {
                console.log(elem)
                dispatch(setActiveTabs(elem))
            }}
            >
                {elem}
            </button>
        )
      })}
    </div>
  )
}

export default Tabs

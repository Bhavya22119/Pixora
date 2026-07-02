import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ResultCard from '../components/ResultCard'
import { removeCollection } from '../redux/features/collectionSlice'

const CollectionPage = () => {

  const dispatch = useDispatch()
  const { collection } = useSelector((store) => store.collection)
  const [selectedItem, setSelectedItem] = useState(null)

  const removeItem = (item) => {
    dispatch(removeCollection(item))
    setSelectedItem(null)
  }

  return (
    <div className='p-4'>
      {selectedItem && (
        <div className='fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-5'>
          <div className='bg-white rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] grid md:grid-cols-2 shadow-2xl'>
            <div className='bg-[#071E07] flex items-center justify-center max-h-[90vh] overflow-hidden'>
              {selectedItem.type === 'photo' && (
                <img className='w-full h-full object-contain' src={selectedItem.src} alt={selectedItem.title} />
              )}

              {selectedItem.type === 'video' && (
                <video className='w-full h-full object-contain' src={selectedItem.src} autoPlay loop muted playsInline controls />
              )}
            </div>

            <div className='p-6 flex flex-col justify-between gap-6'>
              <div>
                <div className='flex justify-between items-start gap-4'>
                  <h2 className='text-3xl font-bold text-[#0D330E] capitalize'>{selectedItem.title}</h2>
                  <button
                    onClick={() => {
                      setSelectedItem(null)
                    }}
                    className='text-3xl leading-none active:scale-95 cursor-pointer'
                  >
                    x
                  </button>
                </div>

                <p className='text-[#2D531A] mt-4 text-lg'>
                  Type: {selectedItem.type} | Size: {selectedItem.width} x {selectedItem.height}
                </p>
              </div>

              <div className='flex flex-wrap gap-3'>
                <a
                  href={selectedItem.download || selectedItem.src}
                  download
                  target='_blank'
                  rel='noreferrer'
                  className='bg-[#0D330E] active:scale-95 text-white rounded-4xl px-5 py-2 cursor-pointer'
                >
                  Download
                </a>

                <button
                  onClick={() => {
                    removeItem(selectedItem)
                  }}
                  className='bg-[#E60023] active:scale-95 text-white rounded-4xl px-5 py-2 cursor-pointer'
                >
                  Remove
                </button>

                <a
                  href={selectedItem.url}
                  target='_blank'
                  rel='noreferrer'
                  className='bg-white active:scale-95 text-[#0D330E] border border-[#0D330E] rounded-4xl px-5 py-2 cursor-pointer'
                >
                  Original Link
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className='text-3xl font-bold mb-5 text-[#0D330E]'>Your Collections</h1>

      {collection.length == 0 ? <h2 className='text-[#0D330E]'>No saved items yet</h2> : ''}

      <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5 px-4 md:px-10 py-4'>
        {collection.map((item) => {
          return (
            <div key={item.type + item.id} className='mb-5 break-inside-avoid'>
              <ResultCard item={item} showSave={false} showRemove={true} onCardClick={setSelectedItem} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CollectionPage

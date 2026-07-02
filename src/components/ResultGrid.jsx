import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos, fetchVideos } from '../api/mediaApi'
import { setResults, appendResults, setError, setLoading, clearResults } from '../redux/features/searchSlice'
import { useEffect, useState } from 'react'
import ResultCard from './ResultCard'
import { addCollection } from '../redux/features/collectionSlice'

const ResultGrid = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search
  )

  const saveSelectedItem = (item) => {
    dispatch(addCollection(item))
  }

  const makePhotos = (response) => {
    return response.results.map((item) => ({
      id: item.id,
      type: 'photo',
      title: item.alt_description || item.description || `${query} photo`,
      thumbnail: item.urls.small,
      src: item.urls.regular,
      download: item.links.download,
      url: item.links.html,
      width: item.width,
      height: item.height,
    }))
  }

  const makeVideos = (response) => {
    return response.hits.map((item) => ({
      id: item.id,
      type: 'video',
      title: item.tags || `${query} video`,
      thumbnail: item.videos.medium.thumbnail,
      src: item.videos.medium.url,
      download: item.videos.medium.url,
      url: item.pageURL,
      width: item.videos.medium.width,
      height: item.videos.medium.height,
    }))
  }

  useEffect(() => {
    if (!query) return

    dispatch(clearResults())
    setPage(1)
    setHasMore(true)
    setSelectedItem(null)
  }, [query, activeTab, dispatch])

  useEffect(() => {
    if (!query) return
    let ignore = false

    const getData = async () => {
      try {
        let data = []

        if(page == 1){
          dispatch(setLoading())
        }else{
          setLoadingMore(true)
        }

        if (activeTab === 'All') {
          let photoResponse = await fetchPhotos(query, page, 20)
          let videoResponse = await fetchVideos(query, page, 20)

          let photos = makePhotos(photoResponse)
          let videos = makeVideos(videoResponse)
          let maxLength = Math.max(photos.length, videos.length)

          for(let i = 0; i < maxLength; i++){
            if(photos[i]){
              data.push(photos[i])
            }

            if(videos[i]){
              data.push(videos[i])
            }
          }
        }

        if (activeTab === 'Photos') {
          let response = await fetchPhotos(query, page, 30)

          data = makePhotos(response)
        }

        if (activeTab === 'Videos') {
          let response = await fetchVideos(query, page, 30)

          data = makeVideos(response)
        }

        if(!ignore){
          if(data.length == 0){
            setHasMore(false)
          }

          if(page == 1){
            dispatch(setResults(data))
          }else{
            dispatch(appendResults(data))
          }
        }
      } catch (err) {
        if(!ignore){
          dispatch(setError(err.message))
        }
      } finally {
        if(!ignore){
          setLoadingMore(false)
        }
      }
    }

    getData()

    return () => {
      ignore = true
    }
  }, [query, activeTab, page, dispatch])

  useEffect(() => {
    const scrollHandler = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 700

      if(query && nearBottom && !loading && !loadingMore && hasMore){
        setLoadingMore(true)
        setPage((prev) => prev + 1)
      }
    }

    window.addEventListener('scroll', scrollHandler)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [query, loading, loadingMore, hasMore])

  if (loading) return <h1 className='text-[#0D330E] text-3xl px-10 py-8'>Loading...</h1>
  if (error) return <h1 className='text-[#0D330E] text-3xl px-10 py-8'>Error: {error}</h1>

  return (
    <>
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
                    saveSelectedItem(selectedItem)
                  }}
                  className='bg-[#0D330E] active:scale-95 text-white rounded-4xl px-5 py-2 cursor-pointer'
                >
                  Save
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

      <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5 px-4 md:px-10 py-4'>
        {results.map((item) => {
          return (
            <div key={item.type + item.id} className='mb-5 break-inside-avoid'>
              <ResultCard item={item} onCardClick={setSelectedItem} />
            </div>
          )
        })}
      </div>

      {loadingMore && <h2 className='text-[#0D330E] text-center text-2xl py-6'>Loading more...</h2>}
    </>
  )
}

export default ResultGrid

import React from 'react'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'
import { useSelector } from 'react-redux'

const HomePage = () => {

        const { query } = useSelector((store) => store.search)


  return (
    <div>
      {query != '' ? <div> <Tabs />
      <ResultGrid /> </div> : ''}

    </div>
  )
}

export default HomePage

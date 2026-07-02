import React from 'react'
import { Route , Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/CollectionPage'
import SearchBar from './components/SearchBar'

const App = () => {
  return (
    <div>
      <SearchBar />
      <Routes>
        <Route path='/' element = {<HomePage />} />
        <Route path='/collection' element = {<CollectionPage />} />
      </Routes>
    </div>    
    )
}

export default App

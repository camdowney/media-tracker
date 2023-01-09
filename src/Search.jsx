import { useState, useEffect } from 'react'
import { Hero, SearchForm, List } from './components'
import mediaData from './lib/mediaData'
import { sortByProp } from './lib/util'

export default function Search() {
  const [searchResults, setSearchResults] = useState([])

  const genres = mediaData.reduce((all, current) => all.concat(current.genres), [])
  const uniqueGenres = [...new Set(genres)].sort()

  useEffect(filter, [])

  function filter() {
    const urlParams = new URLSearchParams(window.location.search)

    const title = urlParams.get('title')
    const type = urlParams.get('type')
    const genre = urlParams.get('genre')

    const filtered = mediaData.filter(item => 
      (!title || item.title.toLowerCase().includes(title.toLowerCase())) 
      && (!type || item.format === type) 
      && (!genre || item.genres.includes(genre))
    )
    
    setSearchResults(sortByProp(filtered, 'title'))
  }

  return (
    <main>
      <Hero title='Discover New Titles' />
      <SearchForm filter={filter} genres={uniqueGenres} />
      <List
        title='Results:'
        items={searchResults}
        hideToolbar
      />
    </main>
  )
}
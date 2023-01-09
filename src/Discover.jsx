import { useState } from 'react'
import { Hero, SearchForm, List } from './components'
import mediaData from './lib/mediaData'
import { sortByProp } from './lib/util'

export default function Discover() {
  const [searchResults, setSearchResults] = useState(sortByProp(mediaData, 'title'))

  function filter({ title, type, genre }) {
    if (!title && !type && !genre) {
      return setSearchResults(sortByProp(mediaData, 'title'))
    }

    const filtered = mediaData.filter(current => 
      (!title || current.title.toLowerCase().includes(title.toLowerCase())) 
      && (!type || current.format === type) 
      && (!genre || current.genres.includes(genre))
    )
    
    setSearchResults(sortByProp(filtered, 'title'))
  }

  const genres = mediaData.reduce((all, current) => all.concat(current.genres), [])
  const uniqueGenres = [...new Set(genres)].sort()

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
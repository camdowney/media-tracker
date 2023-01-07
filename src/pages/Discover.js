import { useState } from 'react'
import { Hero, SearchForm, List } from '../components'
import masterList from '../data/masterList'
import { sortBy } from '../lib/util'

export default function Discover() {
  const [mediaList, setList] = useState(sortBy(masterList, 'title'))

  const slimByParams = (title, mediaType, genre) => {
    if (!title && !mediaType && !genre) {
      return setList(sortBy(masterList, 'title'))
    }

    const filtered = masterList.filter(current => 
      (!title || current.title.toLowerCase().includes(title.toLowerCase())) 
      && (!mediaType || current.format === mediaType) 
      && (!genre || current.genres.includes(genre))
    )
    
    setList(sortBy(filtered, 'title'))
  }

  const genres = masterList.reduce((all, current) => all.concat(current.genres), [])
  const uniqueGenres = [...new Set(genres)].sort()

  return (
    <main>
      <Hero title='Discover New Titles' />
      <SearchForm slimByParams={slimByParams} genres={uniqueGenres} />
      <List
        title='Results:'
        items={mediaList}
        hideToolbar
      />
    </main>
  )
}
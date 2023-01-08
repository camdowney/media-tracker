import { useState } from 'react'
import { Hero, SearchForm, List } from '../components'
import mediaData from '../lib/mediaData'
import { sortByProp } from '../lib/util'

export default function Discover() {
  const [mediaList, setList] = useState(sortByProp(mediaData, 'title'))

  const slimByParams = (title, mediaType, genre) => {
    if (!title && !mediaType && !genre) {
      return setList(sortByProp(mediaData, 'title'))
    }

    const filtered = mediaData.filter(current => 
      (!title || current.title.toLowerCase().includes(title.toLowerCase())) 
      && (!mediaType || current.format === mediaType) 
      && (!genre || current.genres.includes(genre))
    )
    
    setList(sortByProp(filtered, 'title'))
  }

  const genres = mediaData.reduce((all, current) => all.concat(current.genres), [])
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
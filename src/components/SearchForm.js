import { useState } from 'react'

export default function SearchForm({ genres, slimByParams }) {
  const [selectedTitle, setTitle] = useState('')
  const [selectedMedia, setMediaType] = useState('')
  const [selectedGenre, setGenre] = useState('')

  const titleSelector = (event) => {
    const selected = event.target.value
    setTitle(selected)
    slimByParams(selected, selectedMedia, selectedGenre)
  }

  const mediaSelector = (event) => {
    const selected = event.target.value
    setMediaType(selected)
    slimByParams(selectedTitle, selected, selectedGenre)
  }

  const genreSelector = (event) => {
    const selected = event.target.value
    setGenre(selected)
    slimByParams(selectedTitle, selectedMedia, selected)
  }

  return (
    <section className='top-section'>
      <div className='container'>
        <div className='search-form'>
          <div className='field search-field'>
            <label htmlFor='title'>Title:</label>
            <input id='title' value={selectedTitle} onChange={titleSelector} className='search-input' type='text' placeholder='Start typing here...'/>
          </div>
          <div className='filters'>
            <div className='field'>
              <label htmlFor='media-type'>Media:</label>
              <select id='media-type' value={selectedMedia} onChange={mediaSelector}>
                <option value=''>All</option>
                <option value='movie'>Movies</option>
                <option value='series'>Series</option>
                <option value='book'>Books</option>
              </select>
            </div>
            <div className='field'>
              <label htmlFor='genre'>Genre:</label>
              <select id='genre' value={selectedGenre} onChange={genreSelector}>
                <option value=''>Any</option>
                {genres.map(genre => 
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                )}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
import { useState } from 'react'

export default function SearchForm({ genres, filter }) {
  const [selectedTitle, setTitle] = useState('')
  const [selectedMedia, setMediaType] = useState('')
  const [selectedGenre, setGenre] = useState('')

  function titleSelector(e) {
    const selected = e.target.value
    setTitle(selected)
    filter(selected, selectedMedia, selectedGenre)
  }

  function mediaSelector(e) {
    const selected = e.target.value
    setMediaType(selected)
    filter(selectedTitle, selected, selectedGenre)
  }

  function genreSelector(e) {
    const selected = e.target.value
    setGenre(selected)
    filter(selectedTitle, selectedMedia, selected)
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
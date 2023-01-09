import { useRef } from 'react'

export default function SearchForm({ genres, filter }) {
  let filters = useRef({})

  function filterByTitle(e) {
    filters.current.title = e.target.value
    filter(filters.current)
  }

  function filterByType(e) {
    filters.current.type = e.target.value
    filter(filters.current)
  }

  function filterByGenre(e) {
    filters.current.genre = e.target.value
    filter(filters.current)
  }

  return (
    <section className='top-section'>
      <div className='container'>
        <div className='search-form'>
          <div className='field search-field'>
            <label htmlFor='title'>Title:</label>
            <input id='title' onChange={filterByTitle} className='search-input' type='text' placeholder='Start typing here...'/>
          </div>
          <div className='filters'>
            <div className='field'>
              <label htmlFor='media-type'>Media:</label>
              <select id='media-type' onChange={filterByType}>
                <option value=''>All</option>
                <option value='movie'>Movies</option>
                <option value='series'>Series</option>
                <option value='book'>Books</option>
              </select>
            </div>
            <div className='field'>
              <label htmlFor='genre'>Genre:</label>
              <select id='genre' onChange={filterByGenre}>
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
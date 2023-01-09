export default function SearchForm({ genres, filter }) {
  function updateFilters(param) {
    return e => {
      const urlParams = new URLSearchParams(window.location.search)
      urlParams.set(param, e.target.value)
      window.history.pushState({}, '', `/search?${urlParams.toString()}`)
      filter()
    }
  }

  return (
    <section className='top-section'>
      <div className='container'>
        <div className='search-form'>
          <div className='field search-field'>
            <label htmlFor='title'>Title:</label>
            <input id='title' onChange={updateFilters('title')} className='search-input' type='text' placeholder='Start typing here...'/>
          </div>
          <div className='filters'>
            <div className='field'>
              <label htmlFor='media-type'>Media:</label>
              <select id='media-type' onChange={updateFilters('type')}>
                <option value=''>All</option>
                <option value='movie'>Movies</option>
                <option value='series'>Series</option>
                <option value='book'>Books</option>
              </select>
            </div>
            <div className='field'>
              <label htmlFor='genre'>Genre:</label>
              <select id='genre' onChange={updateFilters('genre')}>
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
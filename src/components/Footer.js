export default function Footer() {
  return (
    <footer>
      <p>&copy;&nbsp;2022 <a href='mailto:cad58@students.uwf.edu'>Cameron&nbsp;Downey</a> & <a href='mailto:lrp16@students.uwf.edu'>Lucas&nbsp;Pallone</a></p>
      <p>Data obtained from IMDB, TV Maze, and Goodreads</p>
      <div className='footer-logos'>
        <a href='https://www.imdb.com/' rel='noopener noreferrer' target='_blank' aria-label='IMDB website'><img src='../../graphics/imdb.png' alt='IMDB' /></a>
        <a href='https://www.tvmaze.com/' rel='noopener noreferrer' target='_blank' aria-label='TV Maze website'><img src='../../graphics/tv-maze.png' className='rounded-full' alt='TV Maze' /></a>
        <a href='https://www.goodreads.com/' rel='noopener noreferrer' target='_blank' aria-label='Goodreads website'><img src='../../graphics/goodreads.png' alt='Goodreads' /></a>
      </div>
    </footer>
  )
}
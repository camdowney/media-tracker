import { Link } from 'react-router-dom'
import { slugify } from '../lib/util'
import { useLocation } from 'react-router-dom'

export default function Card({
  id,
  title,
  format = 'series',
  year,
  genres,
  pos = 'center', 
  description = 'No description added.'
}) {
  return (
    <Link
      to='/single-media'
      state={{ from: useLocation(), id, title, format, year, genres, pos, description }}
      className='media-card'
    >
      <img
        src={`../../${format}/${slugify(title)}.webp`}
        className={`cover image-${pos}`}
        alt={title}
      />
      <div>
        <h3>{title}</h3>
        <p>{year}</p>
        <p>{genres?.join(' - ')}</p>
      </div>
    </Link>
  )
}
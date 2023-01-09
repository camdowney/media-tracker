import { Link } from 'react-router-dom'
import { slugify } from '../lib/util'

export default function Card({
  id,
  title,
  format = 'series',
  year,
  genres,
  pos = 'center', 
}) {
  return (
    <Link
      to={`/single-media?id=${id}`}
      className='media-card'
    >
      <img
        src={`/${format}/${slugify(title)}.webp`}
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
import {Link} from 'react-router-dom'

import './index.css'

const SimilarMovieItem = props => {
  const {movieDetails} = props
  const {posterPath, id, title} = movieDetails

  return (
    <Link to={`/movies/${id}`}>
      <li className="list-item">
        <img src={posterPath} className="similar-img" alt={title} />
      </li>
    </Link>
  )
}

export default SimilarMovieItem

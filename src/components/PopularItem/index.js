import {Link} from 'react-router-dom'

import './index.css'

const PopularItem = props => {
  const {popularDetails} = props
  const {posterPath, title, id} = popularDetails

  return (
    <Link to={`/movies/${id}`}>
      <li className="list-item">
        <img src={posterPath} className="list-item-img" alt={title} />
      </li>
    </Link>
  )
}

export default PopularItem

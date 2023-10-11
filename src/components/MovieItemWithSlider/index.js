import {Component} from 'react'

import Slider from 'react-slick'

import {Link, withRouter} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class MovieItemWithSlider extends Component {
  renderMoviesList = () => {
    const {moviesList} = this.props
    return (
      <ul>
        <Slider {...settings}>
          {moviesList.map(eachMovie => (
            <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
              <li key={eachMovie.id}>
                <img
                  src={eachMovie.posterPath}
                  alt={eachMovie.title}
                  className="logo-image"
                />
              </li>
            </Link>
          ))}
        </Slider>
      </ul>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderMoviesList()}</div>
      </div>
    )
  }
}

export default withRouter(MovieItemWithSlider)

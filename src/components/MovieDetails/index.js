import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {format} from 'date-fns'
import SimilarMovieItem from '../SimilarMovieItem'
import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetails extends Component {
  state = {
    movieDetailsList: [],
    genresList: [],
    similarMoviesList: [],
    spokenLanguagesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = [fetchedData.movie_details].map(eachItem => ({
        id: eachItem.id,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
        budget: eachItem.budget,
        releaseDate: eachItem.release_date,
        runtime: eachItem.runtime,
        voteAverage: eachItem.vote_average,
        voteCount: eachItem.vote_count,
        overview: eachItem.overview,
        adult: eachItem.adult,
        backdropPath: eachItem.backdrop_path,
      }))

      const similarMoviesData = fetchedData.movie_details.similar_movies.map(
        eachSimilar => ({
          id: eachSimilar.id,
          title: eachSimilar.title,
          posterPath: eachSimilar.poster_path,
        }),
      )

      const genreData = fetchedData.movie_details.genres.map(eachGenre => ({
        id: eachGenre.id,
        name: eachGenre.name,
      }))

      const spokenLanguagesData =
        fetchedData.movie_details.spoken_languages.map(eachSpoken => ({
          id: eachSpoken.id,
          englishName: eachSpoken.english_name,
        }))

      this.setState({
        movieDetailsList: updatedData,
        genresList: genreData,
        similarMoviesList: similarMoviesData,
        spokenLanguagesList: spokenLanguagesData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onTryAgain = () => {
    this.getMovieDetails()
  }

  renderFailureView = () => <FailureView onTryAgain={this.onTryAgain} />

  renderSuccessView = () => {
    const {
      movieDetailsList,
      similarMoviesList,
      genresList,
      spokenLanguagesList,
    } = this.state
    const clickedMovieDetails = {...movieDetailsList[0]}
    const {
      adult,
      releaseDate,
      backdropPath,
      title,
      overview,
      runtime,
      voteAverage,
      voteCount,
      budget,
    } = clickedMovieDetails

    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const totalRuntime = `${hours}h ${minutes}m`
    const censorCertificate = adult ? 'A' : 'U/A'
    const releseYear = format(new Date(releaseDate), 'yyyy')
    const movieReleasedDate = format(new Date(releaseDate), 'dd MMMM Y')

    return (
      <>
        <div style={{backgroundImage: `url(${backdropPath})`}}>
          <Header />
          <div>
            <h1>{title}</h1>
            <div>
              <p>{totalRuntime}</p>
              <p>{censorCertificate}</p>
              <p>{releseYear}</p>
            </div>
            <p>{overview}</p>
            <button type="button">Play</button>
          </div>
        </div>
        <div className="details-div">
          <div>
            <div>
              <h1>Genres</h1>
              <ul>
                {genresList.map(eachGenre => (
                  <li key={eachGenre.id}>
                    <p>{eachGenre.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1>Audio Available</h1>
              <ul>
                {spokenLanguagesList.map(eachSpoken => (
                  <li key={eachSpoken.id}>
                    <p>{eachSpoken.englishName}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1>Rating Count</h1>
              <p>{voteCount}</p>
              <h1>Rating Average</h1>
              <p>{voteAverage}</p>
            </div>
            <div>
              <h1>Budget</h1>
              <p>{budget}</p>
              <h1>Release Date</h1>
              <p>{movieReleasedDate}</p>
            </div>
          </div>
          <div>
            <h1>More like this</h1>
            <div className="similar">
              {similarMoviesList.map(eachSimilar => (
                <SimilarMovieItem
                  movieDetails={eachSimilar}
                  key={eachSimilar.id}
                />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }

  rednerLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderMoviesDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.rednerLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-details">
        <div className="trending-div">{this.renderMoviesDetailsView()}</div>
      </div>
    )
  }
}

export default MovieDetails

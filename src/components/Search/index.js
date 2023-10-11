import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarMovieItem from '../SimilarMovieItem'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const searchRoute = true

class Search extends Component {
  state = {
    searchList: [],
    apiStatus: apiStatusConstants.initial,
    searchValue: '',
  }

  getSearchMovies = async searchValue => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachItem => ({
        id: eachItem.id,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
        backdropPath: eachItem.backdrop_path,
      }))

      this.setState({
        searchList: updatedData,
        apiStatus: apiStatusConstants.success,
        searchValue,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onTryAgain = () => {
    this.getSearchMovies()
  }

  renderFailureView = () => <FailureView onTryAgain={this.onTryAgain} />

  renderNoMoviesView = () => {
    const {searchValue} = this.state

    return (
      <div>
      <img
        src="https://res.cloudinary.com/dgnk8frme/image/upload/v1697041533/t7zwfgtzwoyi32ui6q3g.png"
        alt="no movies"
        className=""
      />
      <p>Your search for {searchValue} did not find any matches.</p>
    </div>
    )
    
  }

  renderSuccessView = () => {
    const {searchList} = this.state
    return searchList.length > 0 ? (
      <ul>
        {searchList.map(eachSearch => (
          <SimilarMovieItem movieDetails={eachSearch} key={eachSearch.id} />
        ))}
      </ul>
    ) : (
      this.renderNoMoviesView()
    )
  }

  rednerLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderTrendingNow = () => {
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
      <>
        <Header
          getSearchMovies={this.getSearchMovies}
          searchRoute={searchRoute}
        />
        <div className="trending-div">{this.renderTrendingNow()}</div>
      </>
    )
  }
}

export default Search

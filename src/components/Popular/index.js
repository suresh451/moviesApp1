import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import PopularItem from '../PopularItem'
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

class Popular extends Component {
  state = {
    popularList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
      }))

      this.setState({
        popularList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onTryAgain = () => {
    this.getPopularMovies()
  }

  renderFailureView = () => <FailureView onTryAgain={this.onTryAgain} />

  renderSuccessView = () => {
    const {popularList} = this.state
    return (
      <div>
        <ul className="ul-list">
          {popularList.map(each => (
            <PopularItem popularDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  rednerLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPopular = () => {
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
      <div className="popular-div">
        <Header />
        <div className="trending-div">{this.renderPopular()}</div>
        <Footer />
      </div>
    )
  }
}

export default Popular

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import HomeImage from '../HomeImage'
import Footer from '../Footer'
import Trending from '../Trending'
import Originals from '../Originals'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    mainImage: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMainImage()
  }

  getMainImage = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/originals`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const fetchedDataLength = fetchedData.results.length
      const randomImage =
        fetchedData.results[Math.floor(Math.random() * fetchedDataLength)]
      const updatedData = {
        id: randomImage.id,
        posterPath: randomImage.poster_path,
        title: randomImage.title,
        backdropPath: randomImage.backdrop_path,
        overview: randomImage.overview,
      }

      this.setState({
        mainImage: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onTryAgain = () => {
    this.getMainImage()
  }

  renderFailureView = () => <FailureView onTryAgain={this.onTryAgain} />

  renderSuccessView = () => {
    const {mainImage} = this.state
    return (
      <div>
        <HomeImage imageDetails={mainImage} />
      </div>
    )
  }

  rednerLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderMainImage = () => {
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
      <div>
        <Header />
        <div>{this.renderMainImage()}</div>
        <div className="home-div">
          <div>
            <h1>Trending Now</h1>
            <Trending />
          </div>
          <div>
            <h1>Originals</h1>
            <Originals />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home

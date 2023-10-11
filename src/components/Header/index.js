import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

class Header extends Component {
  state = {
    showSearchBox: false,
    searchValue: '',
  }

  onClickSearchButton = () => {
    this.setState(prevState => ({
      showSearchBox: !prevState.showSearchBox,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({seachValue: event.target.value})
  }

  onSearch = () => {
    const {getSearchMovies} = this.props
    const {seachValue} = this.state
    if (seachValue !== ''){
      getSearchMovies(seachValue)
    }

  }

  render() {
    const {showSearchBox, seachValue} = this.state
    return (
      <nav className="navbar">
        <div className="first-half">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dgnk8frme/image/upload/v1696928973/fe24kk83eqpofntqqgmu.png"
              className=""
              alt="website-logo"
            />
          </Link>
          <ul className="ul-list-header">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/popular">
              <li>Popular</li>
            </Link>
          </ul>
        </div>
        <div>
          <div className="first-half">
            {showSearchBox && (
              <input
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={seachValue}
              />
            )}
            <button type="button" testid="searchButton" onClick={this.onSearch}>
              <HiOutlineSearch
                size={20}
                color="white"
                onClick={this.onClickSearchButton}
              />
            </button>
            <Link to="/account">
              <button type="button">
                <img
                  src="https://res.cloudinary.com/dgnk8frme/image/upload/v1696933990/oj8per8lm1glpr66qvrm.png"
                  className=""
                  alt="profile"
                />
              </button>
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)

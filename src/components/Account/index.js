import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <>
      <Header />
      <div>
        <h1>Account</h1>
        <hr />
        <div className="membership">
          <p>Member ship</p>
          <div>
            <p>suresh@gmail.com</p>
            <p>password:**********</p>
          </div>
        </div>
        <hr />
        <div className="membership">
          <p>Plan Details</p>
          <div className="membership">
            <p>Premium</p>
            <button type="button">Ultra HD</button>
          </div>
        </div>
        <hr />
        <button type="button" onClick={onClickLogout} className="button">
          Logout
        </button>
      </div>
      <Footer />
    </>
  )
}

export default Account

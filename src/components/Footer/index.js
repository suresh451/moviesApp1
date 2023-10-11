import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div>
    <div className="footer-div">
      <button type="button" className="footer-button">
        <FaGoogle />
      </button>
      <button type="button" className="footer-button">
        <FaTwitter />
      </button>
      <button type="button" className="footer-button">
        <FaInstagram />
      </button>
      <button type="button" className="footer-button">
        <FaYoutube />
      </button>
    </div>
    <p className="footer-para">Contact Us</p>
  </div>
)

export default Footer

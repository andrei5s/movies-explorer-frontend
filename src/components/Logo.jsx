import { Link } from 'react-router-dom'
import logo from '../images/logo1.svg';

function Logo() {
  return (
    <Link to="/">
      <img className="logo" src={logo} alt="логотип-смайлик" />
    </Link>
  )
}

export default Logo
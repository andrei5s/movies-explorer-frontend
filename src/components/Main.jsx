import Promo from '../components/Promo'
import AboutProject from '../components/AboutProject'
import Techs from '../components/Techs'
import AboutMe from '../components/AboutMe'
import HeaderAuth from "./Header";
import Footer from './Footer';

function Main() {
  return (
    
    <main className="main">
      <HeaderAuth />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </main>
  )
}

export default Main
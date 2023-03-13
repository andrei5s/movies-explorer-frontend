function Footer() {
  return (
      <footer className="footer">
            <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className="footer__line"></div>
            <div className="footer__copyright">
                <p className="footer__author">&copy;2022</p>
                <ul className="footer__info">
                    <li>
                        <a href="https://practicum.yandex.ru" rel="noreferrer" target="_blank" className="footer__info-yandex">Яндекс.Практикум</a>
                    </li>
                    <li>
                        <a href="https://github.com/Yandex-Practicum" rel="noreferrer" target="_blank" className="footer__info-git">Github</a>
                    </li>
            </ul>
    </div>
    </footer>
  )
}

export default Footer
import arrow from '../images/arrow.svg'

function AboutMe() {
  return (
    <section className="student" id='student'>
                <h3 className="student__about">Студент</h3>
                <div className="student__foto" alt="фотография студента"></div>
                <h2 className="student__name">Андрей</h2>
                <p className="student__title">Студент Яндекс.практикума, 41 год</p>
                <p className="student__subtitle">Я родился и живу в п. Климово Брянской области, закончил инженерный факультет БГСХА. У меня есть жена и двое детей. Я играю на гитаре в группе, занимаюсь айкидо. В 2021 году решил изучить курс по веб-разработке.
                </p>
                <a href='https://github.com/andrei5s' target="blank" className="student__git">Github</a>
                <p className="student__portfolio">Портфолио</p>
                <div className="student__sait">
                    <p className="student__sait-title">Статичный сайт</p>
                    <a href="https://andrei5s.github.io/how-to-learn/" className="student__sait-link" rel="noreferrer" target="_blank"><img src={arrow} className="student__sait-arrow" alt='ссылка' /></a>
                </div>
                <div className="student__sait-line"></div>
                <div className="student__sait">
                    <p className="student__sait-title">Адаптивный сайт</p>
                    <a href="https://andrei5s.github.io/russian-travel/" rel="noreferrer" target="_blank" className="student__sait-link"><img src={arrow} className="student__sait-arrow" alt='ссылка' /></a>
                </div>
                <div className="student__sait-line"></div>
                <div className="student__sait student__sait_margin">
                    <p className="student__sait-title">Одностраничное приложение</p>
                    <a href="https://andrei5s.github.io/mesto/" className="student__sait-link" rel="noreferrer" target="_blank"><img src={arrow} className="student__sait-arrow" alt='ссылка' /></a>
                </div>
            </section>
  )
}

export default AboutMe
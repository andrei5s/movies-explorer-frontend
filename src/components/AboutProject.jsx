function AboutProject() {
    return (
        <section className="about" id="about">
        <h2 className="about__title">О проекте</h2>
        <div className="about__columns">
            <div className="about__column">
                <h3 className="about__column_title">Дипломный проект включал 5 этапов</h3>
                <p className="about__column_subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className="about__column">
                <h3 className="about__column_title">На выполнение диплома ушло 5 недель</h3>
                <p className="about__column_subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
        </div>
        <div className="about__diagramm">
            <div className="about__diagramm_backend">
                <h3 className="about__diagramm_backend-title">1 неделя</h3>
                <p className="abouut__diagramm_backend-subtitle">Back-end</p>
            </div>

            <div className="about__diagramm_frontend">
                <h3 className="about__diagramm_frontend-title">4 недели</h3>
                <p className="about__diagramm_frontend-subtitle">Front-end</p>
            </div>
        </div>
    </section>
    )
  }
  
  export default AboutProject
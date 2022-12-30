import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <section class="error-page">
            <h1 className="error-page__title">404</h1>
            <p className="error-page__subtitle">Страница не найдена</p>
            <Link to="/" className="error-page__link">Назад</Link>
        </section>
  )
}

export default ErrorPage
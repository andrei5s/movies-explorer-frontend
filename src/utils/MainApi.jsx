class MainApi {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers,
                },
            })
            .then(this._getResponseData)
    }


    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
               headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers,
            },
            })
            .then(this._getResponseData)
    }

    editProfile({ name, email }) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "PATCH",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers,
                },
                body: JSON.stringify({
                    name: name,
                    email: email
                })
            })
            .then(this._getResponseData)
    }

    addMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
                method: "POST",
               headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers,
            },
                body: JSON.stringify({
                    country: movie.country || 'Нет данных',
                    director: movie.director,
                    duration: movie.duration,
                    year: movie.year,
                    description: movie.description,
                    image: (`https://api.nomoreparties.co/${movie.image.url}`),
                    trailerLink: movie.trailerLink || 'https://www.youtube.com',
                    thumbnail: (`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`),
                    movieId: movie.id,
                    nameRU: movie.nameRU || 'Нет данных',
                    nameEN: movie.nameEN || 'Нет данных'
                })
            })
            .then(this._getResponseData)
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
                method: "DELETE",
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers,
            },
            })
            .then(this._getResponseData)
    }

}

export const mainApi = new MainApi({
    baseUrl: "https://api.movie.andrei5s.nomoredomains.club",
   // baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
  
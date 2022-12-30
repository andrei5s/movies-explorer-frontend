/*export const MOVIES_API = `https://api.nomoreparties.co/beatfilm-movies`;

const checkResponseStatus = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const getApiMovies = () => {
  return fetch(MOVIES_API, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(checkResponseStatus)
}*/

class MoviesApi {
  constructor({ url }) {
    this._url = url;
  }

  checkError(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getApiMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => this.checkError(res));
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;
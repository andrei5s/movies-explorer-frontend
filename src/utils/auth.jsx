//const BASE_URL = "https://auth.nomoreparties.co";
const BASE_URL = 'http://api.movie.andrei5s.nomoredomains.club'

const reqest = ({
    url,
    method = 'POST',
    token,
    data,
}) => {
    return fetch(`${BASE_URL}${url}`, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...!!token && { 'Authorization': `Bearer ${token}` }
            },
            ...!!data && { body: JSON.stringify(data) }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        });
}

export const register = (name, email, password) => {
    return reqest({
        url: '/signup',
        data: { name, email, password }
    });

};

export const login = (email, password) => {
    return reqest({
        url: '/signin',
        data: { email, password }
    });

};

export const checkToken = (token) => {
    return reqest({
        url: '/users/me',
        method: 'GET',
        token,
    });

};
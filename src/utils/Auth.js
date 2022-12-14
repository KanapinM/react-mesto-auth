export const options = {
    URL: 'https://auth.nomoreparties.co',
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

class Auth {
    constructor(options) {
        this._URL = options.URL;
        this._headers = options.headers;
    }

    _response(res) {
        if (!res.ok) {
            console.log(res.status);
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    signup(email, password) {
        return fetch(`${this._URL}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        })
            .then((res) => {
                return this._response(res);
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                return data;
            });
    }

    signin(email, password) {
        return fetch(`${this._URL}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then((res) => {
                return this._response(res);
            })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    return data;
                }
            })
    }

    checkToken(jwt) {
        return fetch(`${this._URL}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then((res) => {
                return this._response(res);
            })
    }

}

const auth = new Auth(options);

export default auth;
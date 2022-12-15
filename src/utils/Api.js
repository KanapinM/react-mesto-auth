export class Api {
    #onResponse(response) {//не совсем понял ккомментарий onResponse => onResponse
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(console.error(`Возникла ошибка, код - ${response.status}`));
    }

    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getUserData() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this.#onResponse)
    }

    editUserData(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data),
        })
            .then(this.#onResponse)
    }

    changeAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            }),
        })
            .then(this.#onResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this.#onResponse)
    };

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data),
        })
            .then(this.#onResponse)
    }

    removeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this.#onResponse)
    }

    likeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this.#onResponse)
    }

    unlikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this.#onResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.likeCard(cardId) : this.unlikeCard(cardId);
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-52',
    headers: {
        'Content-Type': 'application/json',
        authorization: 'e0b445b1-a635-48e2-bbd4-c08ec3e337e5'
    },
});

export default api;

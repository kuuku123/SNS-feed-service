import { API_BASE_URL, JWT } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(JWT)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(JWT))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return Promise.resolve(json);
        })
    );
};

export function getCurrentUser() {
if(!localStorage.getItem(JWT)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    console.log(loginRequest +" loginRequest ")
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function feedCall(){
    return request({
        url: API_BASE_URL + "/user/feed",
        method: 'GET'
    });
}

export function oauthCall(given_url) {
    return request({
        url: given_url,
        method: 'GET'
    })
}
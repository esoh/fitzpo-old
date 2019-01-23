// https://hptechblogs.com/using-json-web-token-react/
import decode from 'jwt-decode';
export default class AuthService {
    // initialize important variables
    login = (userOrEmail, pw, rememberMe, callback = null) => {
        // Get a token from the api server using fetch application
        return this.fetch('/users/authenticate', {
            method: "POST",
            body: JSON.stringify({
                usernameOrEmail: userOrEmail,
                password: pw
            })
        }).then(res => {
            if (!!res.token) {
                this.setToken(res, rememberMe) // Setting the token in localStorage
                if (callback) {
                    callback(res.msg);
                }
            } else {
                callback(res.msg);
            }
            return Promise.resolve(res);
        })
    }

    // Checks to see if there is a valid saved token
    loggedIn() {
        const token = this.getToken(); // retrieve token from localStorage
        //console.log(!!token && !this.isTokenExpired(token));
        return !!token && !this.isTokenExpired(token); // returns true if user should be logged in
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp <Date.now() / 1000) {  // check for expiration
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    setToken(token, rememberMe) {
        // Saves user token to localStorage
        token = JSON.stringify(token); // Need to serialize token object to store
        if (rememberMe) {
            localStorage.setItem('accessToken', token);
        } else {
            sessionStorage.setItem('accessToken', token);
        }
    }

    getToken() {
        if (localStorage.getItem('accessToken')) {
            return JSON.parse(localStorage.getItem('accessToken'));
        } else {
            return JSON.parse(sessionStorage.getItem('accessToken'));
        }
    }

    logout() {
        // Clear user token and profile data from localStorage
        if (localStorage.getItem('accessToken')) {
            localStorage.removeItem('accessToken');
        } else {
            sessionStorage.removeItem('accessToken');
        }
    }

    getProfile = () => {
        // implement with context or decode
    }

    fetch = (url, options) => {
        // performs api calls sending the required auth headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        return fetch(url, {
            headers,
            ...options
        }).then(this.checkStatus)
        .then(res => res.json())
    }

    checkStatus(res) {
        // raises an error in case response status is not a success
        if (res.status >= 200 && res.status < 300) {
            return res
        } else {
            let err = new Error(res.statusText)
            err.res = res
            throw err
        }
    }

}

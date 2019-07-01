import { toJson } from './errorService';

function registerAccount(username, email, password){
    return fetch('/api/accounts', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                username,
                email,
                password,
            })
        })
            .then(res => toJson(res))
}

function authenticateUser(username, password){
    return fetch('/api/auth/token', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
            .then(res => toJson(res))
}

function checkLoggedIn(){
    return new Promise((resolve, reject) => {
        fetch('/api/auth/me')
            .then(res => toJson(res))
            .then(data => {
                // possibly invalid cookie
                if(data && data.error){
                    reject({error: data.error})
                }

                // empty response means no cookie was sent
                if(!data.user){
                    resolve(null)
                }

                // success: return returned account
                resolve({user: data.user})
            })
            .catch(err => {
                reject(err)
            })
    })
}

function deauthenticateAccountLocally(){
    return fetch('/api/auth/cookie', { method: "DELETE" });
}

export {
    registerAccount,
    authenticateUser,
    checkLoggedIn,
    deauthenticateAccountLocally,
}

function registerAccount(username, email, password){
    return fetch('/accounts', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                username,
                email,
                password,
            })
        })
            .then(res => res.json())
}

function authenticateUser(username, password){
    return fetch('/auth/token', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
            .then(res => res.json())
}

function checkLoggedIn(){
    return new Promise((resolve, reject) => {
        fetch('/accounts/me')
            .then(res => res.json())
            .then(data => {
                // possibly invalid cookie
                if(data.error){
                    reject({error: data.error})
                }

                // empty response means no cookie was sent
                if(!data.account){
                    resolve(null)
                }

                // success: return returned account
                resolve({account: data.account})
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    registerAccount,
    authenticateUser,
    checkLoggedIn,
}

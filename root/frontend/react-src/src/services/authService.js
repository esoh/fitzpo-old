function authenticateUser(username, password){
    return new Promise((resolve, reject) => {
        fetch('/auth/token-jwt', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

module.exports = {
    authenticateUser,
}

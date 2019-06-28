function toJson(res){
    return res.json()
        .catch(err => {
            console.error('Cannot convert response to JSON');
        });
}

export {
    toJson,
}

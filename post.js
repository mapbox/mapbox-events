
module.exports = function(events, callback) {
    callback = callback || function() { };
    this._xhr({
        method: 'POST',
        body: JSON.stringify(events),
        headers: {
            // Avoid CORS pre-flight OPTIONS request by smuggling
            // application/json in as text/plain.
            'Content-Type': 'text/plain'
        },
        uri: this.api + '/events/v1?access_token=' + this.token
    }, callback);
};

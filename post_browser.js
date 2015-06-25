module.exports = function(events, callback) {
    callback = callback || function(err, res) { };
    this._xhr({
        method: 'POST',
        body: JSON.stringify(events),
        uri: this.api + '/events/v1?access_token=' + this.token,
        headers: {
            // Avoid CORS pre-flight OPTIONS request by smuggling
            // application/json in as text/plain.
            'Content-Type': 'text/plain'
        }
    }, callback);
};

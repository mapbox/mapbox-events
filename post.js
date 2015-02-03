var request = require('request');

module.exports = function(events, callback) {
    callback = callback || function() {
        console.log(arguments);
    };
    request.post({
        body: JSON.stringify(events),
        headers: {
            // Avoid CORS pre-flight OPTIONS request by smuggling
            // application/json in as text/plain.
            'Content-Type': 'text/plain'
        },
        uri: this.api + '/events/v1?access_token=' + this.token
    }, callback);
};

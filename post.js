var request = require('request');

module.exports = function(events, callback) {
    callback = callback || function() {
        console.log(arguments);
    };
    request.post({
        body: JSON.stringify(events),
        uri: this.api + '/events/v1?access_token=' + this.token
    }, callback);
};

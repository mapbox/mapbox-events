// Use XDomainRequest to support CORS in IE 8/9.
// Will send 'text/plain' but without a content-type header.

module.exports = function(events, callback) {
    callback = callback || function() {};
    // XDomainRequest doesn't support cross-protocol requests
    var protocol = this.api.match(/^(https?:)?/);
    if (typeof document != 'undefined' && document.location.protocol != protocol[0]) return callback();

    xdr = new this._xdr();
    var url = this.api + '/events/v' + this.version.toString() + '?access_token=' + this.token;

    xdr.onload = function() { callback(xdr) };
    xdr.onerror = function() {};
    xdr.onprogress = function() {};

    xdr.open('post', url);
    xdr.send(JSON.stringify(events));
};
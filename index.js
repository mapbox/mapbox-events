var xhr = require('xhr');
var clone = require('clone');

module.exports = Events;

function Events(options) {
    if (!(this instanceof Events)) return new Events(options);
    this.queue = [];
    this.flushAt = Math.max(options.flushAt, 1) || 20;
    this.flushAfter = Math.max(options.flushAfter, 0) || 10000;
    this.api = options.api || 'https://api.tiles.mapbox.com';
    this.token = options.token;
    this._xhr = xhr;
}

Events.prototype.track = function(obj) {
    this.queue.push(clone(obj));
    if (this.queue.length >= this.flushAt) this.flush();
    if (this.timer) clearTimeout(this.timer);
    if (this.flushAfter) this.timer = setTimeout(this.flush.bind(this), this.flushAfter);
};

Events.prototype.flush = function() {
    if (!this.queue.length) return;
    this._post(this.queue.splice(0, this.flushAt));
};

Events.prototype._post = function(events, callback) {
    callback = callback || function() {};
    this._xhr({
        method: 'POST',
        json: events,
        uri: this.api + '/events/v1?access_token=' + this.token
    }, callback);
};

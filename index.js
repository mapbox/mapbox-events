var xhr = require('xhr');
var _ = require('lodash-compat');
var hat = require('hat');

module.exports = Events;

function Events(options) {
    if (!(this instanceof Events)) return new Events(options);
    this.queue = [];
    this.flushAt = Math.max(options.flushAt, 1) || 20;
    this.flushAfter = Math.max(options.flushAfter, 0) || 10000;
    this.api = options.api || 'https://api.tiles.mapbox.com';
    this.token = options.token;
    this._xhr = xhr;
    this._xdr = (typeof window != 'undefined' &&
        !('withCredentials' in new window.XMLHttpRequest())) ?
        XDomainRequest : null;
    this.instance = hat();
    this.anonid = anonid();
}

Events.prototype.push = function(obj) {
    obj = _.cloneDeep(obj);
    obj.version = 1;
    obj.created = +new Date();
    obj.instance = this.instance;
    obj.anonid = this.anonid;
    this.queue.push(obj);
    if (this.queue.length >= this.flushAt) this.flush();
    if (this.timer) clearTimeout(this.timer);
    if (this.flushAfter) this.timer = setTimeout(_.bind(this.flush, this), this.flushAfter);
};

Events.prototype.flush = function() {
    if (!this.queue.length) return;
    if (this._xdr) this._compatibilityPost(this.queue.splice(0, this.flushAt));
    else this._post(this.queue.splice(0, this.flushAt));
};

Events.prototype._post = require('./post.js');
Events.prototype._compatibilityPost = require('./compatibility_post.js');

function anonid() {
    try {
        var id = window.localStorage.getItem('anonid') || hat();
        window.localStorage.setItem('anonid', id);
        return id;
    } catch(e) {
        if (!this.anonid) this.anonid = hat();
        return this.anonid;
    }
}

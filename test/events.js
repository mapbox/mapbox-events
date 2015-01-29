var Events = require('..');
var test = require('tape');

test('push', function(t) {
    t.plan(8);
    var events = new Events({
        token: 'token',
        flushAt: 5,
        flushAfter: 5000
    }, function(items) {
        t.equal(items.length, 5);
    });

    events._xhr = function(options) {
        var body = JSON.parse(options.body);
        t.equal(options.uri, 'https://api.tiles.mapbox.com/events/v1?access_token=token');
        t.equal(JSON.parse(options.body).length, 2);
        t.equal(options.headers['Content-Type'], 'text/plain');
        t.equal(options.method, 'POST');
        t.equal(body[0].version, 1);
        t.equal(typeof body[0].created, 'string');
        t.equal(typeof body[0].instance, 'string');
        t.assert(body[0].instance == body[1].instance, 'instance ids should match');
    };

    events.push({bar: 'baz'});
    events.push({bar: 'baz'});
});

test('_post', function(t) {
    t.plan(3);
    var events = new Events({
        token: 'token',
        flushAt: 5,
        flushAfter: 5000
    });

    events._xhr = function(options) {
        var body = JSON.parse(options.body);
        t.equal(options.uri, 'https://api.tiles.mapbox.com/events/v1?access_token=token');
        t.equal(body.length, 2);
        t.equal(options.method, 'POST');
    };

    events._post([{
        name: 'first',
        attributes: {bar: 'baz'}
    }, {
        name: 'second',
        attributes: {bar: 'baz'}
    }]);
});

test('flushAt', function(t) {
    t.plan(3);
    var events = new Events({
        token: 'token',
        flushAt: 5,
        flushAfter: 5000
    });

    events._xhr = function(options) {
        var body = JSON.parse(options.body);
        t.equal(options.uri, 'https://api.tiles.mapbox.com/events/v1?access_token=token');
        t.equal(body.length, 5);
        t.equal(options.method, 'POST');
    };

    events.push('one');
    events.push('two');
    events.push('three');
    events.push('four');
    events.push('five');
});

test('flushAfter', function(t) {
    t.plan(4);
    var start = Date.now();
    var events = new Events({
        token: 'token',
        flushAt: 5,
        flushAfter: 5000
    });

    events._xhr = function(options) {
        var body = JSON.parse(options.body);
        t.equal(options.uri, 'https://api.tiles.mapbox.com/events/v1?access_token=token');
        t.equal(body.length, 2);
        t.equal(options.method, 'POST');
        var duration = Date.now() - start;
        t.assert(duration > 5000 && duration < 5100, 'should flush after about 5 seconds');
    };

    events.push('one');
    events.push('two');
});

test('self instantiation', function(t) {
    t.plan(3);
    var events = Events({
        token: 'token',
        flushAt: 5,
        flushAfter: 5000
    });

    t.equal(events.flushAt, 5);
    t.equal(events.flushAfter, 5000);
    t.equal(events.token, 'token');
});

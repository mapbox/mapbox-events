var Events = require('..');
var test = require('tape');

test('track', function(t) {
    t.plan(3);
    var events = new Events({
        token: 'token',
        flushAt: 5,
        flushAfter: 5000
    }, function(items) {
        t.equal(items.length, 5);
    });

    events._xhr = function(options) {
        t.equal(options.uri, 'https://api.tiles.mapbox.com/events/v1?access_token=token');
        t.equal(options.json.length, 2);
        t.equal(options.method, 'POST');
    };

    events.track('first', {bar: 'baz'});
    events.track('second', {bar: 'baz'});
});

test('_post', function(t) {
    t.plan(3);
    var events = new Events({
        token: 'token',
        flushAt: 5,
        flushAfter: 5000
    });

    events._xhr = function(options) {
        t.equal(options.uri, 'https://api.tiles.mapbox.com/events/v1?access_token=token');
        t.equal(options.json.length, 2);
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
        t.equal(options.uri, 'https://api.tiles.mapbox.com/events/v1?access_token=token');
        t.equal(options.json.length, 5);
        t.equal(options.method, 'POST');
    };

    events._push('one');
    events._push('two');
    events._push('three');
    events._push('four');
    events._push('five');
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
        t.equal(options.uri, 'https://api.tiles.mapbox.com/events/v1?access_token=token');
        t.equal(options.json.length, 2);
        t.equal(options.method, 'POST');
        var duration = Date.now() - start;
        t.assert(duration > 5000 && duration < 5100, 'should flush after about 5 seconds');
    };

    events._push('one');
    events._push('two');
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

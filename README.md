[![Build Status](https://travis-ci.org/mapbox/mapbox-events.svg?branch=master)](https://travis-ci.org/mapbox/mapbox-events)

Mapbox Events
=============
Send events from the browser to the Mapbox events API.

Each call to `push()` is batched. Batches are flushed and sent to the server
when the size of the batch reaches the `flushAt` threshold or when the time
since the last event was pushed reaches the `flushAfter` threshold.

## Example

```javascript
var events = require('events')({
    token: 'mapbox api token',
    flushAt: 20,
    flushAfter: 10000
});

events.push({
    event: 'foo',
    attribute1: 'foo',
    attribute2: 'bar'
});
```

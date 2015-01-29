[![Build Status](https://travis-ci.org/mapbox/mapbox-events.svg?branch=master)](https://travis-ci.org/mapbox/mapbox-events)

Mapbox Events
=============
Send events from the browser to the Mapbox events API.

## Example

```javascript
var events = require('events')({
    token: 'mapbox api token'
});

events.track({
    event: 'foo',
    attribute1: 'foo',
    attribute2: 'bar'
});
```

events
======
Send events from the browser to the Mapbox events API.

## Example

```javascript
var events = require('events')({
    token: 'mapbox api token'
});

events.track('Event name', {
    attribute1: 'foo',
    attribute2: 'bar'
});
```

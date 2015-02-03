var Events = require('../'),
    faker = require('faker');

var events = new Events({
    token: process.env.TOKEN,
    flushAfter: 1000,
    api: 'https://api-events-staging.tilestream.net'
});

function push() {
    events.push({
        event: 'event',
        name: faker.name.findName(),
        email: faker.internet.email()
    });
}

push();
setInterval(push, 100);

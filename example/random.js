var Events = require('../'),
    faker = require('faker'),
    argv = require('minimist')(process.argv.slice(2));

if (!argv.token) throw new Error('--token required');

var events = new Events({
    token: argv.token,
    flushAfter: 1000
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

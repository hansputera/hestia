import {SessionManager} from 'gampang';
import {Client} from 'gampang';
import assert from 'node:assert';

import {config} from '../config.js';

assert.ok(config.sessionPath, 'sessionPath is required!');

const client = new Client(
    new SessionManager(config.sessionPath, config.sessionType),
    config,
);

client.on('ready', () => {
    client.logger.info(
        `Logged in as: ${client.raw?.user?.name || client.raw?.user?.id}`,
    );
});

client.launch();

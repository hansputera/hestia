import {SessionManager, Client} from 'gampang';
import fs from 'node:fs/promises';
import assert from 'node:assert';

import * as adminGroups from './services/admin-groups/index.js';

import {config} from '../config.js';

assert.ok(config.sessionPath, 'sessionPath is required!');

const client = new Client(
    new SessionManager(config.sessionPath, config.sessionType),
    config,
);

// register commands
adminGroups.register(client);

client.on('ready', () => {
    client.logger.info(
        `Logged in as: ${client.raw?.user?.name || client.raw?.user?.id}`,
    );
});

client.on('logout', async () => {
    await fs.rm(config.sessionPath, {
        recursive: true,
    });
});

client.launch();

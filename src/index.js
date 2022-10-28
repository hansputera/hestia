import 'dotenv/config';
import {SessionManager, Client} from 'gampang';
import fs from 'node:fs/promises';
import assert from 'node:assert';

import {fetchGroup, gotMongoConnection} from './utils/index.js';
import {VotingModel} from './models/index.js';

import * as adminGroups from './services/admin-groups/index.js';
import * as createVoting from './services/create-voting/index.js';

import {config} from '../config.js';
assert.ok(config.sessionPath, 'sessionPath is required!');

const client = new Client(
    new SessionManager(config.sessionPath, config.sessionType),
    config,
);

// connecto database
gotMongoConnection()?.catch((e) => client.logger.error(e));

client.on('message', async (context) => {
    if (context.isPM) {
        const reply = context.getReply();
        if (!reply) return;

        const vote = await VotingModel.findOne({
            msgId: reply.id,
        });

        const group = await fetchGroup(context.client, vote.groupJid);

        if (
            group.members.find((m) => m.id === context.authorNumber)?.isAdmin &&
            !vote.allowAdmin
        )
            return;
        else if (
            vote.voters.findIndex((v) =>
                v.startsWith(context.authorNumber.toString()),
            ) !== -1
        )
            return;

        const selectedOption = context.text.match(/[0-9]+/g)?.at(0);
        if (selectedOption > vote.polls.length || selectedOption <= 0) return;
        await vote.updateOne({
            $push: {
                voters: `${context.authorNumber}|${selectedOption - 1}`,
            },
        });

        await context.reply(
            `Anda memilih opsi ${selectedOption.toString()}, dan suara anda telah dimasukan!`,
        );
    }
});

// register commands
adminGroups.register(client);
createVoting.register(client);

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

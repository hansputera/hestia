import ms from 'ms';
import {VotingModel} from '../../models/index.js';

/** @typedef {import('gampang').Client} Client */
/** @typedef {import('gampang').Context} Context */

/**
 * "/create-voting" handle function
 * @param {Context} context Service context
 * @return {Promise<void>}
 */
async function createVoting(context) {
    await context.syncGroup();

    const group = context.getGroup();
    if (!group) {
        return;
    }

    const args = context.args.join(' ').split('//');
    if (args.length < 2) {
        await context.reply(
            'Coba kasih argumen yang bener dong!\nContoh: /crvt Bukber pakai apa ya? // Apel#Jeruk#Mangga --wa',
        );
        return;
    }

    // wa poll
    if (context.flags.indexOf('wa') !== -1) {
        await context.createPoll(args[0], args[1].split('#'));
        return;
    } else {
        // normal poll

        const pollMessage = await context.reply(
            `Polling ${
                args[0]
            }, silahkan balas secara pribadi nomor opsi berikut:\n\n${args[1]
                .split('#')
                .map((value, index) => `${index + 1}. ${value}`)
                .join('\n')}`,
        );

        await VotingModel.create({
            groupJid: group.jid,
            description: `Pool ${group.name} started by ${context.authorNumber}`,
            voters: [],
            allowAdmin: context.flags.includes('allow-admin'),
            duration: ms('2d'),
            polls: args[1].split('#').map((v) => v.trim()),
            msgId: pollMessage.id,
        });
    }
}

/**
 * Register create-voting to command.
 * @param {Client} bot Client instance.
 * @return {Promise<void>}
 */
export async function register(bot) {
    bot.command('create-voting', createVoting, {
        aliases: ['crvt', 'createvote', 'crvote'],
        description: 'Create voting in group',
        groupOnly: true,
    });
}

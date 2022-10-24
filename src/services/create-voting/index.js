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
        await context.reply('Sorry, can you try it later?');
        return;
    }

    if (
        !group.members.find((member) => member.id === context.authorNumber)
            ?.isAdmin
    )
        return;

    await context.client.raw.sendMessage(context.raw.key.remoteJid, {
        pollName: 'Fruits',
        pollValues: ['Apple', 'Orange', 'Mango'],
    });
    await context.reply(
        'See updates here: https://github.com/hansputera/hestia',
    );
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

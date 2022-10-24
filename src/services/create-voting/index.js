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
            'Coba kasih argumen yang bener dong!\nContoh: /crvt Bukber pakai apa ya? // Apel#Jeruk#Mangga --normal',
        );
        return;
    }

    // normal poll
    if (context.flags.indexOf('normal') !== -1) {
        await context.createPoll(args[0], args[1].split('#'));
        return;
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

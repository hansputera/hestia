/** @typedef {import('gampang').Client} Client */
/** @typedef {import('gampang').Context} Context */

/**
 * "/admingroups" handle function
 * @param {Context} context Service context
 * @return {Promise<void>}
 */
async function adminGroups(context) {
    await context.syncGroup();

    const group = context.getGroup();
    if (!group) {
        await context.reply('Sorry, can you try it later?');
        return;
    }

    const text = group.members
        .filter((member) => member.isAdmin || member.isSuperAdmin)
        .map(
            (member, index) =>
                `${index + 1}. @${member.id} - ${
                    member.name ||
                    member.contactName ||
                    member.verifiedName ||
                    'unknown'
                }${member.isSuperAdmin ? ' (creator)' : ''}`,
        )
        .join('\n');

    await context.reply(
        `Grup ${group.name} memiliki ${group.members.length} anggota termasuk saya, dan berikut merupakan daftar admin yang terdaftar:\n${text}`,
        {
            mentions: group.members
                .filter((member) => member.isAdmin || member.isSuperAdmin)
                .map((member) => member.jid),
        },
    );
    return;
}

/**
 * Register admin-groups to command.
 * @param {Client} bot Client instance.
 * @return {Promise<void>}
 */
export async function register(bot) {
    bot.command('admin-groups', adminGroups, {
        aliases: ['admingroups', 'ags'],
        description: 'Show admin groups',
        groupOnly: true,
    });
}

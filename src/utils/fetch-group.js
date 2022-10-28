/** @typedef {import('gampang').Client} Client */

import {GroupContext} from 'gampang';

/**
 * Fetch group jid metadata
 * @param {Client} client Gampang instance
 * @param {string} groupJid Group JID
 * @return {Promise<GroupContext>}
 */
export const fetchGroup = async (client, groupJid) => {
    if (client.groups.has(groupJid)) return client.groups.get(groupJid);

    const metadata = await client.raw
        .groupMetadata(groupJid)
        .catch((err) => err.message);

    if (typeof metadata === 'string') return undefined;
    client.groups.set(groupJid, new GroupContext(client, metadata));

    return client.groups.get(groupJid);
};

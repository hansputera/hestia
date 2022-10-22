import path from 'node:path';

/** @typedef {import('gampang').ClientOptions} TypeOptions */
/** @typedef {import('gampang').SessionType} SessionType */

/** @type {TypeOptions & { sessionPath: string, sessionType: SessionType }} */
export const config = {
    qr: {
        store: 'terminal',
    },
    sessionPath: path.resolve('sessions'),
    prefixes: ['/'],
    sessionType: 'folder',
};

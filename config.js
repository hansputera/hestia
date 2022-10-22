import path from 'node:path';

/** @typedef {import('gampang').ClientOptions} TypeOptions */
/** @typedef {import('gampang').SessionType} SessionType */

/** @type {TypeOptions & { sessionPath: string, sessionType: SessionType }} */
export const config = {
    qr: {
        store: 'file',
        options: {
            dest: path.resolve('qr.png'),
        },
    },
    sessionPath: path.resolve('sessions'),
    prefixes: ['/'],
    sessionType: 'folder',
};

/* eslint-disable no-undef */

export function jsonResponse(status: number, data: any, init?: ResponseInit) {
    return new Response(JSON.stringify(data), {
        ...init,
        status,
        headers: {
            ...init?.headers,
            'Content-Type': 'application/json',
        },
    });
}

export function response(status: number, data: any, init?: ResponseInit) {
    return new Response(data, {
        ...init,
        status,
        headers: {
            ...init?.headers,
            //'Content-Type': 'application/json',
        },
    });
}

/**
 * It truncates a string to a certain number of characters.
 * @param str - The string to truncate.
 * @param num - The number of characters to truncate after.
 * @returns {string} The first and last 4 chars of `str` with an ellipsis in the middle.
 */
export const truncateString = (str, num) => (str.length <= num ? str : str.slice(0, num) + '...' + str.substr(str.length - 4));

export const truncateTransactionHash = (hash: string): string => truncateString(hash, 6);

export const titleCase = str => str.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ' ' + d.toUpperCase()));

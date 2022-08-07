/* eslint-disable no-undef */

export function jsonResponse(status: number, data: any, init?: ResponseInit) {
    return new Response(JSON.stringify(data), {
        ...init,
        headers: {
            ...init?.headers,
            'Content-Type': 'application/json',
        },
        status,
    });
}

export function response(status: number, data: any, init?: ResponseInit) {
    return new Response(data, {
        ...init,
        headers: {
            ...init?.headers,
        },
        status,
    });
}

'use server'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const ServerMutation = async (path, data, method = "POST") => {
    const response = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        data: result,
    };
};

export const ServerQuery = async (path, method = "GET") => {
    const response = await fetch(`${baseUrl}${path}`, {
        method: method,
    });

    const result = await response.json();

    return result;
};
'use server'

import { GetUserToken } from "@/lib/getUser";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const authHeader = async () => {
    const token = await GetUserToken();
    return token? {
        Authorization: `Bearer ${token}`,
    }: {};
};

export const ServerMutation = async (path, data, method = "POST") => {
    const response = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...(await authHeader()),
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
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            ...(await authHeader()),
        },
    });
    
    const result = await response.json();

    return result;
};
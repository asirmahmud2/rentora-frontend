'use server'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const createProperty = async (data) => {
    const response = await fetch(`${baseUrl}/api/properties`, {
        method: "POST",
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
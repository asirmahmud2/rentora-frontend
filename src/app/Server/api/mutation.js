'use server'
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

//get properties by id using query parameter
export const getPropertyById = async (ownerID) => {
    const response = await fetch(`${baseUrl}/api/properties?ownerId=${ownerID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch property");
    }
    return await response.json();
};
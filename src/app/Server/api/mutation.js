'use server'

import { ServerQuery } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

//get properties by id using query parameter
// export const getPropertyById = async (ownerID) => {
//     const response = await fetch(`${baseUrl}/api/properties?ownerId=${ownerID}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     return await response.json();
// };
export const getPropertyById = async (ownerID) => {
    return ServerQuery(`/api/properties?ownerId=${ownerID}`, "GET");
};

export const getProperty = async (id) => {
    return ServerQuery(`/api/properties?id=${id}`, "GET");
};

export const getAllProperties = async (status, filter = {}) => {
    const searchParams = new URLSearchParams();

    // Status is always required.
    searchParams.set("status", status);

    // Add location only when the user provides it.
    if (filter.location) {
        searchParams.set("location", filter.location);
    }

    // Add property type only when selected.
    if (filter.propertyType) {
        searchParams.set("propertyType", filter.propertyType);
    }

    // Add sorting only when selected.
    if (filter.sort) {
        searchParams.set("sort", filter.sort);
    }

    const response = await fetch(
        `${baseUrl}/api/properties?${searchParams.toString()}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch properties");
    }

    return await response.json();
};
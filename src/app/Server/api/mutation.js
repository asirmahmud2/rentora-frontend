'use server'

import { ServerQuery } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

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

    return ServerQuery(`/api/properties?${searchParams.toString()}`, "GET");
};
'use server'

import { ServerQuery } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getPropertyById = async (ownerID) => {
    return ServerQuery(`/api/properties?ownerId=${ownerID}`, "GET");
};

export const getProperty = async (id) => {
    return ServerQuery(`/api/properties?id=${id}`, "GET");
};

export const getAllProperties = async (status = "Approved", filter = {}) => {
    const searchParams = new URLSearchParams();
    searchParams.set("status", status);
    if (filter.location) {
        searchParams.set("location", filter.location);
    }
    if (filter.propertyType) {
        searchParams.set("propertyType", filter.propertyType);
    }
    if (filter.sort) {
        searchParams.set("sort", filter.sort);
    }
    return ServerQuery(`/api/properties?${searchParams.toString()}`, "GET");
};

export const getApprovedProperties = async (status = "Approved", filter = {}) => {
    const searchParams = new URLSearchParams();
    searchParams.set("status", status);
    if (filter.location) {
        searchParams.set("location", filter.location);
    }
    if (filter.propertyType) {
        searchParams.set("propertyType", filter.propertyType);
    }
    if (filter.sort) {
        searchParams.set("sort", filter.sort);
    }
    return ServerQuery(`/api/properties/public?${searchParams.toString()}`, "GET");
};
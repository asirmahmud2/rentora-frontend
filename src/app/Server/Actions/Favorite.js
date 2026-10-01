"use server";

import { ServerMutation, ServerQuery } from "../core/server";

export const AddFavorite = async (data, userId) => {
    return ServerMutation(`/api/favorite?userId=${userId}`, data);
};

export const RemoveFavorite = async (propertyId, userId) => {
    return ServerQuery(
        `/api/favorite/${propertyId}?userId=${userId}`,
        "DELETE"
    );
};

export const GetFavorites = async (userId) => {
    return ServerQuery(`/api/favorite?userId=${userId}`, "GET");
}

export const checkFavorite = async (propertyId, userId) => {
    const result = await ServerQuery(
        `/api/favorite/${propertyId}?userId=${userId}`,
        "GET"
    );

    return result.length > 0;
};
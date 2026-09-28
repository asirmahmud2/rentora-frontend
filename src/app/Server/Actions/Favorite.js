'use server'

import { ServerMutation, ServerQuery } from "../core/server";

export const AddFavorite = async (data) => {
    return ServerMutation("/api/favorite", data);
}

export const RemoveFavorite = async (id) => {
    return ServerQuery(`/api/favorite/${id}`);
}
"use server";

import { revalidatePath } from "next/cache";
import { ServerMutation, ServerQuery } from "../core/server";

export const AddFavorite = async (data, userId) => {
    const res = await ServerMutation(`/api/favorite?userId=${userId}`, data);

    if (res.ok) {
        revalidatePath("/dashboard/Tenant/favorites");
        revalidatePath("/properties", "layout");
    }

    return res;
};

export const RemoveFavorite = async (propertyId, userId) => {
    const res = await ServerQuery(
        `/api/favorite/${propertyId}?userId=${userId}`,
        "DELETE"
    );

    if (res.ok) {
        revalidatePath("/dashboard/Tenant/favorites");
        revalidatePath("/properties", "layout");
    }

    return res;
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
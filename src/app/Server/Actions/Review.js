"use server";

import { revalidatePath } from "next/cache";
import { ServerMutation, ServerQuery } from "../core/server";

export const getPropertyReviews = async (propertyId) => {
    return ServerQuery(`/api/reviews?propertyId=${propertyId}`);
};

export const AddReview = async (review) => {
    const res = await ServerMutation(`/api/reviews`, review);
    if (res.ok) {
        revalidatePath(`/properties/${review.propertyId}`);
    }
    return res;
};

export const getTopReviews = async () => {
    return ServerQuery(`/api/reviews/top`);
};
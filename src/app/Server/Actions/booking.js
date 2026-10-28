"use server";

import { revalidatePath } from "next/cache";
import { ServerMutation, ServerQuery } from "../core/server";

export const AddBooking = async (data) => {
    return ServerMutation(`/api/bookings`, data);
}

export const getUserBooking = async (status = "All") => {
    return ServerQuery(`/api/bookings?status=${status}`);
};

export const updateBookingStatus = async (bookingId, bookingStatus) => {
    const res = await ServerMutation(
        `/api/bookings`,
        { bookingId, bookingStatus },
        "PATCH"
    );

    if (res.ok) {
        revalidatePath("/dashboard/Owner/booking-requests");
    }

    return res;
};

export const transactionHistory = async (status = "All") => {
    return ServerQuery(`/api/transactions?status=${status}`);
}
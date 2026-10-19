"use server";

import { ServerMutation, ServerQuery } from "../core/server";

export const AddBooking = async (data) => {
    return ServerMutation(`/api/bookings`, data);
}
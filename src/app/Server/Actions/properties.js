'use server'

import { revalidatePath } from "next/cache";
import { ServerMutation, ServerQuery } from "../core/server"


export const createProperty = async (data) => {
    return ServerMutation("/api/properties", data);
}

export const DeleteProperty = async (id) => {
    const result = await ServerQuery(`/api/properties/${id}`, "DELETE");
    revalidatePath("/dashboard/Admin/properties");
    return result;
}

export const RejectProperty = async (data, id) => {
    const result = await ServerMutation(`/api/properties/reject/${id}`, data,"PATCH");
    revalidatePath("/dashboard/Admin/properties");
    return result;
}

export const ApproveProperty = async (data, id) => {
    const result = await ServerMutation(`/api/properties/approve/${id}`, data,"PATCH");
    revalidatePath("/dashboard/Admin/properties");
    return result;
}
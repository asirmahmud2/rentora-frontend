'use server'

import { revalidatePath } from "next/cache";
import { ServerMutation, ServerQuery } from "../core/server"



export const createProperty = async (data, userId) => {
    return ServerMutation(`/api/properties?userId=${userId}`, data);
}

export const DeleteProperty = async (id, userId=null) => {
    const result = await ServerQuery(`/api/properties/${id}?userId=${userId}`, "DELETE");
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

export const UpdateProperty = async (data, id) => {
    const result = await ServerMutation(`/api/properties/${id}`, data,"PATCH");
    revalidatePath(`/dashboard/Admin/properties`, 'layout');
    revalidatePath(`/dashboard/Owner/properties`, 'layout');
    revalidatePath(`/dashboard/Tenant/properties`, 'layout');
    return result;
}
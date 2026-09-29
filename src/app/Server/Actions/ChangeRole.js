"use server";

import { revalidatePath } from "next/cache";
import { ServerMutation } from "../core/server";

export const ChangeUserRole = async (data) => {
    const response = await ServerMutation(
        "/api/users/change-role",
        data,
        "PATCH"
    );

    if (response.ok) {
        revalidatePath("/dashboard/Admin/users");
    }

    return response;
};
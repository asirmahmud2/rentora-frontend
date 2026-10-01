'use server';

import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export async function getUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session?.user ?? null;
}

export async function CheckUserRole(role) {
    await CheckLogin();
    const user = await getUser();
    if (user) {
        if (user?.role !== role) {
            return redirect("/unauthorized");
        }
    }
}

export async function CheckLogin() {
    const user = await getUser();
    if (!user) {
        return redirect("/login");
    }
}

export async function GetUserToken() {
    const result = await auth.api.getSession({
        headers: await headers(),
    });

    return result?.session?.token || null;
}
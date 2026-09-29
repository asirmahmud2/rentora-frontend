'use server'

import { ServerQuery } from "../core/server";

export const AllUsers = async () => {
    return ServerQuery("/api/users", "GET");
}

export const AllProperties = async () => {
    return ServerQuery("/api/properties", "GET");
}
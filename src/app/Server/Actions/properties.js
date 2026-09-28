'use server'

import { ServerMutation } from "../core/server"


export const createProperty = async (data) => {
    return ServerMutation("/api/properties", data);
}

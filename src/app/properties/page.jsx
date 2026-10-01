import React from "react";

import AllPropertyDesign from "./AllProperty";
import { getAllProperties } from "../Server/api/mutation";
import { getUser } from "@/lib/getUser";


const AllProperties = async ({ searchParams }) => {
    const params = await searchParams;

    const filters = {
        location: params?.location || "",
        propertyType: params?.propertyType || "",
        sort: params?.sort || "",
    };

    /*
     * Only approved properties should be shown.
     *
     * The filters are passed to the server function so the
     * actual filtering happens on the backend/database.
     */
    const properties = await getAllProperties("Approved", filters);
    const user = await getUser();

    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AllPropertyDesign
                    properties={properties || []}
                    filters={filters}
                    user={user}
                />
            </div>
        </main>
    );
};

export default AllProperties;
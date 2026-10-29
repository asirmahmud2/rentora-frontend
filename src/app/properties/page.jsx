import React from "react";

import AllPropertyDesign from "./AllProperty";
import { getApprovedProperties } from "../Server/api/mutation";
import { getUser } from "@/lib/getUser";
import { GetFavorites } from "../Server/Actions/Favorite";

const AllProperties = async ({ searchParams }) => {
    const params = await searchParams;

    const filters = {
        location: params?.location || "",
        propertyType: params?.propertyType || "",
        sort: params?.sort || "",
    };

    // If the backend returns an error object, fall back to an empty list
    const result = await getApprovedProperties("Approved", filters);
    const properties = Array.isArray(result) ? result : [];

    const user = await getUser();

    // Load all of this tenant's favorites in ONE request,
    // so the hearts are filled without checking each property separately
    let favoriteIds = [];

    if (user?.id && user.role === "Tenant") {
        try {
            const favorites = await GetFavorites(user.id);

            if (Array.isArray(favorites)) {
                favoriteIds = favorites.map((favorite) =>
                    String(favorite.propertyId)
                );
            }
        } catch (error) {
            console.error("Could not load favorites:", error);
        }
    }

    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AllPropertyDesign
                    properties={properties}
                    filters={filters}
                    user={user}
                    favoriteIds={favoriteIds}
                />
            </div>
        </main>
    );
};

export default AllProperties;
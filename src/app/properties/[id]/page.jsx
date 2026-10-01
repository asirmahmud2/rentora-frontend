import React from "react";
import { CheckLogin, getUser } from "@/lib/getUser";

import { getProperty } from "@/app/Server/api/mutation";
import PropertyDetailsDesign from "./PropertyDetailsDesign";

const PropertyDetailsPage = async ({ params }) => {
    await CheckLogin();
    const { id } = await params;

    const result = await getProperty(id);
    const property = Array.isArray(result)
        ? result[0]
        : result;

    const user = await getUser();

    if (!property) {
        return (
            <main className="min-h-screen bg-[#FDFCF9]">
                <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-xl text-center">
                        <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#8A6E68]">
                            RENTORA
                        </p>

                        <h1 className="mt-4 font-serif text-4xl text-[#1A1A1A]">
                            Property not found.
                        </h1>

                        <p className="mt-4 font-serif text-base text-[#77716D]">
                            This property may have been removed or is no
                            longer available.
                        </p>
                    </div>
                </div>
            </main>
        );
    }
    return (
        <PropertyDetailsDesign
            property={property}
            user={user}
        />
    );
};

export default PropertyDetailsPage;
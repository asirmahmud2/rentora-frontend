import { AllProperties } from "@/app/Server/Actions/CountData";
import React from "react";

import AllPropertiesTable from "./AllPropertiesTable";

const AllPropertiesPage = async () => {
    const properties = await AllProperties();

    const allProperties = Array.isArray(properties) ? properties : [];

    const pendingCount = allProperties.filter(
        (property) => property.status === "Pending"
    ).length;

    const approvedCount = allProperties.filter(
        (property) => property.status === "Approved"
    ).length;

    const rejectedCount = allProperties.filter(
        (property) => property.status === "Rejected"
    ).length;

    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

                {/* =====================================================
                    HEADER
                ====================================================== */}
                <section className="border-b border-[#1A1A1A]/10 pb-10">
                    <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

                        <div>
                            <div className="mb-5 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#8A6E68]" />

                                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#9B9690]">
                                    Administration / Properties
                                </span>
                            </div>

                            <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.035em] text-[#171717] sm:text-6xl lg:text-7xl">
                                Every property,
                                <span className="italic text-[#8A6E68]">
                                    {" "}in view.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl font-sans text-sm leading-7 text-[#6F6A65]">
                                Review property submissions, manage listing
                                status and oversee every property published
                                through RENTORA.
                            </p>
                        </div>

                        {/* Total */}
                        <div className="border-l border-[#1A1A1A]/10 pl-6 lg:min-w-[190px]">
                            <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                Total Properties
                            </p>

                            <p className="mt-3 font-serif text-5xl leading-none text-[#171717]">
                                {allProperties.length}
                            </p>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    STATUS SUMMARY
                ====================================================== */}
                <section className="border-b border-[#1A1A1A]/10 py-8">
                    <div className="grid grid-cols-3">

                        <div className="border-r border-[#1A1A1A]/10 px-4 py-2 first:pl-0 sm:px-7">
                            <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                Pending
                            </p>

                            <p className="mt-3 font-serif text-3xl text-[#8A6E68] sm:text-4xl">
                                {pendingCount}
                            </p>
                        </div>

                        <div className="border-r border-[#1A1A1A]/10 px-4 py-2 sm:px-7">
                            <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                Approved
                            </p>

                            <p className="mt-3 font-serif text-3xl text-[#171717] sm:text-4xl">
                                {approvedCount}
                            </p>
                        </div>

                        <div className="px-4 py-2 sm:px-7 sm:last:pr-0">
                            <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                Rejected
                            </p>

                            <p className="mt-3 font-serif text-3xl text-[#171717] sm:text-4xl">
                                {rejectedCount}
                            </p>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    TABLE
                ====================================================== */}
                <section className="py-10 lg:py-14">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="mb-4 flex items-center gap-4">
                                <span className="font-sans text-[9px] tracking-[0.2em] text-[#8A6E68]">
                                    01
                                </span>

                                <span className="h-px w-7 bg-[#1A1A1A]/10" />

                                <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#9B9690]">
                                    Property Directory
                                </span>
                            </div>

                            <h2 className="font-serif text-4xl tracking-[-0.02em] text-[#171717] sm:text-5xl">
                                All
                                <span className="italic text-[#8A6E68]">
                                    {" "}properties.
                                </span>
                            </h2>
                        </div>

                        <p className="font-sans text-xs text-[#97908B]">
                            {allProperties.length}{" "}
                            {allProperties.length === 1
                                ? "listing"
                                : "listings"}
                        </p>
                    </div>

                    <AllPropertiesTable properties={allProperties} />
                </section>

                {/* =====================================================
                    FOOTER NOTE
                ====================================================== */}
                <section className="border-t border-[#1A1A1A]/10 pt-8">
                    <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#A09A95]">
                            RENTORA / Property Management
                        </p>

                        <p className="font-serif text-sm italic text-[#85807B]">
                            Review every place with care.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AllPropertiesPage;
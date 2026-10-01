import { getPropertyById } from "@/app/Server/api/mutation";
import { getUser } from "@/lib/getUser";

import React from "react";
import Link from "next/link";

import {
    FiArrowUpRight,
    FiEdit3,
    FiMapPin,
    FiPlus,
} from "react-icons/fi";
import OwnerFeedbackButton from "./OwnerFeedbackButton";
import DeletePropertyButton from "./DeletePropertyButton";

const MyProperties = async () => {
    const user = await getUser();
    const ownerID = user?.id;
    const properties = (await getPropertyById(ownerID)) || [];

    const formatRent = (rent) => {
        return `৳${Number(rent || 0).toLocaleString("en-BD")}`;
    };

    const getStatusClass = (status) => {
        if (status === "Approved") {
            return "border-[#65745D]/20 bg-[#65745D]/5 text-[#65745D]";
        }

        if (status === "Rejected") {
            return "border-[#8A6E68]/25 bg-[#8A6E68]/5 text-[#8A6E68]";
        }

        return "border-[#A58C55]/25 bg-[#A58C55]/5 text-[#826B35]";
    };

    const getStatusText = (status) => {
        if (status === "Approved") {
            return "Approved";
        }

        if (status === "Rejected") {
            return "Rejected";
        }

        return "Pending";
    };

    return (
        <main className="min-w-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-0">
                {/* =====================================================
                    HEADER
                ===================================================== */}
                <section className="border-b border-[#1A1A1A]/10 pb-7 sm:pb-8">
                    <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="mb-4 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#8A6E68]" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#A09A95]">
                                    Owner Dashboard
                                </span>
                            </div>

                            <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
                                <h1 className="font-serif text-4xl leading-none tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl lg:text-[54px]">
                                    My properties.
                                </h1>
                            </div>

                            <p className="mt-4 max-w-xl font-serif text-base leading-7 text-[#77716D] sm:text-lg">
                                Every property you have added to RENTORA,
                                all in one place.
                            </p>
                        </div>

                        <Link href="/dashboard/owner/add-property">
                            <button
                                type="button"
                                className="group inline-flex h-11 items-center justify-center gap-3 bg-[#1A1A1A] px-5 font-sans text-[9px] uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#8A6E68]"
                            >
                                <FiPlus className="text-sm" />

                                Add Property

                                <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </button>
                        </Link>
                    </div>
                </section>

                {/* =====================================================
                    EMPTY STATE
                ===================================================== */}
                {properties.length === 0 ? (
                    <section className="py-16 sm:py-20 lg:py-24">
                        <div className="relative overflow-hidden bg-[#EEE9E4] px-6 py-14 text-center sm:px-10 sm:py-20">
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 select-none font-serif text-[260px] leading-none text-[#E4DCD6]"
                            >
                                0
                            </span>

                            <div className="relative z-10 mx-auto max-w-xl">
                                <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#8A6E68]">
                                    Your portfolio is empty
                                </p>

                                <h2 className="mt-4 font-serif text-3xl text-[#1A1A1A] sm:text-4xl">
                                    Start with your first property.
                                </h2>

                                <p className="mx-auto mt-4 max-w-md font-serif text-sm leading-7 text-[#77716D] sm:text-base">
                                    Add your first listing and give prospective
                                    tenants a place worth coming home to.
                                </p>

                                <Link
                                    href="/dashboard/owner/add-property"
                                    className="mt-8 inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A] transition-colors hover:text-[#8A6E68]"
                                >
                                    Add Your First Property
                                    <FiArrowUpRight className="text-sm" />
                                </Link>
                            </div>
                        </div>
                    </section>
                ) : (
                    <>
                        {/* =================================================
                            DESKTOP TABLE
                        ================================================= */}
                        <section className="hidden py-8 sm:py-10 lg:block">
                            <div className="border-t border-[#1A1A1A]/10">
                                {/* Table Header */}
                                <div className="grid grid-cols-[2.2fr_1.3fr_0.9fr_0.8fr_0.9fr_0.7fr] border-b border-[#1A1A1A]/10 px-4 py-4 xl:px-5">
                                    <span className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#9C958F]">
                                        Property
                                    </span>

                                    <span className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#9C958F]">
                                        Location
                                    </span>

                                    <span className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#9C958F]">
                                        Rent
                                    </span>

                                    <span className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#9C958F]">
                                        Details
                                    </span>

                                    <span className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#9C958F]">
                                        Status
                                    </span>

                                    <span className="text-right font-sans text-[8px] uppercase tracking-[0.22em] text-[#9C958F]">
                                        Actions
                                    </span>
                                </div>

                                {/* Table Rows */}
                                {properties.map((property, index) => {
                                    const propertyId =
                                        property._id?.toString();

                                    return (
                                        <div
                                            key={propertyId || index}
                                            className="group grid grid-cols-[2.2fr_1.3fr_0.9fr_0.8fr_0.9fr_0.7fr] items-center border-b border-[#1A1A1A]/10 px-4 py-5 transition-colors duration-300 hover:bg-[#EEE9E4]/60 xl:px-5"
                                        >
                                            {/* Property */}
                                            <div className="flex min-w-0 items-center gap-4">
                                                <div className="h-[68px] w-[82px] shrink-0 overflow-hidden bg-[#EEE9E4]">
                                                    {property.images?.[0] ? (
                                                        <img
                                                            src={
                                                                property.images[0]
                                                            }
                                                            alt={
                                                                property.title
                                                            }
                                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center font-serif text-xl text-[#B1AAA5]">
                                                            R
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    <Link
                                                        href={`/properties/${propertyId}`}
                                                        className="group/title"
                                                    >
                                                        <h2 className="line-clamp-2 font-serif text-[18px] leading-tight text-[#1A1A1A] transition-colors duration-300 group-hover/title:text-[#8A6E68]">
                                                            {property.title}
                                                        </h2>
                                                    </Link>

                                                    <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.12em] text-[#9A938E]">
                                                        {property.propertyType}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Location */}
                                            <div className="pr-5">
                                                <div className="flex items-start gap-2">
                                                    <FiMapPin className="mt-0.5 shrink-0 text-xs text-[#8A6E68]" />

                                                    <div>
                                                        <p className="font-serif text-sm leading-5 text-[#403B38]">
                                                            {
                                                                property
                                                                    .location
                                                                    ?.area
                                                            }
                                                        </p>

                                                        <p className="mt-0.5 font-sans text-[8px] uppercase tracking-[0.1em] text-[#9A938E]">
                                                            {
                                                                property
                                                                    .location
                                                                    ?.city
                                                            }
                                                            ,{" "}
                                                            {
                                                                property
                                                                    .location
                                                                    ?.country
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Rent */}
                                            <div>
                                                <p className="font-serif text-lg text-[#1A1A1A]">
                                                    {formatRent(property.rent)}
                                                </p>

                                                <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.12em] text-[#9A938E]">
                                                    /{" "}
                                                    {property.rentType ||
                                                        "Month"}
                                                </p>
                                            </div>

                                            {/* Details */}
                                            <div>
                                                <p className="font-serif text-sm text-[#403B38]">
                                                    {property.bedrooms} bed
                                                </p>

                                                <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.1em] text-[#9A938E]">
                                                    {property.bathrooms} bath
                                                    <span className="mx-1.5">
                                                        •
                                                    </span>
                                                    {Number(
                                                        property.propertySize ||
                                                            0
                                                    ).toLocaleString()}{" "}
                                                    {property.sizeUnit ||
                                                        "sqft"}
                                                </p>
                                            </div>

                                            {/* Status */}
                                            <div>
                                                <span
                                                    className={`inline-flex items-center gap-2 border px-2.5 py-1.5 font-sans text-[8px] uppercase tracking-[0.13em] ${getStatusClass(
                                                        property.status
                                                    )}`}
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />

                                                    {getStatusText(
                                                        property.status
                                                    )}
                                                </span>

                                                <OwnerFeedbackButton
                                                    property={property}
                                                    className="mt-2 flex items-center gap-1 font-sans text-[8px] uppercase tracking-[0.1em] text-[#8A6E68] transition hover:text-[#1A1A1A]"
                                                />
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center justify-end gap-1">
                                                {/* Edit */}
                                                <Link
                                                    href={`/dashboard/edit/${propertyId}`}
                                                    aria-label={`Edit ${property.title}`}
                                                    className="flex h-9 w-9 items-center justify-center text-[#8A6E68] transition hover:bg-[#EEE9E4]"
                                                >
                                                    <FiEdit3 className="text-sm" />
                                                </Link>

                                                {/* Delete */}
                                                <DeletePropertyButton
                                                    property={property}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* =================================================
                            MOBILE PROPERTY LIST
                        ================================================= */}
                        <section className="py-7 sm:py-9 lg:hidden">
                            <div className="mb-5 flex items-center gap-4">
                                <span className="h-px w-7 bg-[#8A6E68]" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#A09A95]">
                                    Your listings
                                </span>
                            </div>

                            <div className="space-y-4">
                                {properties.map((property, index) => {
                                    const propertyId =
                                        property._id?.toString();

                                    return (
                                        <article
                                            key={propertyId || index}
                                            className="bg-[#EEE9E4]"
                                        >
                                            {/* Image */}
                                            <Link
                                                href={`/properties/${propertyId}`}
                                                className="group relative block aspect-[16/9] overflow-hidden bg-[#E2DDD7]"
                                            >
                                                {property.images?.[0] ? (
                                                    <img
                                                        src={
                                                            property.images[0]
                                                        }
                                                        alt={property.title}
                                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center font-serif text-4xl text-[#B1AAA5]">
                                                        R
                                                    </div>
                                                )}

                                                <span
                                                    className={`absolute right-3 top-3 inline-flex items-center gap-2 border bg-[#FDFCF9]/95 px-2.5 py-1.5 font-sans text-[8px] uppercase tracking-[0.13em] ${getStatusClass(
                                                        property.status
                                                    )}`}
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />

                                                    {getStatusText(
                                                        property.status
                                                    )}
                                                </span>
                                            </Link>

                                            {/* Content */}
                                            <div className="p-5">
                                                <div className="flex items-start justify-between gap-5">
                                                    <div className="min-w-0">
                                                        <p className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#8A6E68]">
                                                            {String(
                                                                index + 1
                                                            ).padStart(
                                                                2,
                                                                "0"
                                                            )}{" "}
                                                            /{" "}
                                                            {
                                                                property.propertyType
                                                            }
                                                        </p>

                                                        <Link
                                                            href={`/properties/${propertyId}`}
                                                        >
                                                            <h2 className="mt-2 font-serif text-2xl leading-tight text-[#1A1A1A]">
                                                                {
                                                                    property.title
                                                                }
                                                            </h2>
                                                        </Link>
                                                    </div>

                                                    <p className="shrink-0 text-right font-serif text-lg text-[#1A1A1A]">
                                                        {formatRent(
                                                            property.rent
                                                        )}

                                                        <span className="block font-sans text-[8px] uppercase tracking-[0.1em] text-[#9A938E]">
                                                            /{" "}
                                                            {property.rentType ||
                                                                "Month"}
                                                        </span>
                                                    </p>
                                                </div>

                                                {/* Location */}
                                                <div className="mt-5 flex items-start gap-2 border-t border-[#1A1A1A]/10 pt-4">
                                                    <FiMapPin className="mt-0.5 shrink-0 text-xs text-[#8A6E68]" />

                                                    <p className="font-serif text-sm leading-5 text-[#5F5854]">
                                                        {
                                                            property.location
                                                                ?.area
                                                        }
                                                        ,{" "}
                                                        {
                                                            property.location
                                                                ?.city
                                                        }
                                                        ,{" "}
                                                        {
                                                            property.location
                                                                ?.country
                                                        }
                                                    </p>
                                                </div>

                                                {/* Details */}
                                                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                                                    <span className="font-sans text-[8px] uppercase tracking-[0.12em] text-[#77716D]">
                                                        {property.bedrooms}{" "}
                                                        Bedrooms
                                                    </span>

                                                    <span className="h-3 w-px bg-[#1A1A1A]/15" />

                                                    <span className="font-sans text-[8px] uppercase tracking-[0.12em] text-[#77716D]">
                                                        {property.bathrooms}{" "}
                                                        Bathrooms
                                                    </span>

                                                    <span className="h-3 w-px bg-[#1A1A1A]/15" />

                                                    <span className="font-sans text-[8px] uppercase tracking-[0.12em] text-[#77716D]">
                                                        {Number(
                                                            property.propertySize ||
                                                                0
                                                        ).toLocaleString()}{" "}
                                                        {property.sizeUnit}
                                                    </span>
                                                </div>

                                                {/* Actions */}
                                                <div className="mt-6 flex items-center justify-between border-t border-[#1A1A1A]/10 pt-4">
                                                    <Link
                                                        href={`/dashboard/edit/${propertyId}`}
                                                        className="group inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.18em] text-[#403B38] transition hover:text-[#8A6E68]"
                                                    >
                                                        Edit Property

                                                        <FiArrowUpRight className="text-xs transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                    </Link>

                                                    <DeletePropertyButton
                                                        property={property}
                                                        mobile
                                                    />
                                                </div>

                                                {/* Rejection Feedback */}
                                                <OwnerFeedbackButton
                                                    property={property}
                                                    className="mt-4 flex w-full items-center justify-center gap-2 border border-[#8A6E68]/20 bg-[#8A6E68]/5 py-3 font-sans text-[8px] uppercase tracking-[0.18em] text-[#8A6E68] transition hover:bg-[#8A6E68]/10"
                                                />
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    </>
                )}

                {/* =====================================================
                    SMALL FOOTER NOTE
                ===================================================== */}
                {properties.length > 0 && (
                    <div className="border-t border-[#1A1A1A]/10 py-6">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <p className="font-serif text-xs italic text-[#A09A95]">
                                Your properties, your portfolio.
                            </p>

                            <p className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#B0A9A4]">
                                {properties.length}{" "}
                                {properties.length === 1
                                    ? "property"
                                    : "properties"}{" "}
                                listed
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyProperties;
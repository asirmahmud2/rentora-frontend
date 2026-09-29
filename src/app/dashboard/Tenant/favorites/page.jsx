import { GetFavorites } from "@/app/Server/Actions/Favorite";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
    FiArrowUpRight,
    FiHeart,
    FiMapPin,
    FiHome,
    FiChevronRight,
} from "react-icons/fi";
import { getUser } from "@/lib/getUser";

const FavoriteProperties = async () => {
    const user = await getUser();
    const favoriteProperties = await GetFavorites(user.id);

    // Make sure the page always has an array to work with.
    const favorites = Array.isArray(favoriteProperties)
        ? favoriteProperties
        : [];

    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

                {/* -------------------------------------------------
                    HEADER
                -------------------------------------------------- */}
                <section className="border-b border-[#1A1A1A]/10 pb-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">

                        <div>
                            <div className="mb-5 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#8A6E68]" />

                                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#9B9690]">
                                    Tenant / Favorites
                                </span>
                            </div>

                            <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.03em] text-[#171717] sm:text-6xl lg:text-7xl">
                                Places you
                                <span className="italic text-[#8A6E68]">
                                    {" "}love.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl font-sans text-sm leading-7 text-[#6F6A65]">
                                Keep the properties that caught your eye close by.
                                Your saved homes will stay here until you decide
                                to remove them.
                            </p>
                        </div>

                        {/* Count */}
                        <div className="border-l border-[#1A1A1A]/10 pl-6 lg:min-w-[180px]">
                            <div className="flex items-center gap-3">
                                <FiHeart className="text-[#8A6E68]" />

                                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#9B9690]">
                                    Saved Properties
                                </span>
                            </div>

                            <p className="mt-3 font-serif text-5xl leading-none text-[#171717]">
                                {favorites.length || "—"}
                            </p>
                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------
                    CONTENT
                -------------------------------------------------- */}
                <section className="py-10 lg:py-14">

                    {favorites.length > 0 ? (
                        <>
                            {/* Small heading */}
                            <div className="mb-8 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="font-sans text-[9px] tracking-[0.2em] text-[#8A6E68]">
                                        01
                                    </span>

                                    <span className="h-px w-6 bg-[#1A1A1A]/10" />

                                    <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#9B9690]">
                                        Your collection
                                    </span>
                                </div>

                                <span className="font-serif text-sm italic text-[#88827D]">
                                    {favorites.length}{" "}
                                    {favorites.length === 1
                                        ? "property"
                                        : "properties"}
                                </span>
                            </div>

                            {/* Property Grid */}
                            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

                                {favorites.map((favorite, index) => {
                                    /*
                                     * Your favorite API currently stores the
                                     * property data together with propertyId.
                                     *
                                     * These fallbacks allow the card to work
                                     * whether the property fields are directly
                                     * on the favorite object or nested later.
                                     */
                                    const property = favorite.property || favorite;

                                    const propertyId =
                                        favorite.propertyId ||
                                        property._id;

                                    const image =
                                        property.images?.[0] ||
                                        property.image ||
                                        favorite.images?.[0];

                                    const title =
                                        property.title ||
                                        "Untitled Property";

                                    const location =
                                        property.location?.area &&
                                        property.location?.city
                                            ? `${property.location.area}, ${property.location.city}`
                                            : property.location ||
                                              "Location unavailable";

                                    return (
                                        <article
                                            key={favorite._id || propertyId || index}
                                            className="group"
                                        >
                                            {/* Image */}
                                            <Link
                                                href={`/properties/${propertyId}`}
                                                className="block"
                                            >
                                                <div className="relative aspect-[4/3] overflow-hidden bg-[#EEEAE6]">

                                                    {image ? (
                                                        <Image
                                                            src={image}
                                                            alt={title}
                                                            fill
                                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center">
                                                            <FiHome className="text-3xl text-[#B4ADA7]" />
                                                        </div>
                                                    )}

                                                    {/* Favorite badge */}
                                                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-white/95">
                                                        <FiHeart className="text-sm text-[#8A6E68]" />
                                                    </div>

                                                    {/* Number */}
                                                    <div className="absolute bottom-4 left-4 bg-[#FDFCF9]/95 px-3 py-2">
                                                        <span className="font-sans text-[9px] tracking-[0.18em] text-[#8A6E68]">
                                                            {String(index + 1).padStart(2, "0")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>

                                            {/* Information */}
                                            <div className="pt-5">

                                                <div className="mb-3 flex items-center gap-3">
                                                    <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#A09A95]">
                                                        {property.propertyType ||
                                                            "Property"}
                                                    </span>

                                                    <span className="h-px w-4 bg-[#1A1A1A]/10" />

                                                    <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#A09A95]">
                                                        {property.status ||
                                                            "Saved"}
                                                    </span>
                                                </div>

                                                <Link
                                                    href={`/properties/${propertyId}`}
                                                    className="block"
                                                >
                                                    <h2 className="font-serif text-2xl leading-tight text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#8A6E68] sm:text-[26px]">
                                                        {title}
                                                    </h2>
                                                </Link>

                                                {/* Location */}
                                                <div className="mt-3 flex items-center gap-2 text-[#77716C]">
                                                    <FiMapPin className="text-xs" />

                                                    <span className="font-sans text-xs">
                                                        {location}
                                                    </span>
                                                </div>

                                                {/* Bottom Details */}
                                                <div className="mt-5 flex items-center justify-between border-t border-[#1A1A1A]/8 pt-4">

                                                    <div className="flex items-center gap-4">
                                                        {property.bedrooms !==
                                                            undefined && (
                                                            <span className="font-sans text-[10px] text-[#77716C]">
                                                                {property.bedrooms}{" "}
                                                                {property.bedrooms ===
                                                                1
                                                                    ? "Bed"
                                                                    : "Beds"}
                                                            </span>
                                                        )}

                                                        {property.bathrooms !==
                                                            undefined && (
                                                            <span className="font-sans text-[10px] text-[#77716C]">
                                                                {property.bathrooms}{" "}
                                                                {property.bathrooms ===
                                                                1
                                                                    ? "Bath"
                                                                    : "Baths"}
                                                            </span>
                                                        )}

                                                        {property.propertySize !==
                                                            undefined && (
                                                            <span className="font-sans text-[10px] text-[#77716C]">
                                                                {property.propertySize}{" "}
                                                                {
                                                                    property.sizeUnit
                                                                }
                                                            </span>
                                                        )}
                                                    </div>

                                                    <Link
                                                        href={`/properties/${propertyId}`}
                                                        className="group/link flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.16em] text-[#1A1A1A]"
                                                    >
                                                        View

                                                        <FiArrowUpRight className="text-xs transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                                                    </Link>
                                                </div>

                                                {/* Price */}
                                                {property.rent !== undefined && (
                                                    <div className="mt-4">
                                                        <span className="font-serif text-xl text-[#1A1A1A]">
                                                            ৳
                                                            {Number(
                                                                property.rent
                                                            ).toLocaleString()}
                                                        </span>

                                                        <span className="ml-2 font-sans text-[9px] uppercase tracking-[0.15em] text-[#99938E]">
                                                            /{" "}
                                                            {property.rentType ||
                                                                "month"}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        /* -------------------------------------------------
                           EMPTY STATE
                        -------------------------------------------------- */
                        <div className="relative overflow-hidden border border-[#1A1A1A]/10 bg-white px-6 py-20 sm:px-10 lg:px-20 lg:py-28">

                            {/* Decorative Letter */}
                            <span className="pointer-events-none absolute -right-4 -top-10 select-none font-serif text-[220px] leading-none text-[#EEEAE6] sm:text-[280px]">
                                F
                            </span>

                            <div className="relative max-w-2xl">

                                <div className="mb-6 flex items-center gap-4">
                                    <span className="font-sans text-[10px] tracking-[0.18em] text-[#8A6E68]">
                                        01
                                    </span>

                                    <span className="h-px w-8 bg-[#1A1A1A]/10" />
                                </div>

                                <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl">
                                    Nothing saved,
                                    <span className="italic text-[#8A6E68]">
                                        {" "}yet.
                                    </span>
                                </h2>

                                <p className="mt-6 max-w-lg font-sans text-sm leading-7 text-[#716C67]">
                                    Properties you mark as favorites will
                                    appear here. Start exploring and save the
                                    places you would like to come back to.
                                </p>

                                <Link
                                    href="/properties"
                                    className="group mt-9 inline-flex items-center gap-5 bg-[#1A1A1A] px-6 py-4 font-sans text-[9px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#8A6E68]"
                                >
                                    Explore Properties

                                    <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>
                            </div>
                        </div>
                    )}
                </section>

                {/* -------------------------------------------------
                    FOOTER NOTE
                -------------------------------------------------- */}
                <section className="border-t border-[#1A1A1A]/10 pt-8">
                    <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

                        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#A09A95]">
                            RENTORA / Favorites
                        </p>

                        <div className="flex items-center justify-center gap-3">
                            <span className="font-serif text-sm italic text-[#85807B]">
                                Keep exploring.
                            </span>

                            <FiChevronRight className="text-xs text-[#8A6E68]" />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default FavoriteProperties;
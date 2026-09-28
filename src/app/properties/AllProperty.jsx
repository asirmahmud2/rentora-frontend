"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    Button,
    Input,
    Label,
    ListBox,
    Select,
} from "@heroui/react";

import {
    FiArrowUpRight,
    FiHeart,
    FiMapPin,
    FiSearch,
    FiSliders,
    FiX,
} from "react-icons/fi";

const AllPropertyDesign = ({ properties, filters }) => {
    const router = useRouter();

    const [location, setLocation] = useState(filters?.location || "");
    const [propertyType, setPropertyType] = useState(
        filters?.propertyType || ""
    );
    const [sort, setSort] = useState(filters?.sort || "");

    const formatRent = (rent) => {
        return `৳${Number(rent || 0).toLocaleString("en-BD")}`;
    };

    /*
     * Takes the values from the filter fields and converts
     * them into URL search parameters.
     *
     * The server page reads these parameters and sends them
     * to getAllProperties(), where MongoDB performs the
     * actual filtering.
     */
    const handleFilterSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const locationValue = String(
            formData.get("location") || ""
        ).trim();

        const propertyTypeValue = String(
            formData.get("propertyType") || ""
        );

        const sortValue = String(
            formData.get("sort") || ""
        );

        const searchParams = new URLSearchParams();

        if (locationValue) {
            searchParams.set("location", locationValue);
        }

        if (
            propertyTypeValue &&
            propertyTypeValue !== "all"
        ) {
            searchParams.set(
                "propertyType",
                propertyTypeValue
            );
        }

        if (sortValue && sortValue !== "recommended") {
            searchParams.set("sort", sortValue);
        }

        const queryString = searchParams.toString();

        /*
         * Changing the URL causes the Server Component to
         * run again with the new filter values.
         */
        if (queryString) {
            router.push(`/properties?${queryString}`);
        } else {
            router.push("/properties");
        }
    };

    /*
     * Reset every filter and return to the original
     * approved-property collection.
     */
    const handleClearFilters = () => {
        setLocation("");
        setPropertyType("");
        setSort("");

        router.push("/properties");
    };

    const hasActiveFilters =
        Boolean(location) ||
        Boolean(propertyType) ||
        Boolean(sort);

    return (
        <main>

            {/* =========================================================
                PAGE HERO
            ========================================================= */}
            <section className="border-b border-[#1A1A1A]/10 py-10 sm:py-14 lg:py-20">

                <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_0.7fr]">

                    {/* Left */}
                    <div>

                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-10 bg-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#9A938E]">
                                RENTORA / Properties
                            </span>
                        </div>

                        <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.03em] text-[#1A1A1A] sm:text-6xl lg:text-7xl">
                            Find somewhere
                            <br />
                            worth living in.
                        </h1>

                        <p className="mt-6 max-w-xl font-serif text-base leading-7 text-[#756E69] sm:text-lg">
                            Explore thoughtfully selected properties across
                            RENTORA and discover a space that feels right for
                            your next chapter.
                        </p>

                    </div>

                    {/* Right */}
                    <div className="lg:flex lg:justify-end">
                        <div className="max-w-xs border-l border-[#8A6E68] pl-5">

                            <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#A09A95]">
                                Available Properties
                            </p>

                            <p className="mt-2 font-serif text-4xl text-[#1A1A1A] sm:text-5xl">
                                {String(properties.length).padStart(
                                    2,
                                    "0"
                                )}
                            </p>

                            <p className="mt-2 font-serif text-sm leading-6 text-[#817A75]">
                                Approved properties currently available
                                through RENTORA.
                            </p>

                        </div>
                    </div>

                </div>
            </section>

            {/* =========================================================
                FILTER SECTION
            ========================================================= */}
            <section className="border-b border-[#1A1A1A]/10 py-6 sm:py-8">

                <div className="bg-[#EEE9E4] px-5 py-6 sm:px-7 sm:py-7 lg:px-8">

                    {/* Filter Heading */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-4">
                            <span className="flex h-8 w-8 items-center justify-center bg-[#8A6E68] text-white">
                                <FiSliders className="text-sm" />
                            </span>

                            <div>
                                <p className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#8A6E68]">
                                    Refine the collection
                                </p>

                                <h2 className="mt-1 font-serif text-xl text-[#1A1A1A]">
                                    Find what feels right.
                                </h2>
                            </div>
                        </div>

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="group inline-flex items-center gap-2 self-start font-sans text-[8px] uppercase tracking-[0.18em] text-[#77716D] transition-colors duration-300 hover:text-[#8A6E68] sm:self-auto"
                            >
                                <FiX className="text-xs" />
                                Clear filters
                            </button>
                        )}

                    </div>

                    {/* Filter Form */}
                    <form
                        onSubmit={handleFilterSubmit}
                        className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto]"
                    >

                        {/* =================================================
                            LOCATION
                        ================================================= */}
                        <div className="min-w-0">

                            <Label
                                htmlFor="location"
                                className="mb-2 block font-sans text-[8px] uppercase tracking-[0.2em] text-[#5E5854]"
                            >
                                Location
                            </Label>

                            <div className="relative">
                                <FiMapPin className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-[#8A6E68]" />

                                <Input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={location}
                                    onChange={(event) =>
                                        setLocation(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Search by area or city"
                                    variant="secondary"
                                    className="h-12 w-full rounded-none border border-[#1A1A1A]/10 bg-[#FDFCF9] pl-11 pr-4 font-serif text-sm shadow-none transition focus-within:border-[#8A6E68]"
                                />
                            </div>

                        </div>

                        {/* =================================================
                            PROPERTY TYPE
                        ================================================= */}
                        <div className="min-w-0">

                            <Label className="mb-2 block font-sans text-[8px] uppercase tracking-[0.2em] text-[#5E5854]">
                                Property Type
                            </Label>

                            <Select
                                name="propertyType"
                                value={
                                    propertyType || null
                                }
                                onChange={(value) => {
                                    setPropertyType(
                                        value === "all"
                                            ? ""
                                            : value || ""
                                    );
                                }}
                                placeholder="All property types"
                                variant="secondary"
                                className="w-full"
                            >
                                <Select.Trigger className="h-12 rounded-none border border-[#1A1A1A]/10 bg-[#FDFCF9] shadow-none">
                                    <Select.Value />

                                    <Select.ClearButton />

                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover className="rounded-none border border-[#1A1A1A]/10 bg-[#FDFCF9] shadow-none">
                                    <ListBox>

                                        <ListBox.Item
                                            id="all"
                                            textValue="All property types"
                                        >
                                            All property types
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Apartment"
                                            textValue="Apartment"
                                        >
                                            Apartment
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="House"
                                            textValue="House"
                                        >
                                            House
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Villa"
                                            textValue="Villa"
                                        >
                                            Villa
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Studio"
                                            textValue="Studio"
                                        >
                                            Studio
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Condo"
                                            textValue="Condo"
                                        >
                                            Condo
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Townhouse"
                                            textValue="Townhouse"
                                        >
                                            Townhouse
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="Office"
                                            textValue="Office"
                                        >
                                            Office
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                    </ListBox>
                                </Select.Popover>
                            </Select>

                        </div>

                        {/* =================================================
                            SORT
                        ================================================= */}
                        <div className="min-w-0">

                            <Label className="mb-2 block font-sans text-[8px] uppercase tracking-[0.2em] text-[#5E5854]">
                                Sort By
                            </Label>

                            <Select
                                name="sort"
                                value={
                                    sort || null
                                }
                                onChange={(value) => {
                                    setSort(
                                        value === "recommended"
                                            ? ""
                                            : value || ""
                                    );
                                }}
                                placeholder="Recommended"
                                variant="secondary"
                                className="w-full"
                            >
                                <Select.Trigger className="h-12 rounded-none border border-[#1A1A1A]/10 bg-[#FDFCF9] shadow-none">
                                    <Select.Value />

                                    <Select.ClearButton />

                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover className="rounded-none border border-[#1A1A1A]/10 bg-[#FDFCF9] shadow-none">
                                    <ListBox>

                                        <ListBox.Item
                                            id="recommended"
                                            textValue="Recommended"
                                        >
                                            Recommended
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="price-asc"
                                            textValue="Price Low to High"
                                        >
                                            Price Low to High
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item
                                            id="price-desc"
                                            textValue="Price High to Low"
                                        >
                                            Price High to Low
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                    </ListBox>
                                </Select.Popover>
                            </Select>

                        </div>

                        {/* =================================================
                            SEARCH BUTTON
                        ================================================= */}
                        <div className="flex items-end">

                            <Button
                                type="submit"
                                variant="primary"
                                className="h-12 w-full rounded-none bg-[#1A1A1A] px-6 font-sans text-[9px] uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#8A6E68] lg:w-auto"
                            >
                                <FiSearch className="text-sm" />

                                Search

                                <FiArrowUpRight className="text-sm" />
                            </Button>

                        </div>

                    </form>

                    {/* Active Filter Summary */}
                    {hasActiveFilters && (
                        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#1A1A1A]/10 pt-4">

                            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9A938E]">
                                Active:
                            </span>

                            {location && (
                                <span className="font-serif text-sm text-[#514B47]">
                                    Location: {location}
                                </span>
                            )}

                            {propertyType && (
                                <span className="font-serif text-sm text-[#514B47]">
                                    Type: {propertyType}
                                </span>
                            )}

                            {sort === "price-asc" && (
                                <span className="font-serif text-sm text-[#514B47]">
                                    Price: Low to High
                                </span>
                            )}

                            {sort === "price-desc" && (
                                <span className="font-serif text-sm text-[#514B47]">
                                    Price: High to Low
                                </span>
                            )}

                        </div>
                    )}

                </div>
            </section>

            {/* =========================================================
                COLLECTION COUNT
            ========================================================= */}
            <section className="flex flex-col gap-4 border-b border-[#1A1A1A]/10 py-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                    <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#A09A95]">
                        Collection
                    </span>

                    <span className="h-px w-6 bg-[#8A6E68]" />

                    <span className="font-serif text-sm text-[#5F5854]">
                        {properties.length}{" "}
                        {properties.length === 1
                            ? "property"
                            : "properties"}
                    </span>

                </div>

                <p className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#A09A95]">
                    Approved Listings
                </p>

            </section>

            {/* =========================================================
                EMPTY STATE
            ========================================================= */}
            {properties.length === 0 ? (
                <section className="py-20 sm:py-28">

                    <div className="relative overflow-hidden bg-[#EEE9E4] px-6 py-16 text-center sm:px-10">

                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 select-none font-serif text-[260px] leading-none text-[#E4DCD6]"
                        >
                            0
                        </span>

                        <div className="relative z-10 mx-auto max-w-xl">

                            <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#8A6E68]">
                                No matching properties
                            </p>

                            <h2 className="mt-4 font-serif text-3xl text-[#1A1A1A] sm:text-4xl">
                                Nothing matches your search.
                            </h2>

                            <p className="mt-4 font-serif text-sm leading-7 text-[#77716D] sm:text-base">
                                Try changing your location, property type,
                                or sorting preference.
                            </p>

                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="mt-8 inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A] transition-colors hover:text-[#8A6E68]"
                            >
                                Clear Search
                                <FiArrowUpRight />
                            </button>

                        </div>
                    </div>

                </section>
            ) : (

                /* =====================================================
                    PROPERTY GRID
                ===================================================== */
                <section className="py-8 sm:py-10 lg:py-14">

                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-16">

                        {properties.map((property, index) => {

                            const propertyId =
                                property._id?.toString();

                            return (
                                <article
                                    key={
                                        propertyId ||
                                        `property-${index}`
                                    }
                                    className="group min-w-0"
                                >

                                    {/* IMAGE */}
                                    <div className="relative">

                                        <Link
                                            href={`/properties/${propertyId}`}
                                            className="group/image relative block aspect-[4/3] overflow-hidden bg-[#EEE9E4]"
                                        >

                                            {property.images?.[0] ? (
                                                <Image
                                                    src={
                                                        property.images[0]
                                                    }
                                                    alt={
                                                        property.title ||
                                                        "Property image"
                                                    }
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-[#EEE9E4]">
                                                    <span className="font-serif text-6xl text-[#C3BBB5]">
                                                        R
                                                    </span>
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/image:bg-black/5" />

                                        </Link>

                                        {/* Number */}
                                        <span className="absolute left-4 top-4 bg-[#FDFCF9]/90 px-2.5 py-1.5 font-sans text-[8px] tracking-[0.15em] text-[#8A6E68] backdrop-blur-sm">
                                            {String(index + 1).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        {/* Favorite */}
                                        <button
                                            type="button"
                                            aria-label={`Add ${property.title} to favorites`}
                                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-[#FDFCF9]/90 text-[#6D6661] backdrop-blur-sm transition-colors duration-300 hover:bg-[#8A6E68] hover:text-white"
                                        >
                                            <FiHeart className="text-sm" />
                                        </button>

                                    </div>

                                    {/* CONTENT */}
                                    <div className="pt-5">

                                        <div className="flex items-center justify-between gap-3">

                                            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#8A6E68]">
                                                {property.propertyType}
                                            </span>

                                            <span className="font-sans text-[8px] uppercase tracking-[0.12em] text-[#A09A95]">
                                                {property.rentType}
                                            </span>

                                        </div>

                                        <Link
                                            href={`/properties/${propertyId}`}
                                            className="group/title mt-2 block"
                                        >
                                            <h2 className="line-clamp-2 font-serif text-2xl leading-[1.08] text-[#1A1A1A] transition-colors duration-300 group-hover/title:text-[#8A6E68] sm:text-[26px]">
                                                {property.title}
                                            </h2>
                                        </Link>

                                        <div className="mt-3 flex items-center gap-2">
                                            <FiMapPin className="shrink-0 text-xs text-[#8A6E68]" />

                                            <p className="truncate font-serif text-sm text-[#77716D]">
                                                {
                                                    property.location
                                                        ?.area
                                                }
                                                ,{" "}
                                                {
                                                    property.location
                                                        ?.city
                                                }
                                            </p>
                                        </div>

                                        <div className="my-5 h-px bg-[#1A1A1A]/10" />

                                        <div className="flex items-end justify-between gap-4">

                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">

                                                <span className="font-sans text-[8px] uppercase tracking-[0.12em] text-[#6F6863]">
                                                    {property.bedrooms}{" "}
                                                    Bed
                                                </span>

                                                <span className="h-3 w-px bg-[#1A1A1A]/15" />

                                                <span className="font-sans text-[8px] uppercase tracking-[0.12em] text-[#6F6863]">
                                                    {property.bathrooms}{" "}
                                                    Bath
                                                </span>

                                                <span className="h-3 w-px bg-[#1A1A1A]/15" />

                                                <span className="font-sans text-[8px] uppercase tracking-[0.12em] text-[#6F6863]">
                                                    {Number(
                                                        property.propertySize ||
                                                            0
                                                    ).toLocaleString()}{" "}
                                                    {
                                                        property.sizeUnit ||
                                                        "sqft"
                                                    }
                                                </span>

                                            </div>

                                            <div className="shrink-0 text-right">

                                                <p className="font-serif text-xl leading-none text-[#1A1A1A]">
                                                    {formatRent(
                                                        property.rent
                                                    )}
                                                </p>

                                                <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.1em] text-[#A09A95]">
                                                    /{" "}
                                                    {
                                                        property.rentType
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                        <Link
                                            href={`/properties/${propertyId}`}
                                            className="group/details mt-5 flex items-center justify-between border-t border-[#1A1A1A]/10 pt-4"
                                        >
                                            <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#4D4845] transition-colors duration-300 group-hover/details:text-[#8A6E68]">
                                                View Property
                                            </span>

                                            <FiArrowUpRight className="text-sm text-[#8A6E68] transition-transform duration-300 group-hover/details:-translate-y-0.5 group-hover/details:translate-x-0.5" />
                                        </Link>

                                    </div>

                                </article>
                            );
                        })}

                    </div>
                </section>
            )}

            {/* =========================================================
                BOTTOM EDITORIAL CTA
            ========================================================= */}
            <section className="border-t border-[#1A1A1A]/10 py-12 sm:py-16">

                <div className="flex flex-col gap-5 text-center">

                    <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#8A6E68]">
                        RENTORA
                    </p>

                    <h2 className="font-serif text-3xl leading-tight text-[#1A1A1A] sm:text-4xl">
                        Your next place is out there.
                    </h2>

                    <p className="mx-auto max-w-md font-serif text-sm leading-6 text-[#817A75]">
                        Browse the collection and find a home that fits the
                        way you want to live.
                    </p>

                </div>

            </section>

        </main>
    );
};

export default AllPropertyDesign;
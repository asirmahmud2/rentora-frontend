"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@heroui/react";

import {
    FiArrowLeft,
    FiArrowUpRight,
    FiHeart,
    FiMapPin,
    FiMail,
    FiShield,
    FiUser,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CommentSection from "@/Component/Property/Review";
import BookingModal from "@/Component/Property/BookingModal";
import { AddFavorite, checkFavorite, RemoveFavorite } from "@/app/Server/Actions/Favorite";


const PropertyDetailsDesign = ({ property, user }) => {
    console.log("PropertyDetailsDesign property:", property);
    const router = useRouter();

    const [activeImage, setActiveImage] = useState(0);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favStatus = async () => {
            if (!user?.id || !property?._id) return;

            const data = await checkFavorite(
                property._id,
                user.id
            );

            setIsFavorite(data);
        };

        favStatus();
    }, [property._id, user?.id]);

    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const swiperRef = useRef(null);

    const formatRent = (rent) => {
        return `৳${Number(rent || 0).toLocaleString("en-BD")}`;
    };

    const images = property.images || [];


    /*
     * Add/remove the property from favorites.
     *
     * Replace the commented API section with your actual
     * favorites API when we build that feature.
     */
    const handleFavorite = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        try {
            if (!isFavorite) {
                const newFavorite = {
                    ...property,
                    propertyId: property._id,
                    userId: user.id,
                };

                const response = await AddFavorite(newFavorite);

                if (!response.ok) {
                    throw new Error("Failed to add favorite");
                }

                setIsFavorite(true);

                console.log("Added favorite:", response.data);
            } else {
                const response = await RemoveFavorite(
                    property._id,
                    user.id
                );

                if (!response.ok) {
                    throw new Error("Failed to remove favorite");
                }

                setIsFavorite(false);

                console.log("Removed favorite:", response.data);
            }
        } catch (error) {
            console.error("Favorite error:", error);
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">

            {/* =========================================================
                PAGE HEADER
            ========================================================= */}
            <section className="border-b border-[#1A1A1A]/10 py-7 sm:py-9">

                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center justify-between">

                        <Link
                            href="/properties"
                            className="group inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#77716D] transition-colors duration-300 hover:text-[#8A6E68]"
                        >
                            <FiArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />

                            All Properties
                        </Link>

                        <span className="hidden font-sans text-[8px] uppercase tracking-[0.25em] text-[#A09A95] sm:block">
                            RENTORA / Property Details
                        </span>

                    </div>

                </div>
            </section>

            {/* =========================================================
                PROPERTY HEADER
            ========================================================= */}
            <section className="container mx-auto px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-8 lg:pb-12">

                <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">

                    <div>

                        <div className="mb-4 flex flex-wrap items-center gap-3">

                            <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#8A6E68]">
                                {property.propertyType}
                            </span>

                            <span className="h-3 w-px bg-[#1A1A1A]/15" />

                            <span className="flex items-center gap-1.5 font-sans text-[8px] uppercase tracking-[0.15em] text-[#A09A95]">
                                <FiMapPin className="text-xs text-[#8A6E68]" />

                                {property.location?.area},{" "}
                                {property.location?.city}
                            </span>

                        </div>

                        <h1 className="max-w-4xl font-serif text-4xl leading-[0.98] tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl lg:text-7xl">
                            {property.title}
                        </h1>

                        <p className="mt-5 max-w-3xl font-serif text-base leading-7 text-[#77716D] sm:text-lg">
                            {property.description}
                        </p>

                    </div>

                    {/* Price */}
                    <div className="border-l border-[#8A6E68] pl-5 lg:min-w-[190px]">

                        <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                            Rental Price
                        </p>

                        <p className="mt-2 font-serif text-3xl text-[#1A1A1A] sm:text-4xl">
                            {formatRent(property.rent)}
                        </p>

                        <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.14em] text-[#8A6E68]">
                            / {property.rentType}
                        </p>

                    </div>

                </div>
            </section>

            {/* =========================================================
                IMAGE + QUICK BOOKING
            ========================================================= */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">

                    {/* =================================================
                        IMAGE GALLERY
                    ================================================= */}
                    <div className="min-w-0">
                        <div className="relative">
                            <Swiper
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                                spaceBetween={0}
                                slidesPerView={1}
                                speed={600}
                                onSlideChange={(swiper) =>
                                    setActiveImage(swiper.activeIndex)
                                }
                                className="rentora-property-swiper aspect-[16/10] overflow-hidden bg-[#EEE9E4] sm:aspect-[16/9]"
                            >
                                {images.length > 0 ? (
                                    images.map((image, index) => (
                                        <SwiperSlide key={`${image}-${index}`}>
                                            <div className="relative h-full w-full">
                                                <Image
                                                    src={image}
                                                    alt={`${property.title} image ${index + 1}`}
                                                    fill
                                                    priority={index === 0}
                                                    sizes="(max-width: 1024px) 100vw, 70vw"
                                                    className="object-cover"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide>
                                        <div className="flex h-full items-center justify-center">
                                            <span className="font-serif text-7xl text-[#C3BBB5]">
                                                R
                                            </span>
                                        </div>
                                    </SwiperSlide>
                                )}
                            </Swiper>

                            {/* Image index */}
                            <div className="absolute bottom-4 left-4 z-10 bg-[#FDFCF9]/90 px-3 py-2 backdrop-blur-sm">
                                <span className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#8A6E68]">
                                    {images.length > 0
                                        ? String(activeImage + 1).padStart(2, "0")
                                        : "00"}
                                    {" / "}
                                    {String(images.length).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Slider controls */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => swiperRef.current?.slidePrev()}
                                        aria-label="Previous property image"
                                        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/50 bg-[#1A1A1A]/60 text-white backdrop-blur-sm transition hover:bg-[#8A6E68]"
                                    >
                                        <FiChevronLeft />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => swiperRef.current?.slideNext()}
                                        aria-label="Next property image"
                                        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/50 bg-[#1A1A1A]/60 text-white backdrop-blur-sm transition hover:bg-[#8A6E68]"
                                    >
                                        <FiChevronRight />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                                {images.map((image, index) => (
                                    <button
                                        key={`${image}-${index}`}
                                        type="button"
                                        onClick={() => swiperRef.current?.slideTo(index)}
                                        className={`relative h-20 w-28 shrink-0 overflow-hidden bg-[#EEE9E4] sm:h-24 sm:w-36 ${activeImage === index
                                                ? "ring-1 ring-[#8A6E68] ring-offset-2"
                                                : ""
                                            }`}
                                        aria-label={`View image ${index + 1}`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${property.title} thumbnail ${index + 1}`}
                                            fill
                                            sizes="144px"
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* =================================================
                        BOOKING PANEL
                    ================================================= */}
                    <aside className="self-start lg:sticky lg:top-8">

                        <div className="bg-[#EEE9E4] p-6 sm:p-7 lg:p-8">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#A09A95]">
                                        Reserve this property
                                    </p>

                                    <p className="mt-2 font-serif text-2xl text-[#1A1A1A]">
                                        {formatRent(property.rent)}
                                        <span className="ml-1 font-sans text-[9px] uppercase tracking-[0.1em] text-[#8A6E68]">
                                            / {property.rentType}
                                        </span>
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleFavorite}
                                    aria-label={
                                        isFavorite
                                            ? "Remove from favorites"
                                            : "Add to favorites"
                                    }
                                    className={`flex h-10 w-10 items-center justify-center border transition duration-300 ${isFavorite
                                        ? "border-[#8A6E68] bg-[#8A6E68] text-white"
                                        : "border-[#1A1A1A]/15 text-[#5E5854] hover:border-[#8A6E68] hover:text-[#8A6E68]"
                                        }`}
                                >
                                    <FiHeart
                                        className={`text-sm ${isFavorite
                                            ? "fill-current"
                                            : ""
                                            }`}
                                    />
                                </button>

                            </div>

                            <div className="my-6 h-px bg-[#1A1A1A]/10" />

                            {/* Property stats */}
                            <div className="grid grid-cols-3 gap-3">

                                <div>
                                    <p className="font-serif text-lg text-[#1A1A1A]">
                                        {property.bedrooms}
                                    </p>

                                    <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.12em] text-[#918A85]">
                                        Bedrooms
                                    </p>
                                </div>

                                <div>
                                    <p className="font-serif text-lg text-[#1A1A1A]">
                                        {property.bathrooms}
                                    </p>

                                    <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.12em] text-[#918A85]">
                                        Bathrooms
                                    </p>
                                </div>

                                <div>
                                    <p className="font-serif text-lg text-[#1A1A1A]">
                                        {Number(
                                            property.propertySize || 0
                                        ).toLocaleString()}
                                    </p>

                                    <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.12em] text-[#918A85]">
                                        {property.sizeUnit || "sqft"}
                                    </p>
                                </div>

                            </div>

                            <Button
                                type="button"
                                variant="primary"
                                onPress={() => {
                                    if (!user) {
                                        router.push("/login");
                                        return;
                                    }

                                    setIsBookingOpen(true);
                                }}
                                className="mt-7 h-13 w-full rounded-none bg-[#1A1A1A] font-sans text-[9px] uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#8A6E68]"
                            >
                                Book Property
                                <FiArrowUpRight className="text-sm" />
                            </Button>

                            <div className="mt-4 flex items-start gap-3 border-t border-[#1A1A1A]/10 pt-5">

                                <FiShield className="mt-0.5 shrink-0 text-sm text-[#8A6E68]" />

                                <p className="font-sans text-[9px] leading-5 text-[#817A75]">
                                    Secure your reservation through RENTORA
                                    and complete payment through our secure
                                    payment process.
                                </p>

                            </div>

                        </div>

                    </aside>

                </div>
            </section>

            {/* =========================================================
                PROPERTY OVERVIEW
            ========================================================= */}
            <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">

                <div className="grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-14">

                    {/* Section heading */}
                    <div>

                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-7 bg-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#8A6E68]">
                                01
                            </span>
                        </div>

                        <h2 className="font-serif text-2xl text-[#1A1A1A]">
                            Overview
                        </h2>

                    </div>

                    {/* Content */}
                    <div>

                        <p className="max-w-4xl font-serif text-xl leading-[1.55] text-[#383331] sm:text-2xl lg:text-3xl">
                            {property.description}
                        </p>

                        <div className="mt-10 grid gap-x-10 gap-y-6 border-t border-[#1A1A1A]/10 pt-7 sm:grid-cols-2 lg:grid-cols-4">

                            <div>
                                <p className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#A09A95]">
                                    Location
                                </p>

                                <p className="mt-2 font-serif text-base text-[#403B38]">
                                    {property.location?.area}
                                </p>
                            </div>

                            <div>
                                <p className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#A09A95]">
                                    Property Type
                                </p>

                                <p className="mt-2 font-serif text-base text-[#403B38]">
                                    {property.propertyType}
                                </p>
                            </div>

                            <div>
                                <p className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#A09A95]">
                                    City
                                </p>

                                <p className="mt-2 font-serif text-base text-[#403B38]">
                                    {property.location?.city}
                                </p>
                            </div>

                            <div>
                                <p className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#A09A95]">
                                    Country
                                </p>

                                <p className="mt-2 font-serif text-base text-[#403B38]">
                                    {property.location?.country}
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                AMENITIES
            ========================================================= */}
            <section className="border-y border-[#1A1A1A]/10 bg-[#EEE9E4]">

                <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">

                    <div className="grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-14">

                        <div>

                            <div className="mb-4 flex items-center gap-3">
                                <span className="h-px w-7 bg-[#8A6E68]" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#8A6E68]">
                                    02
                                </span>
                            </div>

                            <h2 className="font-serif text-2xl text-[#1A1A1A]">
                                Amenities
                            </h2>

                        </div>

                        <div>

                            {property.amenities?.length > 0 ? (
                                <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">

                                    {property.amenities.map(
                                        (amenity, index) => (
                                            <div
                                                key={`${amenity}-${index}`}
                                                className="flex items-center gap-4 border-b border-[#1A1A1A]/[0.07] py-4"
                                            >
                                                <span className="font-sans text-[9px] tracking-[0.12em] text-[#8A6E68]">
                                                    {String(
                                                        index + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>

                                                <span className="font-serif text-base text-[#403B38]">
                                                    {amenity}
                                                </span>
                                            </div>
                                        )
                                    )}

                                </div>
                            ) : (
                                <p className="font-serif text-base text-[#817A75]">
                                    No amenities have been listed.
                                </p>
                            )}

                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                EXTRA FEATURES
            ========================================================= */}
            <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">

                <div className="grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-14">

                    <div>

                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-7 bg-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#8A6E68]">
                                03
                            </span>
                        </div>

                        <h2 className="font-serif text-2xl text-[#1A1A1A]">
                            Features
                        </h2>

                    </div>

                    <div className="grid gap-8 md:grid-cols-2">

                        <div className="border-t border-[#1A1A1A]/10 pt-6">

                            <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                What stands out
                            </p>

                            <ul className="mt-5 space-y-4">

                                {property.extraFeatures?.length > 0 ? (
                                    property.extraFeatures.map(
                                        (feature, index) => (
                                            <li
                                                key={`${feature}-${index}`}
                                                className="flex items-start gap-4"
                                            >
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#8A6E68]" />

                                                <span className="font-serif text-lg leading-7 text-[#403B38]">
                                                    {feature}
                                                </span>
                                            </li>
                                        )
                                    )
                                ) : (
                                    <li className="font-serif text-base text-[#817A75]">
                                        No additional features listed.
                                    </li>
                                )}

                            </ul>

                        </div>

                        {/* Location block */}
                        <div className="relative overflow-hidden bg-[#EEE9E4] p-7 sm:p-8">

                            <span
                                aria-hidden="true"
                                className="absolute -bottom-12 -right-4 font-serif text-[180px] leading-none text-[#E4DCD6]"
                            >
                                R
                            </span>

                            <div className="relative z-10">

                                <FiMapPin className="text-xl text-[#8A6E68]" />

                                <p className="mt-6 font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                    Located in
                                </p>

                                <p className="mt-2 font-serif text-3xl leading-tight text-[#1A1A1A]">
                                    {property.location?.area}
                                </p>

                                <p className="mt-2 font-serif text-base text-[#756E69]">
                                    {property.location?.city},{" "}
                                    {property.location?.country}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* =========================================================
                OWNER
            ========================================================= */}
            <section className="border-y border-[#1A1A1A]/10 bg-[#EEE9E4]">

                <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">

                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-14">

                        {/* Section heading */}
                        <div>

                            <div className="mb-4 flex items-center gap-3">
                                <span className="h-px w-7 bg-[#8A6E68]" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#8A6E68]">
                                    04
                                </span>
                            </div>

                            <h2 className="font-serif text-2xl text-[#1A1A1A]">
                                The Owner
                            </h2>

                        </div>

                        {/* Owner Information */}
                        <div className="flex flex-col gap-6">

                            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                                {/* Owner Photo */}
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#E1DBD5]">

                                    {property.ownerInformation?.photo ? (
                                        <Image
                                            src={property.ownerInformation.photo}
                                            alt={
                                                property.ownerInformation.name ||
                                                "Property owner"
                                            }
                                            fill
                                            sizes="80px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <FiUser className="text-2xl text-[#8A6E68]" />
                                        </div>
                                    )}

                                </div>

                                {/* Owner Details */}
                                <div className="min-w-0">

                                    <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                        Property Owner
                                    </p>

                                    <h3 className="mt-2 font-serif text-2xl text-[#1A1A1A]">
                                        {property.ownerInformation?.name ||
                                            "RENTORA Owner"}
                                    </h3>

                                    {property.ownerInformation?.email && (
                                        <a
                                            href={`mailto:${property.ownerInformation.email}`}
                                            className="group mt-2 inline-flex items-center gap-2 break-all font-sans text-[9px] tracking-[0.08em] text-[#77716D] transition hover:text-[#8A6E68]"
                                        >
                                            <FiMail className="shrink-0" />

                                            {property.ownerInformation.email}

                                            <FiArrowUpRight className="text-xs transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </a>
                                    )}

                                </div>

                            </div>

                            {/* Owner Contact Information */}
                            <div className="grid gap-4 border-t border-[#1A1A1A]/10 pt-5 sm:grid-cols-2">

                                <div>
                                    <p className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#A09A95]">
                                        Email
                                    </p>

                                    <p className="mt-2 break-all font-serif text-base text-[#403B38]">
                                        {property.ownerInformation?.email ||
                                            "Not provided"}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#A09A95]">
                                        Phone
                                    </p>

                                    <p className="mt-2 font-serif text-base text-[#403B38]">
                                        {property.ownerInformation?.phone ||
                                            "Not provided"}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                REVIEWS / COMMENTS
            ========================================================= */}
            <CommentSection />

            {/* =========================================================
                FINAL CTA
            ========================================================= */}
            <section className="bg-[#EEE9E4]">

                <div className="container mx-auto px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">

                    <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#8A6E68]">
                        RENTORA
                    </p>

                    <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl">
                        Could this be your next place?
                    </h2>

                    <p className="mx-auto mt-4 max-w-lg font-serif text-sm leading-7 text-[#77716D]">
                        Take the next step and explore the possibility of
                        making this property your home.
                    </p>

                    <Button
                        type="button"
                        variant="primary"
                        onPress={() => {
                            if (!user) {
                                router.push("/login");
                                return;
                            }

                            setIsBookingOpen(true);
                        }}
                        className="mt-7 h-12 rounded-none bg-[#1A1A1A] px-7 font-sans text-[9px] uppercase tracking-[0.2em] text-white transition hover:bg-[#8A6E68]"
                    >
                        Book Property
                        <FiArrowUpRight />
                    </Button>

                </div>
            </section>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                property={property}
                user={user}
            />

        </main>
    );
};

export default PropertyDetailsDesign;
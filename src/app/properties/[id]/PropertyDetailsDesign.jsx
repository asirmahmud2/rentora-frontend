"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, toast } from "@heroui/react";
import {
    FiArrowLeft,
    FiArrowUpRight,
    FiEdit3,
    FiMapPin,
} from "react-icons/fi";

import CommentSection from "@/Component/Property/Review";
import BookingModal from "@/Component/Property/BookingModal";
import {
    AddFavorite,
    checkFavorite,
    RemoveFavorite,
} from "@/app/Server/Actions/Favorite";

import PropertyGallery from "./PropertyGallery";
import PropertyInfoSections from "./PropertyInfoSections";
import ReviewModal from "./ReviewModal";
import { AddReview } from "@/app/Server/Actions/Review";

const formatRent = (rent) => `৳${Number(rent || 0).toLocaleString("en-BD")}`;

const PropertyDetailsDesign = ({ property, user, reviews = [] }) => {
    const router = useRouter();

    const [isFavorite, setIsFavorite] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    // Check if this property is already a favorite
    useEffect(() => {
        const loadFavorite = async () => {
            if (!user?.id || !property?._id) return;

            const data = await checkFavorite(property._id, user.id);
            setIsFavorite(data);
        };

        loadFavorite();
    }, [property._id, user?.id]);

    /* ---------- Favorite ---------- */
    const handleFavorite = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        try {
            if (!isFavorite) {
                const { _id, ...rest } = property;
                const newFavorite = { ...rest, propertyId: _id, userId: user.id };

                const response = await AddFavorite(newFavorite, user.id);

                toast.success("Property added to favorites!");
                setIsFavorite(true);
            } else {
                const response = await RemoveFavorite(property._id, user.id);
                toast.success("Property removed from favorites!");
                setIsFavorite(false);
            }
        } catch (error) {
            console.error("Favorite error:", error);
        }
    };

    /* ---------- Booking (used by two buttons) ---------- */
    const handleBookClick = () => {
        if (!user) {
            toast.danger("You must be logged in to book a property.");
            router.push("/login");
            return;
        }

        if (user.role !== "Tenant") {
            toast.danger(
                "Only tenants can book properties. Please log in with a tenant account."
            );
            return;
        }

        setIsBookingOpen(true);
    };

    /* ---------- Review: who can open the modal ---------- */
    const handleReviewClick = () => {
        if (!user) {
            toast.danger("You must be logged in to write a review.");
            router.push("/login");
            return;
        }

        if (user.role !== "Tenant") {
            toast.danger("Only tenants can write reviews.");
            return;
        }

        setIsReviewOpen(true);
    };

    const handleReview = async ({ rating, comment }) => {
        const res = await AddReview({
            propertyId: property._id,
            rating,
            comment,
        });
        if (!res.ok) {
            throw new Error(res.data?.message || "Could not save your review.");
        }
        toast.success("Thank you! Your review was submitted.");
    };

    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">
            {/* PAGE HEADER */}
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

            {/* PROPERTY HEADER */}
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
                                {property.location?.area}, {property.location?.city}
                            </span>
                        </div>

                        <h1 className="max-w-4xl font-serif text-4xl leading-[0.98] tracking-[-0.02em] sm:text-5xl lg:text-7xl">
                            {property.title}
                        </h1>

                        <p className="mt-5 max-w-3xl font-serif text-base leading-7 text-[#77716D] sm:text-lg">
                            {property.description}
                        </p>
                    </div>

                    <div className="border-l border-[#8A6E68] pl-5 lg:min-w-[190px]">
                        <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                            Rental Price
                        </p>
                        <p className="mt-2 font-serif text-3xl sm:text-4xl">
                            {formatRent(property.rent)}
                        </p>
                        <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.14em] text-[#8A6E68]">
                            / {property.rentType}
                        </p>
                    </div>
                </div>
            </section>

            {/* IMAGE GALLERY + BOOKING PANEL */}
            <PropertyGallery
                property={property}
                isFavorite={isFavorite}
                onFavorite={handleFavorite}
                onBook={handleBookClick}
                formatRent={formatRent}
            />

            {/* OVERVIEW, AMENITIES, FEATURES, OWNER */}
            <PropertyInfoSections property={property} />

            {/* REVIEWS */}
            <section className="container mx-auto px-4 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-20">
                <div className="flex flex-col gap-5 border-b border-[#1A1A1A]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#8A6E68]">
                            Tenant reviews
                        </p>
                        <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
                            What tenants <span className="italic text-[#8A6E68]">say.</span>
                        </h2>
                    </div>

                    <Button
                        type="button"
                        variant="primary"
                        onPress={handleReviewClick}
                        className="h-12 rounded-none bg-[#1A1A1A] px-6 font-sans text-[9px] uppercase tracking-[0.2em] text-white transition hover:bg-[#8A6E68]"
                    >
                        <FiEdit3 />
                        Write a Review
                    </Button>
                </div>
            </section>

            <CommentSection reviews={reviews} />

            {/* FINAL CTA */}
            <section className="bg-[#EEE9E4]">
                <div className="container mx-auto px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
                    <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#8A6E68]">
                        RENTORA
                    </p>

                    <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                        Could this be your next place?
                    </h2>

                    <p className="mx-auto mt-4 max-w-lg font-serif text-sm leading-7 text-[#77716D]">
                        Take the next step and explore the possibility of
                        making this property your home.
                    </p>

                    <Button
                        type="button"
                        variant="primary"
                        onPress={handleBookClick}
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

            {/* Rendered only while open, so the form resets every time */}
            {isReviewOpen && (
                <ReviewModal
                    propertyTitle={property.title}
                    onClose={() => setIsReviewOpen(false)}
                    onSubmit={handleReview}
                />
            )}
        </main>
    );
};

export default PropertyDetailsDesign;
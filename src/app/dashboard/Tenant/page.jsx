import React from "react";
import Link from "next/link";
import Image from "next/image";

import { getUser } from "@/lib/getUser";

import { Button } from "@heroui/react";

import {
    FiArrowUpRight,
    FiCalendar,
    FiHeart,
    FiMapPin,
} from "react-icons/fi";
import { GetFavorites } from "@/app/Server/Actions/Favorite";

const TenantPage = async () => {
    const user = await getUser();
    const AllFavorite = await GetFavorites(user.id);

    // Make sure the page always has an array to work with.
    const favorites = Array.isArray(AllFavorite)
        ? AllFavorite
        : [];
    const totalBookings = 5;
    const activeBookings = 1;
    const favoriteCount = favorites.length;

    return (
        <main className="min-w-0 bg-[#F4F2ED]">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* =====================================================
                    HEADER
                ===================================================== */}
                <section className="border-b border-[#1A1A1A]/10 pb-7 sm:pb-9">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                        <div>

                            <div className="mb-4 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#8A6E68]" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#A09A95]">
                                    Tenant Dashboard
                                </span>
                            </div>

                            <h1 className="font-serif text-4xl leading-[0.95] tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl lg:text-[58px]">
                                Welcome back
                                {user?.name
                                    ? `, ${user.name.split(" ")[0]}.`
                                    : "."}
                            </h1>

                            <p className="mt-4 max-w-xl font-serif text-base leading-7 text-[#77716D] sm:text-lg">
                                Everything you need for your rental journey,
                                gathered in one quiet space.
                            </p>
                        </div>

                        <Link href="/properties">
                            <Button
                                variant="primary"
                                className="h-12 w-full rounded-none bg-[#1A1A1A] px-6 font-sans text-[9px] uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#8A6E68] sm:w-auto"
                            >
                                Explore Properties
                                <FiArrowUpRight />
                            </Button>
                        </Link>

                    </div>
                </section>

                {/* =====================================================
                    INTRO / QUICK STATS
                ===================================================== */}
                <section className="py-7 sm:py-9 lg:py-10">

                    <div className="grid gap-px bg-[#1A1A1A]/10 md:grid-cols-3">

                        {/* Active booking */}
                        <div className="bg-[#FDFCF9] p-6 sm:p-7">
                            <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#A09A95]">
                                Active Booking
                            </p>

                            <div className="mt-5 flex items-end justify-between">
                                <p className="font-serif text-4xl text-[#1A1A1A]">
                                    {String(activeBookings).padStart(
                                        2,
                                        "0"
                                    )}
                                </p>

                                <FiCalendar className="text-lg text-[#8A6E68]" />
                            </div>

                            <p className="mt-5 border-t border-[#1A1A1A]/[0.07] pt-4 font-sans text-[9px] uppercase tracking-[0.12em] text-[#8E8883]">
                                Currently active
                            </p>
                        </div>

                        {/* Total bookings */}
                        <div className="bg-[#FDFCF9] p-6 sm:p-7">
                            <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#A09A95]">
                                Total Bookings
                            </p>

                            <div className="mt-5 flex items-end justify-between">
                                <p className="font-serif text-4xl text-[#1A1A1A]">
                                    {String(totalBookings).padStart(
                                        2,
                                        "0"
                                    )}
                                </p>

                                <FiCalendar className="text-lg text-[#8A6E68]" />
                            </div>

                            <p className="mt-5 border-t border-[#1A1A1A]/[0.07] pt-4 font-sans text-[9px] uppercase tracking-[0.12em] text-[#8E8883]">
                                Your rental history
                            </p>
                        </div>

                        {/* Favorites */}
                        <div className="bg-[#FDFCF9] p-6 sm:p-7">
                            <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#A09A95]">
                                Saved Favorites
                            </p>

                            <div className="mt-5 flex items-end justify-between">
                                <p className="font-serif text-4xl text-[#1A1A1A]">
                                    {String(favoriteCount).padStart(
                                        2,
                                        "0"
                                    )}
                                </p>

                                <FiHeart className="text-lg text-[#8A6E68]" />
                            </div>

                            <p className="mt-5 border-t border-[#1A1A1A]/[0.07] pt-4 font-sans text-[9px] uppercase tracking-[0.12em] text-[#8E8883]">
                                Properties you saved
                            </p>
                        </div>

                    </div>
                </section>


                {/* =====================================================
                    FINAL CTA
                ===================================================== */}
                <section className="border-t border-[#1A1A1A]/10 py-14 text-center sm:py-20">

                    <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#8A6E68]">
                        RENTORA
                    </p>

                    <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl">
                        Somewhere new might be waiting.
                    </h2>

                    <p className="mx-auto mt-4 max-w-lg font-serif text-sm leading-7 text-[#817A75]">
                        Explore the latest approved properties and find the
                        space that feels right for you.
                    </p>

                    <Link href="/properties">
                        <Button
                            variant="outline"
                            className="mt-7 h-12 rounded-none border-[#1A1A1A]/20 bg-transparent px-7 font-sans text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A] transition duration-300 hover:border-[#8A6E68] hover:text-[#8A6E68]"
                        >
                            Explore Properties
                            <FiArrowUpRight />
                        </Button>
                    </Link>

                </section>

            </div>
        </main>
    );
};

export default TenantPage;
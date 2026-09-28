import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
    FiArrowUpRight,
    FiCalendar,
    FiClock,
    FiMapPin,
    FiChevronRight,
} from "react-icons/fi";

const MyBooking = () => {
    // Fetch your booking data later.
    // Expected example:
    //
    // const bookings = [
    //     {
    //         _id: "booking-id",
    //         property: {
    //             _id: "property-id",
    //             title: "Elegant Gulshan Lake Residence",
    //             image: "https://...",
    //             location: "Gulshan-2, Dhaka",
    //         },
    //         moveInDate: "2026-10-15",
    //         bookingDate: "2026-09-28",
    //         rent: 85000,
    //         status: "Approved",
    //     },
    // ];

    const bookings = [];

    const statusTabs = [
        { label: "All", value: "All" },
        { label: "Pending", value: "Pending" },
        { label: "Approved", value: "Approved" },
        { label: "Rejected", value: "Rejected" },
    ];

    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

                {/* Header */}
                <section className="border-b border-[#1A1A1A]/10 pb-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
                            <div className="mb-5 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#8A6E68]" />

                                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#9B9690]">
                                    Tenant / Bookings
                                </span>
                            </div>

                            <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.03em] text-[#171717] sm:text-6xl lg:text-7xl">
                                Your
                                <span className="italic text-[#8A6E68]"> reservations.</span>
                            </h1>

                            <p className="mt-6 max-w-xl font-sans text-sm leading-7 text-[#6F6A65]">
                                Keep track of your property reservations, booking
                                status, move-in dates and payment information.
                            </p>
                        </div>

                        {/* Summary */}
                        <div className="flex gap-8 border-l border-[#1A1A1A]/10 pl-6 lg:min-w-[230px]">
                            <div>
                                <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#9B9690]">
                                    Total
                                </p>

                                <p className="mt-2 font-serif text-4xl text-[#171717]">
                                    {bookings.length || "—"}
                                </p>
                            </div>

                            <div>
                                <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#9B9690]">
                                    Active
                                </p>

                                <p className="mt-2 font-serif text-4xl text-[#171717]">
                                    {bookings.filter(
                                        (booking) => booking.status === "Approved"
                                    ).length || "—"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filter / Controls */}
                <section className="border-b border-[#1A1A1A]/10 py-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        {/* Status Tabs */}
                        <div className="flex flex-wrap gap-x-6 gap-y-3">
                            {statusTabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    type="button"
                                    className={`group relative pb-2 font-sans text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                                        tab.value === "All"
                                            ? "text-[#1A1A1A]"
                                            : "text-[#96918C] hover:text-[#1A1A1A]"
                                    }`}
                                >
                                    {tab.label}

                                    {tab.value === "All" && (
                                        <span className="absolute bottom-0 left-0 h-px w-full bg-[#8A6E68]" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Result Label */}
                        <div className="flex items-center gap-3">
                            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#A09A95]">
                                Showing
                            </span>

                            <span className="font-serif text-lg text-[#1A1A1A]">
                                {bookings.length === 0
                                    ? "No reservations"
                                    : `${bookings.length} reservations`}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Booking List */}
                <section className="py-10 lg:py-14">

                    {bookings.length > 0 ? (
                        <div className="space-y-5">
                            {bookings.map((booking, index) => (
                                <article
                                    key={booking._id}
                                    className="group border border-[#1A1A1A]/10 bg-white transition-all duration-500 hover:border-[#8A6E68]/40"
                                >
                                    <div className="grid lg:grid-cols-[280px_1fr_auto]">

                                        {/* Property Image */}
                                        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[220px]">
                                            <Image
                                                src={booking.property?.image}
                                                alt={booking.property?.title || "Property"}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 280px"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />

                                            <div className="absolute left-4 top-4">
                                                <span
                                                    className={`inline-flex items-center gap-2 bg-white/95 px-3 py-2 font-sans text-[9px] uppercase tracking-[0.16em] ${
                                                        booking.status === "Approved"
                                                            ? "text-[#5B6D5B]"
                                                            : booking.status === "Rejected"
                                                                ? "text-[#9A6660]"
                                                                : "text-[#8A6E68]"
                                                    }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${
                                                            booking.status === "Approved"
                                                                ? "bg-[#5B6D5B]"
                                                                : booking.status === "Rejected"
                                                                    ? "bg-[#9A6660]"
                                                                    : "bg-[#8A6E68]"
                                                        }`}
                                                    />

                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Booking Information */}
                                        <div className="flex flex-col justify-between p-6 sm:p-7 lg:p-8">

                                            <div>
                                                <div className="mb-4 flex items-center gap-3">
                                                    <span className="font-sans text-[9px] tracking-[0.2em] text-[#8A6E68]">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>

                                                    <span className="h-px w-5 bg-[#1A1A1A]/10" />

                                                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#AAA49F]">
                                                        Reservation
                                                    </span>
                                                </div>

                                                <h2 className="font-serif text-2xl leading-tight text-[#1A1A1A] sm:text-3xl">
                                                    {booking.property?.title}
                                                </h2>

                                                <div className="mt-3 flex items-center gap-2 text-[#77716C]">
                                                    <FiMapPin className="text-sm" />

                                                    <span className="font-sans text-xs">
                                                        {booking.property?.location}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="mt-8 grid grid-cols-2 gap-5 border-t border-[#1A1A1A]/8 pt-6 sm:grid-cols-4">

                                                <div>
                                                    <div className="mb-2 flex items-center gap-2 text-[#A19B96]">
                                                        <FiCalendar className="text-xs" />

                                                        <span className="font-sans text-[8px] uppercase tracking-[0.16em]">
                                                            Move-in
                                                        </span>
                                                    </div>

                                                    <p className="font-sans text-xs text-[#34312F]">
                                                        {booking.moveInDate}
                                                    </p>
                                                </div>

                                                <div>
                                                    <div className="mb-2 flex items-center gap-2 text-[#A19B96]">
                                                        <FiClock className="text-xs" />

                                                        <span className="font-sans text-[8px] uppercase tracking-[0.16em]">
                                                            Booked
                                                        </span>
                                                    </div>

                                                    <p className="font-sans text-xs text-[#34312F]">
                                                        {booking.bookingDate}
                                                    </p>
                                                </div>

                                                <div>
                                                    <span className="mb-2 block font-sans text-[8px] uppercase tracking-[0.16em] text-[#A19B96]">
                                                        Rent
                                                    </span>

                                                    <p className="font-serif text-lg text-[#1A1A1A]">
                                                        ৳{booking.rent?.toLocaleString()}
                                                    </p>
                                                </div>

                                                <div>
                                                    <span className="mb-2 block font-sans text-[8px] uppercase tracking-[0.16em] text-[#A19B96]">
                                                        Booking ID
                                                    </span>

                                                    <p className="max-w-[130px] truncate font-sans text-xs text-[#34312F]">
                                                        {booking._id}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="flex items-center border-t border-[#1A1A1A]/10 p-5 lg:border-l lg:border-t-0 lg:p-7">
                                            <Link
                                                href={`/dashboard/tenant/bookings/${booking._id}`}
                                                className="group/action flex w-full items-center justify-between gap-5 border border-[#1A1A1A]/10 px-5 py-4 transition-all duration-300 hover:border-[#8A6E68] hover:bg-[#F8F5F1] lg:w-auto"
                                            >
                                                <span className="font-sans text-[9px] uppercase tracking-[0.18em]">
                                                    View Details
                                                </span>

                                                <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="relative overflow-hidden border border-[#1A1A1A]/10 bg-white px-6 py-20 sm:px-10 lg:px-20 lg:py-28">

                            {/* Decorative Letter */}
                            <span className="pointer-events-none absolute -right-3 -top-12 font-serif text-[220px] leading-none text-[#EEEAE6] select-none sm:text-[280px]">
                                R
                            </span>

                            <div className="relative max-w-2xl">
                                <div className="mb-6 flex items-center gap-4">
                                    <span className="font-sans text-[10px] tracking-[0.18em] text-[#8A6E68]">
                                        01
                                    </span>

                                    <span className="h-px w-8 bg-[#1A1A1A]/10" />
                                </div>

                                <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl">
                                    Nothing reserved,
                                    <span className="italic text-[#8A6E68]">
                                        {" "}yet.
                                    </span>
                                </h2>

                                <p className="mt-6 max-w-lg font-sans text-sm leading-7 text-[#716C67]">
                                    Your booked properties will appear here once
                                    you make a reservation. Explore available
                                    homes and find a place that feels right.
                                </p>

                                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                                    <Link
                                        href="/properties"
                                        className="group inline-flex items-center justify-center gap-5 bg-[#1A1A1A] px-6 py-4 font-sans text-[9px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#8A6E68]"
                                    >
                                        Explore Properties

                                        <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </Link>

                                    <Link
                                        href="/dashboard/tenant/favorites"
                                        className="group inline-flex items-center justify-center gap-3 border border-[#1A1A1A]/10 px-6 py-4 font-sans text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A] transition-all duration-300 hover:border-[#8A6E68]"
                                    >
                                        View Favorites

                                        <FiChevronRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Bottom Note */}
                <section className="border-t border-[#1A1A1A]/10 pt-8">
                    <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#A09A95]">
                            RENTORA / My Bookings
                        </p>

                        <p className="font-serif text-sm italic text-[#85807B]">
                            Find a place worth coming home to.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default MyBooking;
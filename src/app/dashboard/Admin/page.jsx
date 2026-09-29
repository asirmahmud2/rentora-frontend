import React from "react";
import Link from "next/link";

import {
    FiArrowUpRight,
    FiUsers,
    FiHome,
    FiCalendar,
    FiCreditCard,
    FiShield,
    FiActivity,
    FiSettings,
    FiChevronRight,
} from "react-icons/fi";
import { AllProperties, AllUsers } from "@/app/Server/Actions/CountData";

const AdminDashboard = async () => {
    // Connect your backend data here later.
    const usersCount = await AllUsers();
    const Properties = await AllProperties();
    const stats = {
        users: usersCount.length || 0,
        properties: Properties.length || 0,
        bookings: 0,
        transactions: 0,
    };

    const managementLinks = [
        {
            number: "01",
            title: "Users",
            description: "Manage accounts, roles and platform access.",
            count: stats.users,
            href: "/dashboard/admin/users",
            icon: FiUsers,
        },
        {
            number: "02",
            title: "Properties",
            description: "Review, approve, reject and manage listings.",
            count: stats.properties,
            href: "/dashboard/admin/properties",
            icon: FiHome,
        },
        {
            number: "03",
            title: "Bookings",
            description: "Review reservations and booking activity.",
            count: stats.bookings,
            href: "/dashboard/admin/bookings",
            icon: FiCalendar,
        },
        {
            number: "04",
            title: "Transactions",
            description: "View successful payments and transaction records.",
            count: stats.transactions,
            href: "/dashboard/admin/transactions",
            icon: FiCreditCard,
        },
    ];

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
                                    Administration / Overview
                                </span>
                            </div>

                            <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.035em] text-[#171717] sm:text-6xl lg:text-7xl">
                                Platform
                                <span className="italic text-[#8A6E68]">
                                    {" "}overview.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl font-sans text-sm leading-7 text-[#6F6A65]">
                                Manage the RENTORA marketplace from one place.
                                Review users, properties, bookings and
                                transactions across the platform.
                            </p>
                        </div>

                        {/* Admin indicator */}
                        <div className="border-l border-[#1A1A1A]/10 pl-6">
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#8A6E68]/30">
                                    <FiShield className="text-sm text-[#8A6E68]" />
                                </span>

                                <div>
                                    <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                        Access Level
                                    </p>

                                    <p className="mt-1 font-serif text-xl text-[#1A1A1A]">
                                        Administrator
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    OVERVIEW NUMBERS
                ====================================================== */}
                <section className="border-b border-[#1A1A1A]/10 py-8 lg:py-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4">

                        {/* Users */}
                        <div className="border-b border-r border-[#1A1A1A]/10 px-4 py-6 first:pl-0 lg:border-b-0 lg:px-7 lg:py-2 lg:first:pl-0">
                            <div className="flex items-center gap-3">
                                <FiUsers className="text-sm text-[#8A6E68]" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                    Users
                                </span>
                            </div>

                            <p className="mt-4 font-serif text-4xl leading-none text-[#171717] sm:text-5xl">
                                {stats.users}
                            </p>

                            <p className="mt-2 font-sans text-[10px] text-[#99938E]">
                                Registered accounts
                            </p>
                        </div>

                        {/* Properties */}
                        <div className="border-b border-[#1A1A1A]/10 px-4 py-6 lg:border-b-0 lg:border-r lg:px-7 lg:py-2">
                            <div className="flex items-center gap-3">
                                <FiHome className="text-sm text-[#8A6E68]" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                    Properties
                                </span>
                            </div>

                            <p className="mt-4 font-serif text-4xl leading-none text-[#171717] sm:text-5xl">
                                {stats.properties}
                            </p>

                            <p className="mt-2 font-sans text-[10px] text-[#99938E]">
                                Listed on platform
                            </p>
                        </div>

                        {/* Bookings */}
                        <div className="border-r border-[#1A1A1A]/10 px-4 py-6 first:pl-0 lg:px-7 lg:py-2">
                            <div className="flex items-center gap-3">
                                <FiCalendar className="text-sm text-[#8A6E68]" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                    Bookings
                                </span>
                            </div>

                            <p className="mt-4 font-serif text-4xl leading-none text-[#171717] sm:text-5xl">
                                {stats.bookings}
                            </p>

                            <p className="mt-2 font-sans text-[10px] text-[#99938E]">
                                Reservations
                            </p>
                        </div>

                        {/* Transactions */}
                        <div className="px-4 py-6 lg:px-7 lg:py-2 lg:last:pr-0">
                            <div className="flex items-center gap-3">
                                <FiCreditCard className="text-sm text-[#8A6E68]" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                    Transactions
                                </span>
                            </div>

                            <p className="mt-4 font-serif text-4xl leading-none text-[#171717] sm:text-5xl">
                                {stats.transactions}
                            </p>

                            <p className="mt-2 font-sans text-[10px] text-[#99938E]">
                                Payment records
                            </p>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    ACTIVITY / ANALYTICS PLACEHOLDER
                ====================================================== */}
                <section className="grid gap-px border border-[#1A1A1A]/10 bg-[#1A1A1A]/10 lg:grid-cols-[1.35fr_0.65fr]">

                    {/* Analytics */}
                    <div className="relative min-h-[320px] overflow-hidden bg-[#EEE9E4] p-7 sm:p-10 lg:p-12">

                        <span className="pointer-events-none absolute -right-5 -top-14 select-none font-serif text-[240px] leading-none text-[#E3DDD7]">
                            A
                        </span>

                        <div className="relative">
                            <div className="mb-5 flex items-center gap-4">
                                <FiActivity className="text-sm text-[#8A6E68]" />

                                <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#8A847F]">
                                    Platform Analytics
                                </span>
                            </div>

                            <h3 className="max-w-xl font-serif text-3xl leading-tight text-[#1A1A1A] sm:text-4xl">
                                A broader view of
                                <span className="italic text-[#8A6E68]">
                                    {" "}RENTORA.
                                </span>
                            </h3>

                            <p className="mt-5 max-w-lg font-sans text-xs leading-6 text-[#766F6A]">
                                Your analytics can be connected here later for
                                platform-wide booking volume, user growth,
                                property activity and transaction trends.
                            </p>

                            {/* Empty chart area */}
                            <div className="mt-8 flex h-24 items-end gap-2 border-b border-[#1A1A1A]/10">
                                {[20, 38, 28, 52, 36, 62, 46, 72, 54, 82].map(
                                    (height, index) => (
                                        <div
                                            key={index}
                                            className="w-full bg-[#8A6E68]/15 transition-all duration-300 hover:bg-[#8A6E68]/35"
                                            style={{
                                                height: `${height}%`,
                                            }}
                                        />
                                    )
                                )}
                            </div>

                            <div className="mt-3 flex justify-between">
                                <span className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#9D9691]">
                                    Activity
                                </span>

                                <span className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#9D9691]">
                                    Analytics
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Admin Tools */}
                    <div className="bg-white p-7 sm:p-10 lg:p-12">
                        <div className="mb-6 flex items-center gap-4">
                            <span className="h-px w-7 bg-[#8A6E68]" />

                            <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#9B9690]">
                                Admin Tools
                            </span>
                        </div>

                        <div className="space-y-1">

                            <Link
                                href="/dashboard/admin/users"
                                className="group flex items-center justify-between border-b border-[#1A1A1A]/8 py-5"
                            >
                                <div className="flex items-center gap-4">
                                    <FiUsers className="text-sm text-[#8A6E68]" />

                                    <span className="font-serif text-xl text-[#1A1A1A] transition-transform duration-300 group-hover:translate-x-1.5">
                                        User Management
                                    </span>
                                </div>

                                <FiChevronRight className="text-xs text-[#8A6E68] transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/dashboard/admin/properties"
                                className="group flex items-center justify-between border-b border-[#1A1A1A]/8 py-5"
                            >
                                <div className="flex items-center gap-4">
                                    <FiHome className="text-sm text-[#8A6E68]" />

                                    <span className="font-serif text-xl text-[#1A1A1A] transition-transform duration-300 group-hover:translate-x-1.5">
                                        Property Moderation
                                    </span>
                                </div>

                                <FiChevronRight className="text-xs text-[#8A6E68] transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/dashboard/admin/bookings"
                                className="group flex items-center justify-between border-b border-[#1A1A1A]/8 py-5"
                            >
                                <div className="flex items-center gap-4">
                                    <FiCalendar className="text-sm text-[#8A6E68]" />

                                    <span className="font-serif text-xl text-[#1A1A1A] transition-transform duration-300 group-hover:translate-x-1.5">
                                        Booking Management
                                    </span>
                                </div>

                                <FiChevronRight className="text-xs text-[#8A6E68] transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/dashboard/admin/transactions"
                                className="group flex items-center justify-between border-b border-[#1A1A1A]/8 py-5"
                            >
                                <div className="flex items-center gap-4">
                                    <FiCreditCard className="text-sm text-[#8A6E68]" />

                                    <span className="font-serif text-xl text-[#1A1A1A] transition-transform duration-300 group-hover:translate-x-1.5">
                                        Transactions
                                    </span>
                                </div>

                                <FiChevronRight className="text-xs text-[#8A6E68] transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/dashboard/admin/settings"
                                className="group flex items-center justify-between py-5"
                            >
                                <div className="flex items-center gap-4">
                                    <FiSettings className="text-sm text-[#8A6E68]" />

                                    <span className="font-serif text-xl text-[#1A1A1A] transition-transform duration-300 group-hover:translate-x-1.5">
                                        Platform Settings
                                    </span>
                                </div>

                                <FiChevronRight className="text-xs text-[#8A6E68] transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    FOOTER NOTE
                ====================================================== */}
                <section className="border-t border-[#1A1A1A]/10 pt-8 mt-10 lg:mt-14">
                    <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

                        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#A09A95]">
                            RENTORA / Administration
                        </p>

                        <div className="flex items-center justify-center gap-3">
                            <span className="font-serif text-sm italic text-[#85807B]">
                                Everything in one place.
                            </span>

                            <FiArrowUpRight className="text-xs text-[#8A6E68]" />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AdminDashboard;
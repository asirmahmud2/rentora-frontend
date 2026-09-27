"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@heroui/react";

import {
    FiArrowUpRight,
    FiHome,
    FiPlus,
    FiCalendar,
    FiTrendingUp,
} from "react-icons/fi";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const OwnerPage = () => {
    /*
     * Temporary analytics data.
     *
     * Later this should come from your backend using the
     * currently authenticated owner's ID.
     *
     * The assignment requires the last 12 months of earnings
     * generated from successful booking payments.
     */
    const monthlyEarnings = [
        {
            month: "Oct",
            earnings: 32000,
        },
        {
            month: "Nov",
            earnings: 41000,
        },
        {
            month: "Dec",
            earnings: 38500,
        },
        {
            month: "Jan",
            earnings: 47000,
        },
        {
            month: "Feb",
            earnings: 52000,
        },
        {
            month: "Mar",
            earnings: 49000,
        },
        {
            month: "Apr",
            earnings: 61000,
        },
        {
            month: "May",
            earnings: 58000,
        },
        {
            month: "Jun",
            earnings: 67000,
        },
        {
            month: "Jul",
            earnings: 72000,
        },
        {
            month: "Aug",
            earnings: 69000,
        },
        {
            month: "Sep",
            earnings: 84500,
        },
    ];

    /*
     * Temporary summary values.
     *
     * These will later come from the owner analytics API.
     */
    const totalEarnings = 728500;
    const totalProperties = 12;
    const totalBookings = 38;

    const formatCurrency = (value) => {
        return `৳${value.toLocaleString("en-BD")}`;
    };

    return (
        <main className="min-w-0">

            {/* =========================================================
                PAGE HEADER
            ========================================================= */}
            <section className="border-b border-[#1A1A1A]/10 pb-7 sm:pb-8">

                <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">

                    {/* Heading */}
                    <div>
                        <div className="mb-4 flex items-center gap-4">
                            <span className="h-px w-8 bg-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#A09A95]">
                                Owner Dashboard
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl leading-none tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl lg:text-[56px]">
                            Your portfolio.
                        </h1>

                        <p className="mt-4 max-w-xl font-serif text-base leading-7 text-[#77716D] sm:text-lg">
                            A quiet view of your properties, bookings and
                            earnings across RENTORA.
                        </p>
                    </div>

                    {/* Quick Action */}
                    <Link href="/dashboard/Owner/add-property">
                        <Button
                            variant="primary"
                            className="h-12 rounded-none bg-[#1A1A1A] px-6 font-sans text-[10px] uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#8A6E68]"
                        >
                            <FiPlus className="text-sm" />
                            Add Property
                            <FiArrowUpRight className="text-sm" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* =========================================================
                SUMMARY CARDS
            ========================================================= */}
            <section className="py-7 sm:py-8 lg:py-10">

                <div className="grid gap-px bg-[#1A1A1A]/10 md:grid-cols-3">

                    {/* Total Earnings */}
                    <div className="bg-[#FDFCF9] p-6 sm:p-7 lg:p-8">
                        <div className="flex items-start justify-between">

                            <div>
                                <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#A09A95]">
                                    Total Earnings
                                </p>

                                <p className="mt-5 font-serif text-3xl leading-none text-[#1A1A1A] sm:text-4xl">
                                    {formatCurrency(totalEarnings)}
                                </p>
                            </div>

                            <FiTrendingUp className="text-lg text-[#8A6E68]" />
                        </div>

                        <div className="mt-7 border-t border-[#1A1A1A]/[0.07] pt-4">
                            <p className="font-sans text-[9px] uppercase tracking-[0.12em] text-[#8E8883]">
                                Successful payments received
                            </p>
                        </div>
                    </div>

                    {/* Total Properties */}
                    <div className="bg-[#FDFCF9] p-6 sm:p-7 lg:p-8">
                        <div className="flex items-start justify-between">

                            <div>
                                <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#A09A95]">
                                    Total Properties
                                </p>

                                <p className="mt-5 font-serif text-3xl leading-none text-[#1A1A1A] sm:text-4xl">
                                    {String(totalProperties).padStart(
                                        2,
                                        "0"
                                    )}
                                </p>
                            </div>

                            <FiHome className="text-lg text-[#8A6E68]" />
                        </div>

                        <div className="mt-7 border-t border-[#1A1A1A]/[0.07] pt-4">
                            <p className="font-sans text-[9px] uppercase tracking-[0.12em] text-[#8E8883]">
                                Properties created by you
                            </p>
                        </div>
                    </div>

                    {/* Total Bookings */}
                    <div className="bg-[#FDFCF9] p-6 sm:p-7 lg:p-8">
                        <div className="flex items-start justify-between">

                            <div>
                                <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#A09A95]">
                                    Total Bookings
                                </p>

                                <p className="mt-5 font-serif text-3xl leading-none text-[#1A1A1A] sm:text-4xl">
                                    {String(totalBookings).padStart(
                                        2,
                                        "0"
                                    )}
                                </p>
                            </div>

                            <FiCalendar className="text-lg text-[#8A6E68]" />
                        </div>

                        <div className="mt-7 border-t border-[#1A1A1A]/[0.07] pt-4">
                            <p className="font-sans text-[9px] uppercase tracking-[0.12em] text-[#8E8883]">
                                Confirmed bookings
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                EARNINGS CHART
            ========================================================= */}
            <section className="border-t border-[#1A1A1A]/10 pt-8 sm:pt-10">

                {/* Chart Header */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <div className="mb-4 flex items-center gap-4">
                            <span className="h-px w-8 bg-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#A09A95]">
                                Performance
                            </span>
                        </div>

                        <h2 className="font-serif text-3xl leading-none text-[#1A1A1A] sm:text-4xl">
                            Monthly earnings
                        </h2>

                        <p className="mt-3 font-serif text-sm leading-6 text-[#817A75]">
                            Your earnings from successful booking payments
                            over the last twelve months.
                        </p>
                    </div>

                    <div className="border-l border-[#8A6E68] pl-4">
                        <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                            Current total
                        </p>

                        <p className="mt-1 font-serif text-xl text-[#1A1A1A]">
                            {formatCurrency(totalEarnings)}
                        </p>
                    </div>
                </div>

                {/* Chart Box */}
                <div className="mt-8 border border-[#1A1A1A]/10 bg-[#FDFCF9] p-4 sm:p-6 lg:p-8">

                    <div className="h-[280px] w-full sm:h-[340px] lg:h-[400px]">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <LineChart
                                data={monthlyEarnings}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid
                                    stroke="#1A1A1A"
                                    strokeOpacity={0.06}
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fontSize: 10,
                                        fill: "#8E8883",
                                    }}
                                    dy={10}
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fontSize: 10,
                                        fill: "#8E8883",
                                    }}
                                    tickFormatter={(value) =>
                                        `৳${value / 1000}k`
                                    }
                                    width={55}
                                />

                                <Tooltip
                                    cursor={{
                                        stroke: "#8A6E68",
                                        strokeOpacity: 0.2,
                                    }}
                                    contentStyle={{
                                        border: "1px solid rgba(26, 26, 26, 0.1)",
                                        borderRadius: "0px",
                                        backgroundColor: "#FDFCF9",
                                        boxShadow: "none",
                                    }}
                                    labelStyle={{
                                        fontFamily:
                                            "serif",
                                        color: "#1A1A1A",
                                        marginBottom: "6px",
                                    }}
                                    itemStyle={{
                                        fontFamily:
                                            "sans-serif",
                                        fontSize: "12px",
                                        color: "#8A6E68",
                                    }}
                                    formatter={(value) => [
                                        formatCurrency(value),
                                        "Earnings",
                                    ]}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="earnings"
                                    stroke="#8A6E68"
                                    strokeWidth={2}
                                    dot={{
                                        r: 3,
                                        fill: "#8A6E68",
                                        strokeWidth: 0,
                                    }}
                                    activeDot={{
                                        r: 5,
                                        fill: "#8A6E68",
                                        strokeWidth: 0,
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            {/* =========================================================
                LOWER DASHBOARD AREA
            ========================================================= */}
            <section className="grid gap-8 py-10 lg:grid-cols-[1.5fr_0.8fr] lg:py-12">

                {/* Portfolio Statement */}
                <div className="relative overflow-hidden bg-[#EEE9E4] p-7 sm:p-9 lg:p-10">

                    {/* Decorative R */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-20 right-0 select-none font-serif text-[240px] leading-none text-[#E4DCD6]"
                    >
                        R
                    </div>

                    <div className="relative z-10">

                        <div className="mb-6 flex items-center gap-4">
                            <span className="h-px w-8 bg-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#8A6E68]">
                                Your portfolio
                            </span>
                        </div>

                        <h2 className="max-w-lg font-serif text-3xl leading-tight text-[#1A1A1A] sm:text-4xl">
                            Every property tells a story.
                        </h2>

                        <p className="mt-5 max-w-lg font-serif text-sm leading-7 text-[#756E69] sm:text-base">
                            Keep your listings current, respond to booking
                            requests, and give tenants a place worth coming
                            home to.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            <Link href="/dashboard/Owner/properties">
                                <Button
                                    variant="outline"
                                    className="h-11 w-full rounded-none border-[#1A1A1A]/20 bg-transparent px-5 font-sans text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A] transition hover:border-[#8A6E68] hover:text-[#8A6E68] sm:w-auto"
                                >
                                    View Properties
                                    <FiArrowUpRight />
                                </Button>
                            </Link>

                            <Link href="/dashboard/Owner/booking-requests">
                                <Button
                                    variant="ghost"
                                    className="h-11 w-full rounded-none px-5 font-sans text-[9px] uppercase tracking-[0.2em] text-[#5E5854] transition hover:text-[#8A6E68] sm:w-auto"
                                >
                                    Booking Requests
                                    <FiArrowUpRight />
                                </Button>
                            </Link>

                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="border border-[#1A1A1A]/10 bg-[#FDFCF9] p-7 sm:p-8">

                    <div className="mb-6 flex items-center gap-4">
                        <span className="h-px w-8 bg-[#8A6E68]" />

                        <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#A09A95]">
                            Quick Actions
                        </span>
                    </div>

                    <div className="divide-y divide-[#1A1A1A]/[0.07]">

                        <Link
                            href="/dashboard/Owner/add-property"
                            className="group flex items-center justify-between py-5"
                        >
                            <div className="flex items-center gap-4">
                                <span className="font-sans text-[10px] tracking-[0.15em] text-[#8A6E68]/60">
                                    01
                                </span>

                                <span className="font-serif text-lg text-[#1A1A1A]/85 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#1A1A1A]">
                                    Add Property
                                </span>
                            </div>

                            <FiArrowUpRight className="text-sm text-transparent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8A6E68]" />
                        </Link>

                        <Link
                            href="/dashboard/Owner/properties"
                            className="group flex items-center justify-between py-5"
                        >
                            <div className="flex items-center gap-4">
                                <span className="font-sans text-[10px] tracking-[0.15em] text-[#8A6E68]/60">
                                    02
                                </span>

                                <span className="font-serif text-lg text-[#1A1A1A]/85 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#1A1A1A]">
                                    Manage Properties
                                </span>
                            </div>

                            <FiArrowUpRight className="text-sm text-transparent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8A6E68]" />
                        </Link>

                        <Link
                            href="/dashboard/Owner/booking-requests"
                            className="group flex items-center justify-between py-5"
                        >
                            <div className="flex items-center gap-4">
                                <span className="font-sans text-[10px] tracking-[0.15em] text-[#8A6E68]/60">
                                    03
                                </span>

                                <span className="font-serif text-lg text-[#1A1A1A]/85 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#1A1A1A]">
                                    Booking Requests
                                </span>
                            </div>

                            <FiArrowUpRight className="text-sm text-transparent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8A6E68]" />
                        </Link>

                    </div>
                </div>
            </section>

        </main>
    );
};

export default OwnerPage;
import { getUser } from "@/lib/getUser";
import React from "react";
import Link from "next/link";

import {
    FiArrowUpRight,
    FiHome,
    FiLogOut,
    FiChevronDown,
} from "react-icons/fi";

const DashboardSideBar = async () => {
    const user = await getUser();

    const userRole = user?.role || "Tenant";

    const tenantLinks = [
        {
            name: "Dashboard",
            href: "/dashboard/Tenant",
        },
        {
            name: "My Bookings",
            href: "/dashboard/Tenant/bookings",
        },
        {
            name: "Favorites",
            href: "/dashboard/Tenant/favorites",
        },
        {
            name: "Profile",
            href: "/dashboard/profile",
        },
    ];

    const ownerLinks = [
        {
            name: "Dashboard",
            href: "/dashboard/Owner",
        },
        {
            name: "Add Property",
            href: "/dashboard/Owner/add-property",
        },
        {
            name: "My Properties",
            href: "/dashboard/Owner/properties",
        },
        {
            name: "Booking Requests",
            href: "/dashboard/Owner/booking-requests",
        },
        {
            name: "Profile",
            href: "/dashboard/profile",
        },
    ];

    const adminLinks = [
        {
            name: "Dashboard",
            href: "/dashboard/Admin",
        },
        {
            name: "All Users",
            href: "/dashboard/Admin/users",
        },
        {
            name: "All Properties",
            href: "/dashboard/Admin/properties",
        },
        {
            name: "All Bookings",
            href: "/dashboard/Admin/bookings",
        },
        {
            name: "Transactions",
            href: "/dashboard/Admin/transactions",
        },
        {
            name: "Profile",
            href: "/dashboard/profile",
        },
    ];

    const getRoleLinks = () => {
        if (userRole === "Owner") {
            return ownerLinks;
        }

        if (userRole === "Admin") {
            return adminLinks;
        }

        return tenantLinks;
    };

    const roleLinks = getRoleLinks();

    const roleLabel = {
        Tenant: "Tenant",
        Owner: "Property Owner",
        Admin: "Administrator",
    };

    return (
        <aside className="w-full lg:w-[250px] lg:shrink-0">

            {/* =========================================================
                MOBILE SIDEBAR
            ========================================================= */}
            <div className="mb-5 lg:hidden">
                <details className="group bg-[#EEE9E4]">

                    {/* Mobile Header */}
                    <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                        <div className="flex items-center gap-4">

                            <div>
                                <span className="block font-serif text-[22px] tracking-[0.2em] text-[#1A1A1A]">
                                    RENTORA
                                </span>

                                <span className="mt-1 block font-sans text-[7px] uppercase tracking-[0.4em] text-[#8A6E68]">
                                    {roleLabel[userRole]}
                                </span>
                            </div>
                        </div>

                        <FiChevronDown className="text-base text-[#8A6E68] transition-transform duration-300 group-open:rotate-180" />
                    </summary>

                    {/* Mobile Navigation */}
                    <div className="border-t border-[#1A1A1A]/10 px-5 pb-5">

                        <div className="mb-5 flex items-center gap-4 pt-5">
                            <span className="h-px w-7 bg-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#8E8782]">
                                Navigation
                            </span>
                        </div>

                        <ul className="divide-y divide-[#1A1A1A]/[0.06]">
                            {roleLinks.map((item, index) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="group flex items-baseline justify-between py-4 transition-all duration-300"
                                    >
                                        <div className="flex items-baseline gap-4">

                                            {/* Number */}
                                            <span className="font-sans text-[10px] tracking-[0.15em] text-[#8A6E68]/60 transition-colors duration-300 group-hover:text-[#8A6E68]">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            {/* Link Name */}
                                            <span className="font-serif text-[18px] leading-none text-[#1A1A1A]/80 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#1A1A1A]">
                                                {item.name}
                                            </span>
                                        </div>

                                        {/* Arrow */}
                                        <FiArrowUpRight className="text-xs text-transparent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8A6E68]" />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Footer Links */}
                        <div className="mt-6 border-t border-[#1A1A1A]/10 pt-5">

                            <Link
                                href="/"
                                className="group flex items-center justify-between py-2"
                            >
                                <span className="flex items-center gap-3 font-sans text-[9px] uppercase tracking-[0.18em] text-[#69635F] transition-colors duration-300 group-hover:text-[#8A6E68]">
                                    <FiHome className="text-xs" />
                                    Visit Website
                                </span>

                                <FiArrowUpRight className="text-xs text-[#8A6E68]" />
                            </Link>

                            <button
                                type="button"
                                className="group mt-4 flex w-full items-center justify-between border-t border-[#1A1A1A]/[0.06] pt-4"
                            >
                                <span className="flex items-center gap-3 font-sans text-[9px] uppercase tracking-[0.18em] text-[#69635F] transition-colors duration-300 group-hover:text-[#8A6E68]">
                                    <FiLogOut className="text-xs" />
                                    Sign Out
                                </span>

                                <FiArrowUpRight className="text-xs text-[#8A6E68]" />
                            </button>

                        </div>
                    </div>
                </details>
            </div>

            {/* =========================================================
                DESKTOP SIDEBAR
            ========================================================= */}
            <div className="sticky top-7 hidden bg-[#EEE9E4] lg:block">

                <div className="px-7 py-8">
                    <div className="border-b border-[#1A1A1A]/10">

                        <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#918983]">
                            Account
                        </span>

                        <h3 className="mt-3 truncate font-serif text-[19px] text-[#1A1A1A]">
                            {user?.name || "RENTORA User"}
                        </h3>

                        <div className="mt-2 flex items-center gap-2">

                            <span className="h-1.5 w-1.5 rounded-full bg-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#8A6E68]">
                                {roleLabel[userRole]}
                            </span>

                        </div>
                    </div>

                    {/* =================================================
                        NAVIGATION
                    ================================================= */}
                    <div className="py-8">

                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-8 bg-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#A09A95]">
                                Navigation
                            </span>
                        </div>

                        <ul className="divide-y divide-[#1A1A1A]/[0.06]">

                            {roleLinks.map((item, index) => (
                                <li key={item.href}>

                                    <Link
                                        href={item.href}
                                        className="group flex items-baseline justify-between py-4 transition-all duration-300"
                                    >

                                        <div className="flex items-baseline gap-4">

                                            {/* Number */}
                                            <span className="font-sans text-[10px] tracking-[0.15em] text-[#8A6E68]/60 transition-colors duration-300 group-hover:text-[#8A6E68]">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            {/* Navigation text */}
                                            <span className="font-serif text-[19px] leading-none text-[#1A1A1A]/85 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#1A1A1A]">
                                                {item.name}
                                            </span>

                                        </div>

                                        {/* Hover arrow */}
                                        <FiArrowUpRight className="text-xs text-transparent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8A6E68]" />

                                    </Link>

                                </li>
                            ))}

                        </ul>
                    </div>

                    {/* =================================================
                        BOTTOM LINKS
                    ================================================= */}
                    <div className="border-t border-[#1A1A1A]/10 pt-6">

                        <Link
                            href="/"
                            className="group flex items-center justify-between py-2"
                        >
                            <span className="flex items-center gap-3 font-sans text-[9px] uppercase tracking-[0.18em] text-[#69635F] transition-colors duration-300 group-hover:text-[#8A6E68]">
                                <FiHome className="text-xs" />
                                Back to Website
                            </span>

                            <FiArrowUpRight className="text-xs text-[#8A6E68] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>

                    </div>
                    <div className="pt-8">

                        <p className="font-serif text-[11px] italic leading-5 text-[#99918B]">
                            A more thoughtful
                            <br />
                            way to rent.
                        </p>

                    </div>

                </div>
            </div>
        </aside>
    );
};

export default DashboardSideBar;
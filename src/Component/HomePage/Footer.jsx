"use client";

import React from "react";
import Link from "next/link";

import { Button, Input } from "@heroui/react";

import {
    FiArrowUpRight,
    FiInstagram,
    FiFacebook,
    FiYoutube,
    FiMail,
    FiPhone,
    FiMapPin,
} from "react-icons/fi";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    /*
     * Temporary authentication state.
     *
     * Replace these later with your real auth/session data.
     */
    const isLoggedIn = false;
    const userRole = "Tenant";

    const year = new Date().getFullYear();

    const publicLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "All Properties",
            href: "/properties",
        },
        {
            name: "About",
            href: "/about",
        },
        {
            name: "How It Works",
            href: "/how-it-works",
        },
    ];

    const companyLinks = [
        {
            name: "About RENTORA",
            href: "/about",
        },
        {
            name: "Our Story",
            href: "/about#story",
        },
        {
            name: "Top Locations",
            href: "/locations",
        },
        {
            name: "Contact",
            href: "/contact",
        },
    ];

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

    const accountLinks = getRoleLinks();

    return (
        <footer className="bg-[#0A0A0A] text-[#F4F1EB]">

            {/* ============================================================
                MAIN FOOTER
            ============================================================ */}
            <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

                {/* ========================================================
                    BRAND / NEWSLETTER AREA
                ======================================================== */}
                <div className="grid gap-14 border-b border-white/15 pb-16 lg:grid-cols-[1.3fr_1fr] lg:gap-20 lg:pb-20">

                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="inline-block"
                        >
                            <span className="block font-serif text-4xl tracking-[0.24em] text-white sm:text-5xl">
                                RENTORA
                            </span>

                            <span className="mt-2 block font-sans text-[8px] uppercase tracking-[0.45em] text-[#A98C85] sm:text-[9px]">
                                Property & Living
                            </span>
                        </Link>

                        <div className="mt-8 max-w-xl">
                            <p className="font-serif text-2xl leading-[1.35] text-[#F4F1EB] sm:text-3xl lg:text-[34px]">
                                Find a place that feels like home.
                            </p>

                            <p className="mt-5 max-w-lg font-sans text-sm leading-7 text-white/55">
                                Discover thoughtfully selected properties,
                                connect with trusted owners, and make your
                                next move with confidence.
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="mt-8 flex items-center gap-3">
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center border border-white/15 transition duration-300 hover:border-[#A98C85] hover:bg-[#A98C85] hover:text-white"
                            >
                                <FiInstagram className="text-[15px]" />
                            </a>

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center border border-white/15 transition duration-300 hover:border-[#A98C85] hover:bg-[#A98C85] hover:text-white"
                            >
                                <FiFacebook className="text-[15px]" />
                            </a>

                            <a
                                href="#"
                                aria-label="X"
                                className="flex h-10 w-10 items-center justify-center border border-white/15 transition duration-300 hover:border-[#A98C85] hover:bg-[#A98C85] hover:text-white"
                            >
                                <FaXTwitter className="text-[14px]" />
                            </a>

                            <a
                                href="#"
                                aria-label="YouTube"
                                className="flex h-10 w-10 items-center justify-center border border-white/15 transition duration-300 hover:border-[#A98C85] hover:bg-[#A98C85] hover:text-white"
                            >
                                <FiYoutube className="text-[15px]" />
                            </a>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:pt-3">
                        <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#A98C85]">
                            Stay Connected
                        </p>

                        <h3 className="mt-3 font-serif text-2xl text-[#F4F1EB] sm:text-3xl">
                            Be the first to know.
                        </h3>

                        <p className="mt-4 max-w-md font-sans text-sm leading-7 text-white/50">
                            Get new property listings, rental insights and
                            curated locations delivered to your inbox.
                        </p>

                        <form
                            className="mt-7"
                            onSubmit={(event) => {
                                event.preventDefault();

                                // Connect this form to your newsletter API later.
                                console.log("Newsletter submitted");
                            }}
                        >
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Input
                                    type="email"
                                    placeholder="Your email address"
                                    aria-label="Email address"
                                    className="min-w-0 flex-1"
                                    classNames={{
                                        inputWrapper:
                                            "h-12 rounded-none border border-white/20 bg-white/[0.04] shadow-none data-[hover=true]:border-white/40",
                                        input:
                                            "font-sans text-sm text-white placeholder:text-white/35",
                                    }}
                                />

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="h-12 rounded-none bg-[#F4F1EB] px-6 font-sans text-[10px] uppercase tracking-[0.2em] text-[#0A0A0A] hover:bg-[#A98C85] hover:text-white"
                                >
                                    Subscribe
                                    <FiArrowUpRight className="text-sm" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* ========================================================
                    FOOTER LINK GRID
                ======================================================== */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 sm:grid-cols-3 lg:grid-cols-4 lg:py-16">

                    {/* Explore */}
                    <div>
                        <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#A98C85]">
                            Explore
                        </p>

                        <ul className="mt-6 space-y-4">
                            {publicLinks.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="group inline-flex items-center gap-1 font-sans text-sm text-white/60 transition hover:text-white"
                                    >
                                        {item.name}

                                        <FiArrowUpRight className="text-[11px] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#A98C85]">
                            RENTORA
                        </p>

                        <ul className="mt-6 space-y-4">
                            {companyLinks.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="group inline-flex items-center gap-1 font-sans text-sm text-white/60 transition hover:text-white"
                                    >
                                        {item.name}

                                        <FiArrowUpRight className="text-[11px] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#A98C85]">
                            Account
                        </p>

                        {!isLoggedIn ? (
                            <ul className="mt-6 space-y-4">
                                <li>
                                    <Link
                                        href="/login"
                                        className="group inline-flex items-center gap-1 font-sans text-sm text-white/60 transition hover:text-white"
                                    >
                                        Login
                                        <FiArrowUpRight className="text-[11px] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/register"
                                        className="group inline-flex items-center gap-1 font-sans text-sm text-white/60 transition hover:text-white"
                                    >
                                        Create Account
                                        <FiArrowUpRight className="text-[11px] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="mt-6 space-y-4">
                                {accountLinks.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="group inline-flex items-center gap-1 font-sans text-sm text-white/60 transition hover:text-white"
                                        >
                                            {item.name}

                                            <FiArrowUpRight className="text-[11px] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Contact */}
                    <div className="col-span-2 sm:col-span-1">
                        <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#A98C85]">
                            Contact
                        </p>

                        <div className="mt-6 space-y-5">

                            <a
                                href="mailto:hello@rentora.com"
                                className="group flex items-start gap-3"
                            >
                                <FiMail className="mt-1 shrink-0 text-sm text-[#A98C85]" />

                                <span className="font-sans text-sm leading-6 text-white/60 transition group-hover:text-white">
                                    hello@rentora.com
                                </span>
                            </a>

                            <a
                                href="tel:+8801234567890"
                                className="group flex items-start gap-3"
                            >
                                <FiPhone className="mt-1 shrink-0 text-sm text-[#A98C85]" />

                                <span className="font-sans text-sm leading-6 text-white/60 transition group-hover:text-white">
                                    +880 1234 567 890
                                </span>
                            </a>

                            <div className="flex items-start gap-3">
                                <FiMapPin className="mt-1 shrink-0 text-sm text-[#A98C85]" />

                                <span className="font-sans text-sm leading-6 text-white/60">
                                    Chattogram, Bangladesh
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================
                    ROLE CTA
                ======================================================== */}
                {!isLoggedIn && (
                    <div className="border-y border-white/15 py-10">
                        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

                            <div>
                                <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#A98C85]">
                                    Own a property?
                                </p>

                                <h3 className="mt-2 font-serif text-2xl text-[#F4F1EB] sm:text-3xl">
                                    Turn your space into an opportunity.
                                </h3>
                            </div>

                            <Link href="/register">
                                <Button
                                    variant="outline"
                                    className="h-12 w-full rounded-none border-white/25 bg-transparent px-7 font-sans text-[10px] uppercase tracking-[0.2em] text-white hover:border-[#A98C85] hover:bg-[#A98C85] sm:w-auto"
                                >
                                    Become an Owner
                                    <FiArrowUpRight className="text-sm" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* ========================================================
                    BOTTOM BAR
                ======================================================== */}
                <div className="flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between">

                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/35">
                        © {year} RENTORA. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <Link
                            href="/privacy"
                            className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/35 transition hover:text-white"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms"
                            className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/35 transition hover:text-white"
                        >
                            Terms
                        </Link>

                        <Link
                            href="/contact"
                            className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/35 transition hover:text-white"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
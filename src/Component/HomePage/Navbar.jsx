"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button, Dropdown, Label } from "@heroui/react";

import {
    FiMenu,
    FiX,
    FiUser,
    FiLogIn,
    FiLogOut,
    FiChevronDown,
    FiArrowUpRight,
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";

const Navbar = () => {
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Better Auth session
    const { data: session } = authClient.useSession();

    const user = session?.user;
    const role = user?.role;
    const isLoggedIn = !!user;

    // Public navigation links
    const publicLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Properties",
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

    const isActive = (href) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(href);
    };

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
    };

    // Better Auth logout
    const handleLogout = async () => {
        await authClient.signOut();
        closeMobileMenu();
    };

    return (
        <>
            <nav
                suppressHydrationWarning
                className="w-full border-b border-black/10 bg-[#FDFCF9]/95 backdrop-blur-md"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* =====================================================
                        TOP BRAND ROW
                    ===================================================== */}
                    <div className="relative flex h-[76px] items-center justify-between">

                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden">
                            <Button
                                isIconOnly
                                variant="ghost"
                                aria-label={
                                    isMenuOpen
                                        ? "Close navigation menu"
                                        : "Open navigation menu"
                                }
                                onPress={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-[#1A1A1A]"
                            >
                                {isMenuOpen ? (
                                    <FiX className="text-xl" />
                                ) : (
                                    <FiMenu className="text-xl" />
                                )}
                            </Button>
                        </div>

                        {/* Left Desktop Utility */}
                        <div className="hidden min-w-[180px] items-center lg:flex">
                            <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#77716D]">
                                Curated Living
                            </span>
                        </div>

                        {/* Centered Brand */}
                        <Link
                            href="/"
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                            onClick={closeMobileMenu}
                        >
                            <span className="block font-serif text-[25px] tracking-[0.24em] text-[#1A1A1A] sm:text-[29px]">
                                RENTORA
                            </span>

                            <span className="mt-1 block font-sans text-[7px] uppercase tracking-[0.5em] text-[#8A6E68] sm:text-[8px]">
                                Property & Living
                            </span>
                        </Link>

                        {/* =================================================
                            RIGHT DESKTOP ACTIONS
                        ================================================= */}
                        <div className="ml-auto hidden items-center gap-2 lg:flex">

                            {!isLoggedIn ? (
                                <>
                                    {/* Sign In */}
                                    <Link
                                        href="/login"
                                        className="px-4 py-2 font-sans text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A] transition hover:text-[#8A6E68]"
                                    >
                                        Sign In
                                    </Link>

                                    {/* Join */}
                                    <Link href="/register">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="rounded-none bg-[#1A1A1A] px-5 font-sans text-[10px] uppercase tracking-[0.2em] text-white hover:bg-[#8A6E68]"
                                        >
                                            Join
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {/* Account */}
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <Button
                                                variant="ghost"
                                                className="rounded-none px-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]"
                                            >
                                                <FiUser className="text-sm" />

                                                Account

                                                <FiChevronDown className="text-xs" />
                                            </Button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Popover className="min-w-[220px] rounded-none border border-black/10 bg-[#FDFCF9] shadow-none">
                                            <Dropdown.Menu>

                                                {/* User Information */}
                                                <Dropdown.Item
                                                    id="account-info"
                                                    textValue="Account"
                                                    className="cursor-default"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-serif text-base text-[#1A1A1A]">
                                                            {user?.name || "Account"}
                                                        </span>

                                                        <span className="mt-1 font-sans text-[9px] tracking-[0.08em] text-[#77716D]">
                                                            {user?.email}
                                                        </span>
                                                    </div>
                                                </Dropdown.Item>

                                            </Dropdown.Menu>
                                        </Dropdown.Popover>
                                    </Dropdown>

                                    {/* Logout beside Account */}
                                    <Button
                                        variant="ghost"
                                        onPress={handleLogout}
                                        className="rounded-none px-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] transition hover:text-[#8A6E68]"
                                    >
                                        <FiLogOut className="text-sm" />
                                        Logout
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* =====================================================
                        DESKTOP NAVIGATION
                    ===================================================== */}
                    <div className="hidden border-t border-black/10 lg:block">
                        <div className="flex min-h-[52px] items-center justify-center">
                            <ul className="flex items-center gap-8 xl:gap-11">

                                {/* Public Links */}
                                {publicLinks.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`group relative py-4 font-sans text-[10px] uppercase tracking-[0.24em] transition duration-300 ${
                                                isActive(item.href)
                                                    ? "text-[#8A6E68]"
                                                    : "text-[#33302E] hover:text-[#8A6E68]"
                                            }`}
                                        >
                                            {item.name}

                                            <span
                                                className={`absolute bottom-0 left-0 h-px bg-[#8A6E68] transition-all duration-300 ${
                                                    isActive(item.href)
                                                        ? "w-full"
                                                        : "w-0 group-hover:w-full"
                                                }`}
                                            />
                                        </Link>
                                    </li>
                                ))}

                                {/* Dashboard - ONLY WHEN LOGGED IN */}
                                {isLoggedIn && (
                                    <li>
                                        <Link
                                            href={`/dashboard/${role}`}
                                            className={`group relative flex items-center gap-1 py-4 font-sans text-[10px] uppercase tracking-[0.24em] transition ${
                                                pathname.startsWith("/dashboard")
                                                    ? "text-[#8A6E68]"
                                                    : "text-[#33302E] hover:text-[#8A6E68]"
                                            }`}
                                        >
                                            Dashboard

                                            <FiArrowUpRight className="text-xs" />

                                            <span
                                                className={`absolute bottom-0 left-0 h-px bg-[#8A6E68] transition-all duration-300 ${
                                                    pathname.startsWith("/dashboard")
                                                        ? "w-full"
                                                        : "w-0 group-hover:w-full"
                                                }`}
                                            />
                                        </Link>
                                    </li>
                                )}

                                {/* Login - ONLY WHEN LOGGED OUT */}
                                {!isLoggedIn && (
                                    <li>
                                        <Link
                                            href="/login"
                                            className="group relative flex items-center gap-1 py-4 font-sans text-[10px] uppercase tracking-[0.24em] text-[#33302E] transition hover:text-[#8A6E68]"
                                        >
                                            Login

                                            <FiLogIn className="text-xs" />

                                            <span className="absolute bottom-0 left-0 h-px w-0 bg-[#8A6E68] transition-all duration-300 group-hover:w-full" />
                                        </Link>
                                    </li>
                                )}

                            </ul>
                        </div>
                    </div>
                </div>

                {/* =========================================================
                    MOBILE MENU
                ========================================================= */}
                <div
                    className={`overflow-hidden border-t border-black/10 bg-[#FDFCF9] transition-all duration-500 lg:hidden ${
                        isMenuOpen
                            ? "max-h-[900px] opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="container mx-auto px-4 sm:px-6">

                        <div className="py-8">

                            {/* Mobile Intro */}
                            <div className="mb-8 border-b border-black/10 pb-6">
                                <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#8A6E68]">
                                    Property & Living
                                </p>

                                <p className="mt-2 max-w-xs font-serif text-2xl leading-tight text-[#1A1A1A]">
                                    Find a place that feels like yours.
                                </p>
                            </div>

                            {/* Main Links */}
                            <div className="space-y-1">

                                {publicLinks.map((item, index) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={closeMobileMenu}
                                        className="group flex items-center justify-between border-b border-black/10 py-4"
                                    >
                                        <span
                                            className={`font-serif text-2xl ${
                                                isActive(item.href)
                                                    ? "text-[#8A6E68]"
                                                    : "text-[#1A1A1A]"
                                            }`}
                                        >
                                            {String(index + 1).padStart(2, "0")}

                                            <span className="ml-4">
                                                {item.name}
                                            </span>
                                        </span>

                                        <FiArrowUpRight className="text-lg text-[#8A6E68] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                                    </Link>
                                ))}

                                {/* Dashboard - ONLY WHEN LOGGED IN */}
                                {isLoggedIn && (
                                    <Link
                                        href="/dashboard"
                                        onClick={closeMobileMenu}
                                        className="group flex items-center justify-between border-b border-black/10 py-4"
                                    >
                                        <span
                                            className={`font-serif text-2xl ${
                                                pathname.startsWith("/dashboard")
                                                    ? "text-[#8A6E68]"
                                                    : "text-[#1A1A1A]"
                                            }`}
                                        >
                                            05

                                            <span className="ml-4">
                                                Dashboard
                                            </span>
                                        </span>

                                        <FiArrowUpRight className="text-lg text-[#8A6E68] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                                    </Link>
                                )}

                            </div>

                            {/* =================================================
                                MOBILE ACCOUNT SECTION
                            ================================================= */}
                            <div className="mt-8 border-t border-black/10 pt-7">

                                {!isLoggedIn ? (
                                    /* LOGGED OUT */
                                    <div className="grid grid-cols-2 gap-3">

                                        <Link
                                            href="/login"
                                            onClick={closeMobileMenu}
                                        >
                                            <Button
                                                fullWidth
                                                variant="outline"
                                                className="rounded-none border-black/20 font-sans text-[10px] uppercase tracking-[0.2em]"
                                            >
                                                <FiLogIn />
                                                Login
                                            </Button>
                                        </Link>

                                        <Link
                                            href="/register"
                                            onClick={closeMobileMenu}
                                        >
                                            <Button
                                                fullWidth
                                                variant="primary"
                                                className="rounded-none bg-[#1A1A1A] font-sans text-[10px] uppercase tracking-[0.2em] text-white"
                                            >
                                                Join
                                            </Button>
                                        </Link>

                                    </div>
                                ) : (
                                    /* LOGGED IN */
                                    <div>

                                        {/* User Info */}
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="min-w-0">
                                                <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#8A6E68]">
                                                    Signed in as
                                                </p>

                                                <p className="mt-1 truncate font-serif text-xl text-[#1A1A1A]">
                                                    {user?.name || user?.email}
                                                </p>

                                                {user?.name && (
                                                    <p className="mt-1 truncate font-sans text-[9px] tracking-[0.08em] text-[#77716D]">
                                                        {user?.email}
                                                    </p>
                                                )}
                                            </div>

                                            <FiUser className="ml-4 shrink-0 text-xl" />
                                        </div>

                                        {/* Dashboard */}
                                        <Link
                                            href="/dashboard"
                                            onClick={closeMobileMenu}
                                            className="flex w-full items-center justify-between border-b border-black/10 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#33302E]"
                                        >
                                            <span>Dashboard</span>

                                            <FiArrowUpRight className="text-sm text-[#8A6E68]" />
                                        </Link>

                                        {/* Logout */}
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="mt-6 flex w-full items-center justify-center gap-2 border border-black/20 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] transition hover:border-[#8A6E68] hover:text-[#8A6E68]"
                                        >
                                            <FiLogOut />
                                            Logout
                                        </button>

                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
import { getUser } from "@/lib/getUser";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
    FiArrowLeft,
    FiArrowUpRight,
    FiCheck,
    FiEdit3,
    FiMail,
    FiPhone,
    FiShield,
    FiUser,
} from "react-icons/fi";

const UserProfile = async () => {
    const user = await getUser();

    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        return new Date(date).toLocaleDateString("en-BD", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const getRoleTitle = () => {
        if (user?.role === "Admin") {
            return "Administrator";
        }

        if (user?.role === "Owner") {
            return "Property Owner";
        }

        return "Tenant";
    };

    const getRoleDescription = () => {
        if (user?.role === "Admin") {
            return "Manage the RENTORA platform";
        }

        if (user?.role === "Owner") {
            return "Manage your properties and bookings";
        }

        return "Discover and book properties";
    };

    return (
        <main className="min-w-0 bg-[#F4F2ED]">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* =====================================================
                    PAGE HEADER
                ===================================================== */}
                <section className="border-b border-[#1A1A1A]/10 py-7 sm:py-8">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                        <div>
                            <Link
                                href="/dashboard"
                                className="mb-6 inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#77716D] transition-colors duration-300 hover:text-[#8A6E68]"
                            >
                                <FiArrowLeft className="text-xs" />
                                Dashboard
                            </Link>

                            <div className="flex items-center gap-4">
                                <span className="h-px w-8 bg-[#8A6E68]" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#A09A95]">
                                    Account
                                </span>
                            </div>

                            <h1 className="mt-4 font-serif text-4xl leading-none tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl">
                                Your profile.
                            </h1>

                            <p className="mt-4 max-w-xl font-serif text-base leading-7 text-[#77716D] sm:text-lg">
                                Manage your personal information and RENTORA
                                account details.
                            </p>
                        </div>

                        <Link
                            href="/dashboard/profile/edit"
                            className="group inline-flex items-center gap-2 self-start border border-[#1A1A1A]/15 px-5 py-3 font-sans text-[9px] uppercase tracking-[0.18em] text-[#403B38] transition-colors duration-300 hover:border-[#8A6E68] hover:text-[#8A6E68] sm:self-auto"
                        >
                            <FiEdit3 className="text-xs" />
                            Edit Profile
                            <FiArrowUpRight className="text-xs transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>

                    </div>
                </section>

                {/* =====================================================
                    PROFILE HERO
                ===================================================== */}
                <section className="py-8 sm:py-10 lg:py-12">

                    <div className="grid overflow-hidden bg-[#EEE9E4] lg:grid-cols-[300px_1fr]">

                        {/* =================================================
                            PHOTO
                        ================================================= */}
                        <div className="relative aspect-square bg-[#E2DDD7] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[390px]">

                            {user?.image ? (
                                <Image
                                    src={user.image}
                                    alt={`${user?.name || "User"} profile photo`}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 300px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <span className="font-serif text-8xl text-[#B1AAA5]">
                                        {user?.name?.charAt(0)?.toUpperCase() ||
                                            "R"}
                                    </span>
                                </div>
                            )}

                            {/* Small image label */}
                            <div className="absolute bottom-4 left-4 bg-[#FDFCF9]/90 px-3 py-2 backdrop-blur-sm">
                                <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#8A6E68]">
                                    RENTORA Member
                                </p>
                            </div>
                        </div>

                        {/* =================================================
                            PROFILE INFORMATION
                        ================================================= */}
                        <div className="relative flex flex-col justify-between p-7 sm:p-9 lg:p-12">

                            {/* Decorative R */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -bottom-16 right-0 select-none font-serif text-[250px] leading-none text-[#E4DCD6]"
                            >
                                R
                            </div>

                            <div className="relative z-10">

                                {/* Role */}
                                <div className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#8A6E68]" />

                                    <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#8A6E68]">
                                        {getRoleTitle()}
                                    </span>
                                </div>

                                {/* Name */}
                                <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl lg:text-6xl">
                                    {user?.name || "RENTORA User"}
                                </h2>

                                <p className="mt-5 max-w-lg font-serif text-base leading-7 text-[#756E69] sm:text-lg">
                                    {getRoleDescription()} through a more
                                    thoughtful rental experience.
                                </p>

                            </div>

                            {/* Account metadata */}
                            <div className="relative z-10 mt-12 grid gap-6 border-t border-[#1A1A1A]/10 pt-6 sm:grid-cols-2">

                                <div>
                                    <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                        Member Since
                                    </p>

                                    <p className="mt-2 font-serif text-lg text-[#1A1A1A]">
                                        {formatDate(user?.createdAt)}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                        Account Type
                                    </p>

                                    <p className="mt-2 font-serif text-lg text-[#1A1A1A]">
                                        {getRoleTitle()}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* =====================================================
                    ACCOUNT DETAILS
                ===================================================== */}
                <section className="pb-10 sm:pb-12 lg:pb-14">

                    <div className="mb-6 flex items-center gap-4">
                        <span className="h-px w-8 bg-[#8A6E68]" />

                        <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#A09A95]">
                            Personal Information
                        </span>
                    </div>

                    <div className="grid gap-px bg-[#1A1A1A]/10 sm:grid-cols-2">

                        {/* Name */}
                        <div className="bg-[#FDFCF9] p-6 sm:p-7">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                        Full Name
                                    </p>

                                    <p className="mt-4 font-serif text-xl text-[#1A1A1A]">
                                        {user?.name || "Not provided"}
                                    </p>
                                </div>

                                <FiUser className="text-base text-[#8A6E68]" />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-[#FDFCF9] p-6 sm:p-7">
                            <div className="flex items-start justify-between">
                                <div className="min-w-0">
                                    <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                        Email Address
                                    </p>

                                    <p className="mt-4 truncate font-serif text-xl text-[#1A1A1A]">
                                        {user?.email || "Not provided"}
                                    </p>
                                </div>

                                <FiMail className="shrink-0 text-base text-[#8A6E68]" />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="bg-[#FDFCF9] p-6 sm:p-7">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                        Phone Number
                                    </p>

                                    <p className="mt-4 font-serif text-xl text-[#1A1A1A]">
                                        {user?.phone || "Not provided"}
                                    </p>

                                    {!user?.phone && (
                                        <Link
                                            href="/dashboard/profile/edit"
                                            className="mt-2 inline-flex items-center gap-1 font-sans text-[8px] uppercase tracking-[0.14em] text-[#8A6E68]"
                                        >
                                            Add phone number
                                            <FiArrowUpRight className="text-[10px]" />
                                        </Link>
                                    )}
                                </div>

                                <FiPhone className="text-base text-[#8A6E68]" />
                            </div>
                        </div>

                        {/* Role */}
                        <div className="bg-[#FDFCF9] p-6 sm:p-7">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                        Account Role
                                    </p>

                                    <p className="mt-4 font-serif text-xl text-[#1A1A1A]">
                                        {getRoleTitle()}
                                    </p>
                                </div>

                                <FiShield className="text-base text-[#8A6E68]" />
                            </div>
                        </div>

                    </div>
                </section>

                {/* =====================================================
                    VERIFICATION
                ===================================================== */}
                <section className="pb-10 sm:pb-12 lg:pb-14">

                    <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">

                        {/* Verification */}
                        <div className="border border-[#1A1A1A]/10 bg-[#FDFCF9] p-7 sm:p-8">

                            <div className="flex items-center gap-4">
                                <span className="h-px w-8 bg-[#8A6E68]" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#A09A95]">
                                    Account Status
                                </span>
                            </div>

                            <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                                <div>
                                    <h3 className="font-serif text-2xl text-[#1A1A1A]">
                                        Email verification
                                    </h3>

                                    <p className="mt-2 max-w-lg font-sans text-[10px] leading-5 text-[#817A75]">
                                        {user?.emailVerified
                                            ? "Your email address has been verified."
                                            : "Your email address has not been verified yet."}
                                    </p>
                                </div>

                                {user?.emailVerified ? (
                                    <span className="inline-flex w-fit items-center gap-2 border border-[#65745D]/20 bg-[#65745D]/5 px-3 py-2 font-sans text-[8px] uppercase tracking-[0.16em] text-[#65745D]">
                                        <FiCheck className="text-xs" />
                                        Verified
                                    </span>
                                ) : (
                                    <span className="inline-flex w-fit items-center gap-2 border border-[#A58C55]/20 bg-[#A58C55]/5 px-3 py-2 font-sans text-[8px] uppercase tracking-[0.16em] text-[#826B35]">
                                        Pending
                                    </span>
                                )}

                            </div>
                        </div>

                        {/* Quote */}
                        <div className="relative overflow-hidden bg-[#EEE9E4] p-7 sm:p-8">

                            <span
                                aria-hidden="true"
                                className="absolute -right-2 -top-10 font-serif text-[130px] leading-none text-[#E4DCD6]"
                            >
                                “
                            </span>

                            <div className="relative z-10">
                                <p className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#8A6E68]">
                                    RENTORA
                                </p>

                                <p className="mt-6 font-serif text-2xl leading-[1.3] text-[#3D3835]">
                                    A more thoughtful way to rent.
                                </p>

                                <p className="mt-5 font-serif text-sm italic text-[#918983]">
                                    Property & Living
                                </p>
                            </div>

                        </div>

                    </div>
                </section>

                {/* =====================================================
                    BOTTOM
                ===================================================== */}
                <section className="border-t border-[#1A1A1A]/10 py-6">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <p className="font-serif text-xs italic text-[#A09A95]">
                            Your identity. Your space. Your RENTORA.
                        </p>

                        <p className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#B0A9A4]">
                            Updated {formatDate(user?.updatedAt)}
                        </p>

                    </div>

                </section>

            </div>
        </main>
    );
};

export default UserProfile;
'use client';

import React from "react";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
    const router = useRouter();
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#FDFCF9] px-4 text-[#1A1A1A]">
            <div className="container mx-auto max-w-2xl text-center">

                {/* Small Label */}
                <div className="mb-6 flex items-center justify-center gap-4">
                    <span className="h-px w-8 bg-[#8A6E68]" />

                    <span className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#9B9690]">
                        Access Restricted
                    </span>

                    <span className="h-px w-8 bg-[#8A6E68]" />
                </div>

                {/* Error Code */}
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8A6E68]">
                    Error 403
                </p>

                {/* Heading */}
                <h1 className="mt-5 font-serif text-5xl leading-none tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                    You cannot
                    <span className="italic text-[#8A6E68]">
                        {" "}enter here.
                    </span>
                </h1>

                {/* Description */}
                <p className="mx-auto mt-6 max-w-md font-sans text-sm leading-7 text-[#77716C]">
                    You do not have permission to access this page.
                    Please return to a section available to your account.
                </p>

                {/* Action */}
                <button
                    onClick={() => router.back()}
                    className="group mt-9 inline-flex items-center gap-5 bg-[#1A1A1A] px-6 py-4 font-sans text-[9px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#8A6E68]"
                >
                    <FiArrowLeft className="text-sm transition-transform duration-300 group-hover:-translate-x-1" />
                    Back
                </button>

                {/* Footer Detail */}
                <p className="mt-12 font-serif text-sm italic text-[#A09A95]">
                    RENTORA / Protected Area
                </p>
            </div>
        </main>
    );
};

export default UnauthorizedPage;
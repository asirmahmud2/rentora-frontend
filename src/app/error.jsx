
"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
    FiAlertCircle,
    FiArrowLeft,
    FiArrowUpRight,
    FiRefreshCw,
} from "react-icons/fi";

const Error = ({ error, reset }) => {
    useEffect(() => {
        console.error("RENTORA application error:", error);
    }, [error]);

    return (
        <main className="flex min-h-[75vh] items-center justify-center bg-[#FDFCF9] px-5 py-16 text-[#1A1A1A]">
            <div className="w-full max-w-xl text-center">
                {/* Brand */}
                <div className="mb-12 flex items-center justify-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-[#8A6E68]/50 font-serif text-xl">
                        R
                    </div>

                    <span className="text-xs tracking-[0.28em]">
                        RENTORA
                    </span>
                </div>

                {/* Error illustration */}
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-[#E5DDD5]" />
                    <div className="absolute inset-2 rounded-full border border-dashed border-[#C9B6AC]" />

                    <FiAlertCircle
                        aria-hidden="true"
                        className="text-3xl text-[#8A6E68]"
                        strokeWidth={1.2}
                    />

                    <span className="absolute -right-1 top-3 h-3 w-3 rounded-full bg-[#8A6E68]" />
                </div>

                {/* Message */}
                <p className="mt-9 text-[9px] uppercase tracking-[0.28em] text-[#8A6E68]">
                    A temporary interruption
                </p>

                <h1 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.045em] sm:text-5xl">
                    Well, this wasn't
                    <span className="block italic text-[#8A6E68]">
                        part of the plan.
                    </span>
                </h1>

                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#77716D]">
                    Something went wrong while preparing this page.
                    Let's give it another try, or return to RENTORA
                    and find your way from there.
                </p>

                {/* Recovery actions */}
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex h-12 items-center justify-center gap-3 bg-[#1A1A1A] px-7 text-[9px] uppercase tracking-[0.17em] text-white transition-colors hover:bg-[#8A6E68]"
                    >
                        <FiRefreshCw className="text-sm" />
                        Try again
                    </button>

                    <Link
                        href="/"
                        className="inline-flex h-12 items-center justify-center gap-3 border border-[#DCD3CA] px-7 text-[9px] uppercase tracking-[0.17em] text-[#5E5854] transition-colors hover:border-[#8A6E68] hover:text-[#8A6E68]"
                    >
                        <FiArrowLeft className="text-sm" />
                        Back to home
                        <FiArrowUpRight className="text-sm" />
                    </Link>
                </div>

                {/* Footer detail */}
                <div className="mt-14 border-t border-[#E5DDD5] pt-5">
                    <p className="font-serif text-sm italic text-[#A09790]">
                        Good spaces. Better beginnings.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Error;

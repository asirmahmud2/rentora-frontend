"use client";

import React from "react";
import Link from "next/link";

import { FiArrowUpRight, FiStar } from "react-icons/fi";

const CommentSection = () => {
    return (
        <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-14">
                <div>
                    <div className="mb-4 flex items-center gap-3">
                        <span className="h-px w-7 bg-[#8A6E68]" />

                        <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#8A6E68]">
                            05
                        </span>
                    </div>

                    <h2 className="font-serif text-2xl text-[#1A1A1A]">
                        Reviews
                    </h2>
                </div>

                <div>
                    <div className="flex flex-col gap-4 border-b border-[#1A1A1A]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="font-serif text-3xl text-[#1A1A1A]">
                                A place worth talking about.
                            </p>

                            <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.18em] text-[#A09A95]">
                                Tenant experiences
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <FiStar className="fill-[#8A6E68] text-[#8A6E68]" />

                            <span className="font-serif text-xl">—</span>
                        </div>
                    </div>

                    {/* Temporary empty review state */}
                    <div className="py-10">
                        <p className="font-serif text-lg text-[#6F6863]">
                            Reviews for this property will appear here after tenants
                            share their experience.
                        </p>

                        <Link
                            href="/login"
                            className="group mt-5 inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.18em] text-[#1A1A1A] transition hover:text-[#8A6E68]"
                        >
                            Sign in to continue
                            <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommentSection;

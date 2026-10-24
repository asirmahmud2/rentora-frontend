"use client";

import React from "react";
import Image from "next/image";
import { FiStar } from "react-icons/fi";

const formatDate = (date) =>
    date && !Number.isNaN(new Date(date).getTime())
        ? new Date(date).toLocaleDateString("en-BD", {
              day: "numeric",
              month: "short",
              year: "numeric",
          })
        : "";

// Five stars, filled up to `value`
const Stars = ({ value }) => (
    <div className="flex items-center gap-0.5 text-[#8A6E68]">
        {[1, 2, 3, 4, 5].map((n) => (
            <FiStar
                key={n}
                className={`text-sm ${n <= value ? "fill-current" : ""}`}
            />
        ))}
    </div>
);

// reviews: array of saved reviews, sent from the parent
const CommentSection = ({ reviews = [] }) => {
    const average = reviews.length
        ? (
              reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
              reviews.length
          ).toFixed(1)
        : null;

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

                            <span className="font-serif text-xl">
                                {average ?? "—"}
                            </span>

                            {reviews.length > 0 && (
                                <span className="text-xs text-[#99928C]">
                                    ({reviews.length})
                                </span>
                            )}
                        </div>
                    </div>

                    {reviews.length === 0 ? (
                        /* Empty state */
                        <div className="py-10">
                            <p className="font-serif text-lg text-[#6F6863]">
                                No reviews yet. Tenant reviews for this
                                property will appear here.
                            </p>
                        </div>
                    ) : (
                        /* Review cards */
                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            {reviews.map((review, index) => (
                                <article
                                    key={review._id || index}
                                    className="border border-[#1A1A1A]/10 bg-white p-6"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#EEE9E4] font-serif text-sm text-[#8A6E68]">
                                            {review.tenantPhoto ? (
                                                <Image
                                                    src={review.tenantPhoto}
                                                    alt={review.tenantName || "Tenant"}
                                                    fill
                                                    sizes="44px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                (review.tenantName || "T")
                                                    .charAt(0)
                                                    .toUpperCase()
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate font-serif text-lg">
                                                {review.tenantName || "Tenant"}
                                            </p>
                                            <p className="text-[11px] text-[#99928C]">
                                                {formatDate(review.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <Stars value={Number(review.rating || 0)} />
                                    </div>

                                    <p className="mt-3 whitespace-pre-wrap break-words font-serif text-base leading-7 text-[#5F5954]">
                                        {review.comment}
                                    </p>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CommentSection;
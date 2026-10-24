"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiHome, FiStar } from "react-icons/fi";

const ease = [0.22, 1, 0.36, 1];

const formatDate = (date) =>
    date && !Number.isNaN(new Date(date).getTime())
        ? new Date(date).toLocaleDateString("en-BD", {
              month: "short",
              year: "numeric",
          })
        : "";

// Five stars, filled up to `value`
const Stars = ({ value }) => (
    <div
        className="flex items-center gap-0.5 text-[#8A6E68]"
        aria-label={`${value} out of 5 stars`}
    >
        {[1, 2, 3, 4, 5].map((n) => (
            <FiStar
                key={n}
                className={`text-base ${n <= value ? "fill-current" : ""}`}
            />
        ))}
    </div>
);

const CustomerReviewsList = ({ reviews = [] }) => {
    return (
        <section className="bg-[#EEE9E4] py-20 lg:py-28">
            <div className="container mx-auto px-6 sm:px-10 lg:px-12">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease }}
                    className="mb-14 max-w-2xl"
                >
                    <div className="mb-5 flex items-center gap-4">
                        <span className="h-px w-12 bg-[#8A6E68]" />
                        <span className="text-[10px] uppercase tracking-[0.32em] text-[#8A6E68]">
                            Customer reviews
                        </span>
                    </div>

                    <h2 className="font-serif text-5xl leading-[0.98] tracking-[-0.03em] text-[#1A1A1A] sm:text-6xl">
                        Heard from
                        <span className="block italic text-[#8A6E68]">
                            people who stayed.
                        </span>
                    </h2>
                </motion.div>

                {/* Empty state */}
                {reviews.length === 0 ? (
                    <p className="border border-[#1A1A1A]/10 bg-[#FDFCF9] p-12 text-center font-serif text-2xl">
                        Tenant reviews will appear here.
                    </p>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {reviews.map((review, index) => (
                            <motion.article
                                key={review._id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.12,
                                    ease,
                                }}
                                className="flex flex-col border border-[#1A1A1A]/10 bg-[#FDFCF9] p-7"
                            >
                                <Stars value={Number(review.rating || 0)} />

                                {/* Comment */}
                                <p className="mt-5 line-clamp-6 flex-1 font-serif text-lg leading-8 text-[#383331]">
                                    “{review.comment}”
                                </p>

                                {/* Property */}
                                <p className="mt-6 flex items-center gap-2 text-xs text-[#77716C]">
                                    <FiHome className="shrink-0 text-[#8A6E68]" />
                                    <span className="truncate">
                                        {review.propertyTitle}
                                    </span>
                                </p>

                                {/* Reviewer */}
                                <div className="mt-5 flex items-center gap-3 border-t border-[#1A1A1A]/10 pt-5">
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
                                        <p className="truncate font-serif text-base">
                                            {review.tenantName || "Tenant"}
                                        </p>
                                        <p className="text-[11px] text-[#99928C]">
                                            {formatDate(review.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CustomerReviewsList;
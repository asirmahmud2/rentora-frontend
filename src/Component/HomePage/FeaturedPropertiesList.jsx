"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";

const ease = [0.22, 1, 0.36, 1];

const formatRent = (rent) => `৳${Number(rent || 0).toLocaleString("en-BD")}`;

const FeaturedPropertiesList = ({ properties = [], isLoggedIn }) => {
    return (
        <section className="relative overflow-hidden bg-[#FDFCF9] py-20 lg:py-28">
            {/* Big faded letter behind the heading */}
            <span className="pointer-events-none absolute -right-6 top-6 select-none font-serif text-[220px] leading-none text-[#EEE9E4] sm:text-[320px]">
                F
            </span>

            <div className="container relative mx-auto px-6 sm:px-10 lg:px-12">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease }}
                    className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div>
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-12 bg-[#8A6E68]" />
                            <span className="text-[10px] uppercase tracking-[0.32em] text-[#8A6E68]">
                                Featured collection
                            </span>
                        </div>

                        <h2 className="font-serif text-5xl leading-[0.98] tracking-[-0.03em] text-[#1A1A1A] sm:text-6xl lg:text-7xl">
                            Homes worth
                            <span className="block italic text-[#8A6E68]">a closer look.</span>
                        </h2>
                    </div>

                    <div className="max-w-sm lg:text-right">
                        <p className="text-sm leading-7 text-[#77716C]">
                            Six hand-picked, owner-approved properties ready
                            for your next move.
                        </p>

                        <Link
                            href="/properties"
                            className="group mt-5 inline-flex items-center gap-3 border-b border-[#8A6E68]/50 pb-2 text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A] transition-colors hover:border-[#8A6E68]"
                        >
                            View all properties
                            <FiArrowUpRight className="text-sm text-[#8A6E68] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </motion.div>

                {/* Empty state */}
                {properties.length === 0 ? (
                    <div className="border border-[#1A1A1A]/10 bg-white px-6 py-16 text-center">
                        <h3 className="font-serif text-3xl">
                            No properties <span className="italic text-[#8A6E68]">yet.</span>
                        </h3>
                        <p className="mt-3 text-sm text-[#77716C]">
                            Approved listings will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                        {properties.map((property, index) => {
                            // Logged out -> login page. Logged in -> details page.
                            const href = isLoggedIn
                                ? `/properties/${property._id}`
                                : "/login";

                            return (
                                <motion.article
                                    key={property._id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.9,
                                        delay: (index % 3) * 0.14,
                                        ease,
                                    }}
                                    whileHover={{ y: -6 }}
                                    className="group min-w-0"
                                >
                                    {/* Image */}
                                    <Link
                                        href={href}
                                        className="relative block aspect-[4/5] overflow-hidden bg-[#EEE9E4]"
                                    >
                                        {property.images?.[0] && (
                                            <Image
                                                src={property.images[0]}
                                                alt={property.title || "Property"}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                            />
                                        )}

                                        {/* Dark fade at the bottom so the price is readable */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#14100E]/75 via-transparent to-transparent" />

                                        {/* Number */}
                                        <span className="absolute left-5 top-5 font-serif text-lg text-white/90">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        {/* Type */}
                                        <span className="absolute right-5 top-5 bg-[#FDFCF9]/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#8A6E68] backdrop-blur-sm">
                                            {property.propertyType}
                                        </span>

                                        {/* Price on the image */}
                                        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                                            <p className="font-serif text-3xl leading-none">
                                                {formatRent(property.rent)}
                                                <span className="ml-1 text-[11px] uppercase tracking-[0.12em] text-white/70">
                                                    / {property.rentType}
                                                </span>
                                            </p>

                                            <span className="flex h-11 w-11 items-center justify-center bg-[#8A6E68] opacity-0 transition-all duration-500 group-hover:opacity-100">
                                                <FiArrowUpRight className="text-lg" />
                                            </span>
                                        </div>
                                    </Link>

                                    {/* Info */}
                                    <div className="pt-6">
                                        <h3 className="line-clamp-1 font-serif text-2xl text-[#1A1A1A]">
                                            {property.title}
                                        </h3>

                                        <p className="mt-2 flex items-center gap-2 text-sm text-[#77716D]">
                                            <FiMapPin className="shrink-0 text-[#8A6E68]" />
                                            <span className="truncate">
                                                {[property.location?.city, property.location?.country]
                                                    .filter(Boolean)
                                                    .join(", ")}
                                            </span>
                                        </p>

                                        <div className="mt-5 grid grid-cols-3 divide-x divide-[#1A1A1A]/10 border-y border-[#1A1A1A]/10 py-3 text-center">
                                            <div>
                                                <p className="font-serif text-lg">{property.bedrooms}</p>
                                                <p className="text-[10px] uppercase tracking-[0.14em] text-[#99928C]">Beds</p>
                                            </div>
                                            <div>
                                                <p className="font-serif text-lg">{property.bathrooms}</p>
                                                <p className="text-[10px] uppercase tracking-[0.14em] text-[#99928C]">Baths</p>
                                            </div>
                                            <div>
                                                <p className="font-serif text-lg">
                                                    {Number(property.propertySize || 0).toLocaleString()}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-[0.14em] text-[#99928C]">
                                                    {property.sizeUnit || "sqft"}
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href={href}
                                            className="group/btn mt-5 flex items-center justify-between bg-[#1A1A1A] px-5 py-4 text-[10px] uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-[#8A6E68]"
                                        >
                                            View Details
                                            <FiArrowUpRight className="text-base transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                                        </Link>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedPropertiesList;
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";

const ease = [0.22, 1, 0.36, 1];

// Put your three photos in the /public/locations folder
const locations = [
    {
        city: "Chittagong",
        tagline: "Hills, harbour and sea air in the port city.",
        image: "https://i.ibb.co.com/60XrJwCs/56b319dc-c540-45de-91f9-56ba60d5db1b.jpg",
        className: "lg:row-span-2 min-h-[420px] lg:min-h-[560px]",
    },
    {
        city: "Dhaka",
        tagline: "The capital, where every neighbourhood has its own pace.",
        image: "https://i.ibb.co.com/ccZF5vJM/58a6a70e-2953-4a14-b5e3-5cdaca7c14e1.jpg",
        className: "min-h-[300px]",
    },
    {
        city: "Sylhet",
        tagline: "Tea gardens and green hills in the north-east.",
        image: "https://i.ibb.co.com/HjwrL3L/36561c18-3616-4bcb-bf33-5f573cdaa3ee.jpg",
        className: "min-h-[300px]",
    },
];

const TopLocations = () => {
    return (
        <section className="bg-[#FDFCF9] py-20 lg:py-28">
            <div className="container mx-auto px-6 sm:px-10 lg:px-12">
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
                                Top locations
                            </span>
                        </div>

                        <h2 className="font-serif text-5xl leading-[0.98] tracking-[-0.03em] text-[#1A1A1A] sm:text-6xl lg:text-7xl">
                            Where people
                            <span className="block italic text-[#8A6E68]">
                                love to live.
                            </span>
                        </h2>
                    </div>

                    <div className="max-w-sm lg:text-right">
                        <p className="text-sm leading-7 text-[#77716C]">
                            Start with the cities tenants search for most, then
                            explore homes in the area that suits you.
                        </p>

                        <Link
                            href="/properties"
                            className="group mt-5 inline-flex items-center gap-3 border-b border-[#8A6E68]/50 pb-2 text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A] transition-colors hover:border-[#8A6E68]"
                        >
                            Browse all properties
                            <FiArrowUpRight className="text-sm text-[#8A6E68] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </motion.div>

                {/* Mosaic: one tall card on the left, two stacked on the right */}
                <div className="grid gap-5 lg:grid-cols-2 lg:grid-rows-2">
                    {locations.map((item, index) => (
                        <motion.div
                            key={item.city}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.9, delay: index * 0.14, ease }}
                            className={item.className}
                        >
                            {/* Clicking opens the properties page filtered by this city */}
                            <Link
                                href={`/properties?location=${encodeURIComponent(item.city)}`}
                                className="group relative block h-full min-h-[inherit] overflow-hidden bg-[#EEE9E4]"
                            >
                                <Image
                                    src={item.image}
                                    alt={`${item.city} skyline`}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                />

                                {/* Dark fade so the text stays readable */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#14100E]/80 via-[#14100E]/10 to-transparent" />

                                {/* Number */}
                                <span className="absolute left-6 top-6 font-serif text-lg text-white/90">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Text */}
                                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white sm:inset-x-8 sm:bottom-8">
                                    <div>
                                        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/75">
                                            <FiMapPin />
                                            Bangladesh
                                        </p>

                                        <h3 className="mt-2 font-serif text-4xl leading-none sm:text-5xl">
                                            {item.city}
                                        </h3>

                                        <p className="mt-3 max-w-xs text-sm leading-6 text-white/75">
                                            {item.tagline}
                                        </p>
                                    </div>

                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/50 transition-colors duration-500 group-hover:border-[#8A6E68] group-hover:bg-[#8A6E68]">
                                        <FiArrowUpRight className="text-xl" />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopLocations;
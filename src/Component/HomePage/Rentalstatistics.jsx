"use client";

import { useEffect, useRef, useState } from "react";
import {
    animate,
    motion,
    useInView,
    useReducedMotion,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const stats = [
    {
        value: 520,
        suffix: "+",
        label: "Approved properties",
        text: "Every listing is reviewed before it goes live.",
    },
    {
        value: 180,
        suffix: "+",
        label: "Registered owners",
        text: "Property owners who list and manage on RENTORA.",
    },
    {
        value: 2400,
        suffix: "+",
        label: "Bookings made",
        text: "Reservations paid securely through the platform.",
    },
    {
        value: 4.8,
        decimals: 1,
        suffix: "/5",
        label: "Average rating",
        text: "Based on reviews written by real tenants.",
    },
];

// Counts up from 0 when it scrolls into view
const Counter = ({ value, decimals = 0, suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const reduceMotion = useReducedMotion();

    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        // People who prefer less motion see the final number straight away
        if (reduceMotion) {
            setDisplay(value);
            return;
        }

        const controls = animate(0, value, {
            duration: 2.2,
            ease: "easeOut",
            onUpdate: (latest) => setDisplay(latest),
        });

        return () => controls.stop();
    }, [isInView, value, reduceMotion]);

    return (
        <span ref={ref}>
            {display.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })}
            <span className="text-[#D9B8AE]">{suffix}</span>
        </span>
    );
};

const RentalStatistics = () => {
    return (
        <section className="relative overflow-hidden bg-[#1A1A1A] py-20 text-white lg:py-28">
            {/* Faint decorative letter */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-10 select-none font-serif text-[260px] leading-none text-white/[0.04] sm:text-[380px]"
            >
                R
            </span>

            <div className="container relative mx-auto px-6 sm:px-10 lg:px-12">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease }}
                    className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div>
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-12 bg-[#D9B8AE]" />
                            <span className="text-[10px] uppercase tracking-[0.32em] text-[#D9B8AE]">
                                Rental statistics
                            </span>
                        </div>

                        <h2 className="font-serif text-5xl leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                            A marketplace
                            <span className="block italic text-[#D9B8AE]">
                                built on trust.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-sm text-sm leading-7 text-white/60 lg:text-right">
                        A quick look at how tenants and owners use RENTORA
                        every day.
                    </p>
                </motion.div>

                {/* Numbers */}
                <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.12,
                                ease,
                            }}
                            className="border-t border-white/20 pt-8"
                        >
                            <p className="font-serif text-6xl leading-none tracking-[-0.03em] sm:text-7xl">
                                <Counter
                                    value={item.value}
                                    decimals={item.decimals}
                                    suffix={item.suffix}
                                />
                            </p>

                            <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-[#D9B8AE]">
                                {item.label}
                            </p>

                            <p className="mt-3 max-w-[240px] text-sm leading-6 text-white/55">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RentalStatistics;
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    animate,
    motion,
    useMotionValue,
    useReducedMotion,
} from "framer-motion";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";

const ease = [0.22, 1, 0.36, 1];

const GAP = 28; // space between cards in px (same as gap-7)
const SPEED = 40; // how fast the cards slide, in px per second (lower = slower)

const formatRent = (rent) => `৳${Number(rent || 0).toLocaleString("en-BD")}`;

/* One property card. Used by both the sliding row and the static grid. */
const PropertyCard = ({ property, index, href, hidden = false, style }) => (
    <motion.article
        whileHover={{ y: -6 }}
        aria-hidden={hidden || undefined}
        style={style}
        className="group min-w-0"
    >
        {/* Image */}
        <Link
            href={href}
            tabIndex={hidden ? -1 : undefined}
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
                tabIndex={hidden ? -1 : undefined}
                className="group/btn mt-5 flex items-center justify-between bg-[#1A1A1A] px-5 py-4 text-[10px] uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-[#8A6E68]"
            >
                View Details
                <FiArrowUpRight className="text-base transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </Link>
        </div>
    </motion.article>
);

const FeaturedPropertiesList = ({ properties = [], isLoggedIn }) => {
    const reduceMotion = useReducedMotion();

    const viewportRef = useRef(null); // the visible window of the slider
    const controlsRef = useRef(null); // lets us pause and resume the slide
    const x = useMotionValue(0); // current sideways position of the track

    const [viewWidth, setViewWidth] = useState(0);

    // Slide only when there are more than 3 cards and motion is allowed.
    // Otherwise show a normal grid.
    const canSlide = properties.length > 3 && !reduceMotion;

    // How many cards fit in the window: 3 on large, 2 on medium, 1 on phones
    const perView = viewWidth >= 880 ? 3 : viewWidth >= 520 ? 2 : 1;
    const cardWidth = viewWidth
        ? (viewWidth - GAP * (perView - 1)) / perView
        : 340;

    // Width of ONE full set of cards. When the track has moved this far,
    // the second copy sits exactly where the first one started, so the loop is seamless.
    const loopWidth = properties.length * (cardWidth + GAP);

    // Measure the visible window (and re-measure when the screen changes size)
    useEffect(() => {
        const element = viewportRef.current;
        if (!element) return;

        const update = () => setViewWidth(element.clientWidth);
        update();

        const observer = new ResizeObserver(update);
        observer.observe(element);

        return () => observer.disconnect();
    }, [canSlide]);

    // Slide the track to the left forever
    useEffect(() => {
        if (!canSlide || !viewWidth) return;

        const controls = animate(x, [0, -loopWidth], {
            duration: loopWidth / SPEED,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
        });

        controlsRef.current = controls;

        return () => controls.stop();
    }, [canSlide, viewWidth, loopWidth, x]);

    const pause = () => controlsRef.current?.pause();
    const play = () => controlsRef.current?.play();

    // Logged out -> login page. Logged in -> details page.
    const getHref = (property) =>
        isLoggedIn ? `/properties/${property._id}` : "/login";

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
                ) : canSlide ? (
                    /* SLIDING ROW */
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.9, ease }}
                        ref={viewportRef}
                        // Pause while the mouse is over the cards or a card has keyboard focus
                        onMouseEnter={pause}
                        onMouseLeave={play}
                        onFocusCapture={pause}
                        onBlurCapture={play}
                        // The fade at both edges makes cards appear and disappear softly
                        className="overflow-hidden py-4 [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
                    >
                        <motion.div
                            style={{ x, gap: GAP }}
                            className="flex w-max"
                        >
                            {/* The list is shown twice so the loop never has a gap.
                                The second copy is hidden from screen readers. */}
                            {[...properties, ...properties].map((property, i) => {
                                const index = i % properties.length;
                                const isCopy = i >= properties.length;

                                return (
                                    <PropertyCard
                                        key={`${property._id}-${isCopy ? "copy" : "main"}`}
                                        property={property}
                                        index={index}
                                        href={getHref(property)}
                                        hidden={isCopy}
                                        style={{ width: cardWidth, flexShrink: 0 }}
                                    />
                                );
                            })}
                        </motion.div>
                    </motion.div>
                ) : (
                    /* STATIC GRID: used for 3 or fewer cards, or when the visitor
                       has turned on "reduce motion" in their system settings */
                    <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                        {properties.map((property, index) => (
                            <motion.div
                                key={property._id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.9,
                                    delay: (index % 3) * 0.14,
                                    ease,
                                }}
                            >
                                <PropertyCard
                                    property={property}
                                    index={index}
                                    href={getHref(property)}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedPropertiesList;
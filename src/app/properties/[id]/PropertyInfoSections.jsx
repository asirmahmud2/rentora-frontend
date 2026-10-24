import React from "react";
import Image from "next/image";
import { FiArrowUpRight, FiMail, FiMapPin, FiUser } from "react-icons/fi";

// Left-side heading used by every section
const SectionHeading = ({ number, title }) => (
    <div>
        <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-7 bg-[#8A6E68]" />
            <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#8A6E68]">
                {number}
            </span>
        </div>

        <h2 className="font-serif text-2xl">{title}</h2>
    </div>
);

const smallLabel =
    "font-sans text-[8px] uppercase tracking-[0.18em] text-[#A09A95]";

const PropertyInfoSections = ({ property }) => {
    const owner = property.ownerInformation;

    const overviewItems = [
        ["Location", property.location?.area],
        ["Property Type", property.propertyType],
        ["City", property.location?.city],
        ["Country", property.location?.country],
    ];

    return (
        <>
            {/* OVERVIEW */}
            <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
                <div className="grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-14">
                    <SectionHeading number="01" title="Overview" />

                    <div>
                        <p className="max-w-4xl font-serif text-xl leading-[1.55] text-[#383331] sm:text-2xl lg:text-3xl">
                            {property.description}
                        </p>

                        <div className="mt-10 grid gap-x-10 gap-y-6 border-t border-[#1A1A1A]/10 pt-7 sm:grid-cols-2 lg:grid-cols-4">
                            {overviewItems.map(([label, value]) => (
                                <div key={label}>
                                    <p className={smallLabel}>{label}</p>
                                    <p className="mt-2 font-serif text-base text-[#403B38]">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* AMENITIES */}
            <section className="border-y border-[#1A1A1A]/10 bg-[#EEE9E4]">
                <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
                    <div className="grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-14">
                        <SectionHeading number="02" title="Amenities" />

                        <div>
                            {property.amenities?.length > 0 ? (
                                <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {property.amenities.map((amenity, index) => (
                                        <div
                                            key={`${amenity}-${index}`}
                                            className="flex items-center gap-4 border-b border-[#1A1A1A]/[0.07] py-4"
                                        >
                                            <span className="font-sans text-[9px] tracking-[0.12em] text-[#8A6E68]">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            <span className="font-serif text-base text-[#403B38]">
                                                {amenity}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="font-serif text-base text-[#817A75]">
                                    No amenities have been listed.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
                <div className="grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-14">
                    <SectionHeading number="03" title="Features" />

                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="border-t border-[#1A1A1A]/10 pt-6">
                            <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                What stands out
                            </p>

                            <ul className="mt-5 space-y-4">
                                {property.extraFeatures?.length > 0 ? (
                                    property.extraFeatures.map((feature, index) => (
                                        <li
                                            key={`${feature}-${index}`}
                                            className="flex items-start gap-4"
                                        >
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#8A6E68]" />
                                            <span className="font-serif text-lg leading-7 text-[#403B38]">
                                                {feature}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="font-serif text-base text-[#817A75]">
                                        No additional features listed.
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Location block */}
                        <div className="relative overflow-hidden bg-[#EEE9E4] p-7 sm:p-8">
                            <span
                                aria-hidden="true"
                                className="absolute -bottom-12 -right-4 font-serif text-[180px] leading-none text-[#E4DCD6]"
                            >
                                R
                            </span>

                            <div className="relative z-10">
                                <FiMapPin className="text-xl text-[#8A6E68]" />

                                <p className="mt-6 font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                    Located in
                                </p>

                                <p className="mt-2 font-serif text-3xl leading-tight">
                                    {property.location?.area}
                                </p>

                                <p className="mt-2 font-serif text-base text-[#756E69]">
                                    {property.location?.city}, {property.location?.country}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OWNER */}
            <section className="border-y border-[#1A1A1A]/10 bg-[#EEE9E4]">
                <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-14">
                        <SectionHeading number="04" title="The Owner" />

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                                {/* Owner photo */}
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#E1DBD5]">
                                    {owner?.photo ? (
                                        <Image
                                            src={owner.photo}
                                            alt={owner.name || "Property owner"}
                                            fill
                                            sizes="80px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <FiUser className="text-2xl text-[#8A6E68]" />
                                        </div>
                                    )}
                                </div>

                                {/* Owner details */}
                                <div className="min-w-0">
                                    <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                        Property Owner
                                    </p>

                                    <h3 className="mt-2 font-serif text-2xl">
                                        {owner?.name || "RENTORA Owner"}
                                    </h3>

                                    {owner?.email && (
                                        <a
                                            href={`mailto:${owner.email}`}
                                            className="group mt-2 inline-flex items-center gap-2 break-all font-sans text-[9px] tracking-[0.08em] text-[#77716D] transition hover:text-[#8A6E68]"
                                        >
                                            <FiMail className="shrink-0" />
                                            {owner.email}
                                            <FiArrowUpRight className="text-xs transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Contact info */}
                            <div className="grid gap-4 border-t border-[#1A1A1A]/10 pt-5 sm:grid-cols-2">
                                <div>
                                    <p className={smallLabel}>Email</p>
                                    <p className="mt-2 break-all font-serif text-base text-[#403B38]">
                                        {owner?.email || "Not provided"}
                                    </p>
                                </div>

                                <div>
                                    <p className={smallLabel}>Phone</p>
                                    <p className="mt-2 font-serif text-base text-[#403B38]">
                                        {owner?.phone || "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PropertyInfoSections;
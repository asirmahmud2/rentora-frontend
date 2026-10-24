import Link from "next/link";
import {
    FiArrowUpRight,
    FiCompass,
    FiHeart,
    FiHome,
    FiSearch,
    FiShield,
    FiUsers,
} from "react-icons/fi";

const values = [
    {
        number: "01",
        title: "Thoughtful discovery",
        description:
            "Explore approved property listings with clear details about location, pricing, amenities, and the spaces themselves.",
        icon: FiSearch,
    },
    {
        number: "02",
        title: "A clearer process",
        description:
            "Understand your reservation, submit your preferred dates, complete checkout, and follow your booking status.",
        icon: FiCompass,
    },
    {
        number: "03",
        title: "Space for owners",
        description:
            "Manage property listings, review reservation requests, and keep track of your rental activity in one dashboard.",
        icon: FiHome,
    },
];

const principles = [
    {
        title: "Clarity over complexity",
        description:
            "Property details and booking information should be easy to understand, so people can make more informed decisions.",
    },
    {
        title: "Consideration for both sides",
        description:
            "Tenants need a place that fits their needs. Owners need practical tools to manage their properties and requests.",
    },
    {
        title: "A more organized journey",
        description:
            "From property moderation to reservation tracking, each step has a defined place within the RENTORA experience.",
    },
];

const AboutPage = () => {
    return (
        <main className="min-h-screen overflow-hidden bg-[#FDFCF9] text-[#1A1A1A]">

            {/* HERO */}
            <section className="border-b border-[#1A1A1A]/10">
                <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
                    <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-end">
                        <div>
                            <div className="mb-6 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#8A6E68]" />
                                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9B9690]">
                                    About RENTORA
                                </span>
                            </div>

                            <h1 className="max-w-5xl font-serif text-5xl leading-[0.96] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
                                More than
                                <br />
                                finding a
                                <span className="italic text-[#8A6E68]">
                                    {" "}property.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-xl text-sm leading-7 text-[#6F6A65] sm:text-base">
                                We bring tenants and property owners together
                                through a rental experience built around
                                thoughtful discovery, clearer information,
                                and a more organized booking journey.
                            </p>

                            <Link
                                href="/properties"
                                className="group mt-9 inline-flex items-center gap-5 bg-[#1A1A1A] px-6 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#8A6E68]"
                            >
                                Explore Properties
                                <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </div>

                        {/* Editorial statement */}
                        <div className="relative border-l border-[#8A6E68]/40 py-3 pl-6 lg:mb-2">
                            <span className="pointer-events-none absolute -right-2 -top-28 select-none font-serif text-[190px] leading-none text-[#EEE9E4]">
                                R
                            </span>

                            <div className="relative">
                                <FiHeart className="mb-6 text-xl text-[#8A6E68]" />

                                <p className="font-serif text-2xl leading-snug sm:text-3xl">
                                    Every place has a story.
                                    <span className="italic text-[#8A6E68]">
                                        {" "}Find yours.
                                    </span>
                                </p>

                                <p className="mt-4 text-xs leading-6 text-[#85807B]">
                                    A rental platform designed around the
                                    people who find, offer, and call a place home.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR STORY */}
            <section className="py-16 sm:py-20 lg:py-28">
                <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
                    <div>
                        <p className="mb-5 text-[9px] uppercase tracking-[0.25em] text-[#8A6E68]">
                            01 / Our Perspective
                        </p>

                        <h2 className="max-w-md font-serif text-4xl leading-tight tracking-[-0.025em] sm:text-5xl">
                            A place to begin
                            <span className="italic text-[#8A6E68]">
                                {" "}again.
                            </span>
                        </h2>
                    </div>

                    <div className="max-w-2xl">
                        <p className="font-serif text-2xl leading-relaxed text-[#393431] sm:text-3xl">
                            Finding a home is not just about rooms,
                            addresses, or monthly rent. It is about finding
                            a space where life can happen.
                        </p>

                        <p className="mt-6 text-sm leading-7 text-[#77716C]">
                            RENTORA is a property rental and booking platform
                            that connects people looking for a place to stay
                            with owners offering properties for rent. We bring
                            property discovery, reservation details, payment,
                            and booking management into one connected experience.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-[#77716C]">
                            Our approach is simple: make the important
                            information accessible, give tenants and owners
                            useful tools, and make each stage of the rental
                            journey easier to follow.
                        </p>

                        <div className="mt-9 flex items-center gap-4">
                            <span className="h-px w-10 bg-[#8A6E68]" />
                            <span className="font-serif text-sm italic text-[#8A6E68]">
                                A more considered way to rent.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT DEFINES US */}
            <section className="bg-[#EEE9E4] py-16 sm:py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 grid gap-6 md:grid-cols-[1fr_300px] md:items-end">
                        <div>
                            <p className="mb-5 text-[9px] uppercase tracking-[0.25em] text-[#8A6E68]">
                                02 / What Matters
                            </p>

                            <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                                Designed with
                                <span className="italic text-[#8A6E68]">
                                    {" "}purpose.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-sm text-xs leading-6 text-[#77716C]">
                            Every part of the experience serves a practical
                            purpose, from discovering a property to managing
                            a reservation.
                        </p>
                    </div>

                    <div className="grid border-y border-[#1A1A1A]/10 md:grid-cols-3">
                        {values.map((value, index) => {
                            const Icon = value.icon;

                            return (
                                <article
                                    key={value.number}
                                    className={`group py-8 md:px-7 md:py-10 ${
                                        index !== values.length - 1
                                            ? "border-b border-[#1A1A1A]/10 md:border-b-0 md:border-r"
                                            : ""
                                    } ${index === 0 ? "md:pl-0" : ""}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-serif text-3xl text-[#C9BFB7] transition-colors duration-300 group-hover:text-[#8A6E68]">
                                            {value.number}
                                        </span>

                                        <Icon className="text-xl text-[#8A6E68]" />
                                    </div>

                                    <h3 className="mt-9 font-serif text-2xl sm:text-3xl">
                                        {value.title}
                                    </h3>

                                    <p className="mt-4 max-w-sm text-xs leading-6 text-[#716A65]">
                                        {value.description}
                                    </p>

                                    <span className="mt-7 block h-px w-8 bg-[#8A6E68]/40 transition-all duration-300 group-hover:w-14" />
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FOR BOTH SIDES */}
            <section className="py-16 sm:py-20 lg:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <p className="mb-5 text-[9px] uppercase tracking-[0.25em] text-[#8A6E68]">
                            03 / Two Sides, One Platform
                        </p>

                        <h2 className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                            A better experience
                            <span className="italic text-[#8A6E68]">
                                {" "}for everyone.
                            </span>
                        </h2>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Tenant */}
                        <article className="border border-[#1A1A1A]/10 p-6 sm:p-9 lg:p-10">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] uppercase tracking-[0.22em] text-[#8A6E68]">
                                    For Tenants
                                </span>
                                <FiSearch className="text-xl text-[#8A6E68]" />
                            </div>

                            <h3 className="mt-8 font-serif text-3xl sm:text-4xl">
                                Find a place
                                <br />
                                that feels right.
                            </h3>

                            <p className="mt-5 max-w-md text-sm leading-7 text-[#77716C]">
                                Explore approved listings, compare rental
                                details, save your favorite properties, and
                                track reservation requests from your account.
                            </p>

                            <Link
                                href="/properties"
                                className="group mt-8 inline-flex items-center gap-3 border-b border-[#8A6E68]/40 pb-3 text-[9px] uppercase tracking-[0.18em] hover:border-[#8A6E68]"
                            >
                                Discover Homes
                                <FiArrowUpRight className="text-[#8A6E68] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </article>

                        {/* Owner */}
                        <article className="border border-[#1A1A1A]/10 bg-white p-6 sm:p-9 lg:p-10">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] uppercase tracking-[0.22em] text-[#8A6E68]">
                                    For Property Owners
                                </span>
                                <FiHome className="text-xl text-[#8A6E68]" />
                            </div>

                            <h3 className="mt-8 font-serif text-3xl sm:text-4xl">
                                Share your space.
                                <br />
                                Manage with ease.
                            </h3>

                            <p className="mt-5 max-w-md text-sm leading-7 text-[#77716C]">
                                Create property listings, submit them for
                                review, respond to booking requests, and
                                organize your portfolio through your owner
                                dashboard.
                            </p>

                            <Link
                                href="/register"
                                className="group mt-8 inline-flex items-center gap-3 border-b border-[#8A6E68]/40 pb-3 text-[9px] uppercase tracking-[0.18em] hover:border-[#8A6E68]"
                            >
                                Join as an Owner
                                <FiArrowUpRight className="text-[#8A6E68] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </article>
                    </div>
                </div>
            </section>

            {/* PRINCIPLES */}
            <section className="border-y border-[#1A1A1A]/10 bg-white py-16 sm:py-20 lg:py-24">
                <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-8">
                    <div>
                        <p className="mb-5 text-[9px] uppercase tracking-[0.25em] text-[#8A6E68]">
                            04 / Our Principles
                        </p>

                        <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
                            The way we
                            <span className="italic text-[#8A6E68]">
                                {" "}think.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-[#77716C]">
                            We believe a useful rental experience starts
                            with getting the fundamentals right.
                        </p>
                    </div>

                    <div className="divide-y divide-[#1A1A1A]/10 border-y border-[#1A1A1A]/10">
                        {principles.map((principle, index) => (
                            <article
                                key={principle.title}
                                className="grid gap-3 py-6 sm:grid-cols-[40px_1fr] sm:gap-5 sm:py-7"
                            >
                                <span className="text-[9px] tracking-[0.18em] text-[#8A6E68]">
                                    0{index + 1}
                                </span>

                                <div>
                                    <h3 className="font-serif text-2xl">
                                        {principle.title}
                                    </h3>

                                    <p className="mt-3 max-w-lg text-xs leading-6 text-[#77716C]">
                                        {principle.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-20 text-center sm:py-24 lg:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-[9px] uppercase tracking-[0.28em] text-[#8A6E68]">
                        This is where it begins
                    </p>

                    <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight tracking-[-0.025em] sm:text-5xl lg:text-7xl">
                        Your next chapter
                        <span className="block italic text-[#8A6E68]">
                            starts with a place.
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#77716C]">
                        Whether you are looking for a home or preparing to
                        list a property, RENTORA is a place to start.
                    </p>

                    <Link
                        href="/properties"
                        className="group mt-9 inline-flex items-center gap-5 bg-[#1A1A1A] px-7 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#8A6E68]"
                    >
                        Find Your Place
                        <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>

                    <p className="mt-12 font-serif text-sm italic text-[#A09A95]">
                        RENTORA — A place for new beginnings.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
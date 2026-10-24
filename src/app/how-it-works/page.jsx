import Link from "next/link";
import {
    FiArrowDownRight,
    FiArrowRight,
    FiArrowUpRight,
    FiCheckCircle,
    FiCreditCard,
    FiHome,
    FiKey,
    FiMapPin,
    FiSearch,
    FiShield,
} from "react-icons/fi";

const tenantSteps = [
    {
        number: "01",
        title: "Discover a place",
        description:
            "Explore approved properties, browse photos, compare prices, and find a location that fits your lifestyle.",
        icon: FiSearch,
    },
    {
        number: "02",
        title: "Find your match",
        description:
            "Review property details, amenities, room information, and rental terms before choosing your next home.",
        icon: FiMapPin,
    },
    {
        number: "03",
        title: "Book your stay",
        description:
            "Choose your move-in and move-out dates, provide your contact details, and complete the secure checkout.",
        icon: FiCreditCard,
    },
    {
        number: "04",
        title: "Settle in",
        description:
            "Track your reservation in your dashboard and follow its status as the property owner reviews your request.",
        icon: FiKey,
    },
];

const ownerSteps = [
    {
        number: "01",
        title: "List your property",
        description:
            "Add property details, location, rental price, amenities, and high-quality images.",
    },
    {
        number: "02",
        title: "Get reviewed",
        description:
            "Your listing starts as Pending and is reviewed by the RENTORA administration team.",
    },
    {
        number: "03",
        title: "Manage requests",
        description:
            "Review tenant booking information and choose to approve or reject reservation requests.",
    },
    {
        number: "04",
        title: "Manage your portfolio",
        description:
            "Keep your listings organized and monitor bookings and earnings from your owner dashboard.",
    },
];

const HowItWorks = () => {
    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">

            {/* HERO */}
            <section className="border-b border-[#1A1A1A]/10">
                <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
                    <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-end">
                        <div>
                            <div className="mb-6 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#8A6E68]" />
                                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9B9690]">
                                    The RENTORA Experience
                                </span>
                            </div>

                            <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.035em] sm:text-6xl lg:text-8xl">
                                A better way
                                <br />
                                to find your
                                <span className="italic text-[#8A6E68]">
                                    {" "}place.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-xl text-sm leading-7 text-[#6F6A65] sm:text-base">
                                From discovering the right property to
                                completing a reservation, RENTORA brings
                                tenants and property owners together through
                                a clear, considered rental experience.
                            </p>

                            <div className="mt-9 flex flex-wrap gap-3">
                                <Link
                                    href="/properties"
                                    className="group inline-flex items-center gap-4 bg-[#1A1A1A] px-6 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition hover:bg-[#8A6E68]"
                                >
                                    Explore Properties
                                    <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>

                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-4 border border-[#1A1A1A]/15 px-6 py-4 text-[9px] uppercase tracking-[0.2em] transition hover:border-[#8A6E68]"
                                >
                                    Join RENTORA
                                    <FiArrowRight className="text-[#8A6E68]" />
                                </Link>
                            </div>
                        </div>

                        <div className="border-l border-[#8A6E68]/40 pl-6 lg:pb-2">
                            <FiHome className="mb-5 text-2xl text-[#8A6E68]" />
                            <p className="font-serif text-2xl leading-snug">
                                One platform.
                                <br />
                                <span className="italic text-[#8A6E68]">
                                    Two journeys.
                                </span>
                            </p>
                            <p className="mt-3 text-xs leading-6 text-[#85807B]">
                                A simpler experience for finding homes and
                                managing rental properties.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TENANT JOURNEY */}
            <section className="py-16 sm:py-20 lg:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 grid gap-6 md:grid-cols-[1fr_280px] md:items-end">
                        <div>
                            <p className="mb-4 text-[9px] uppercase tracking-[0.25em] text-[#8A6E68]">
                                01 / For Tenants
                            </p>

                            <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                                From search
                                <span className="italic text-[#8A6E68]">
                                    {" "}to stay.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-sm text-xs leading-6 text-[#77716C]">
                            Your journey to a new home, organized into four
                            straightforward steps.
                        </p>
                    </div>

                    <div className="grid border-y border-[#1A1A1A]/10 sm:grid-cols-2 lg:grid-cols-4">
                        {tenantSteps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <article
                                    key={step.number}
                                    className={`group py-8 sm:px-6 sm:py-9 lg:px-7 ${
                                        index % 2 === 0
                                            ? "sm:border-r sm:border-[#1A1A1A]/10"
                                            : ""
                                    } ${
                                        index < 2
                                            ? "sm:border-b sm:border-[#1A1A1A]/10 lg:border-b-0"
                                            : ""
                                    } ${
                                        index !== 3
                                            ? "border-b border-[#1A1A1A]/10 lg:border-b-0 lg:border-r"
                                            : ""
                                    } ${
                                        index === 0
                                            ? "sm:pl-0 lg:pl-0"
                                            : ""
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-serif text-3xl text-[#D3CBC4] transition-colors group-hover:text-[#8A6E68]">
                                            {step.number}
                                        </span>

                                        <Icon className="text-lg text-[#8A6E68]" />
                                    </div>

                                    <h3 className="mt-8 font-serif text-2xl">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-xs leading-6 text-[#77716C]">
                                        {step.description}
                                    </p>

                                    <div className="mt-7 h-px w-8 bg-[#8A6E68]/40 transition-all duration-300 group-hover:w-14" />
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* PAYMENT AND TRUST */}
            <section className="bg-[#EEE9E4] py-14 sm:py-16 lg:py-20">
                <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
                    <div>
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-8 bg-[#8A6E68]" />
                            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8A6E68]">
                                Designed around trust
                            </span>
                        </div>

                        <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
                            Clarity at
                            <br />
                            every <span className="italic text-[#8A6E68]">step.</span>
                        </h2>

                        <p className="mt-5 max-w-md text-sm leading-7 text-[#6F6A65]">
                            Understand the property, review your reservation
                            details, and follow your booking status from your
                            own dashboard.
                        </p>
                    </div>

                    <div className="divide-y divide-[#1A1A1A]/10 border-y border-[#1A1A1A]/10">
                        <div className="flex gap-5 py-6">
                            <FiShield className="mt-1 shrink-0 text-xl text-[#8A6E68]" />
                            <div>
                                <h3 className="font-serif text-xl">
                                    Property review
                                </h3>
                                <p className="mt-2 text-xs leading-6 text-[#77716C]">
                                    New listings go through an admin review
                                    before appearing among approved properties.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5 py-6">
                            <FiCreditCard className="mt-1 shrink-0 text-xl text-[#8A6E68]" />
                            <div>
                                <h3 className="font-serif text-xl">
                                    Stripe checkout
                                </h3>
                                <p className="mt-2 text-xs leading-6 text-[#77716C]">
                                    Complete payment through the integrated
                                    Stripe checkout flow. Booking records
                                    should be confirmed against verified payment.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5 py-6">
                            <FiCheckCircle className="mt-1 shrink-0 text-xl text-[#8A6E68]" />
                            <div>
                                <h3 className="font-serif text-xl">
                                    Booking visibility
                                </h3>
                                <p className="mt-2 text-xs leading-6 text-[#77716C]">
                                    Track your reservation and its current
                                    status from your account dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OWNER JOURNEY */}
            <section className="py-16 sm:py-20 lg:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                        <div>
                            <p className="mb-4 text-[9px] uppercase tracking-[0.25em] text-[#8A6E68]">
                                02 / For Property Owners
                            </p>

                            <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                                Your property.
                                <br />
                                Your <span className="italic text-[#8A6E68]">potential.</span>
                            </h2>

                            <p className="mt-6 max-w-md text-sm leading-7 text-[#77716C]">
                                Put your property in front of prospective
                                tenants and manage your listings and booking
                                requests from one dedicated dashboard.
                            </p>

                            <Link
                                href="/register"
                                className="group mt-8 inline-flex items-center gap-4 border-b border-[#8A6E68]/40 pb-3 text-[9px] uppercase tracking-[0.2em] transition hover:border-[#8A6E68]"
                            >
                                Become an Owner
                                <FiArrowUpRight className="text-[#8A6E68] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </div>

                        <div className="border-t border-[#1A1A1A]/10">
                            {ownerSteps.map((step) => (
                                <article
                                    key={step.number}
                                    className="group grid grid-cols-[44px_1fr] gap-4 border-b border-[#1A1A1A]/10 py-6 sm:grid-cols-[60px_1fr_auto] sm:gap-6 sm:py-7"
                                >
                                    <span className="pt-1 font-sans text-[10px] tracking-[0.15em] text-[#8A6E68]/70">
                                        {step.number}
                                    </span>

                                    <div>
                                        <h3 className="font-serif text-2xl transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                                            {step.title}
                                        </h3>

                                        <p className="mt-2 max-w-lg text-xs leading-6 text-[#77716C]">
                                            {step.description}
                                        </p>
                                    </div>

                                    <FiArrowDownRight className="mt-2 hidden text-lg text-[#8A6E68] sm:block" />
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="border-t border-[#1A1A1A]/10 bg-white">
                <div className="container mx-auto px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                    <p className="text-[9px] uppercase tracking-[0.28em] text-[#8A6E68]">
                        Your next chapter starts here
                    </p>

                    <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                        Find a place worth
                        <span className="italic text-[#8A6E68]">
                            {" "}coming home to.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#77716C]">
                        Explore available properties and take the next step
                        toward a place that feels right.
                    </p>

                    <Link
                        href="/properties"
                        className="group mt-8 inline-flex items-center gap-5 bg-[#1A1A1A] px-7 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#8A6E68]"
                    >
                        Discover Properties
                        <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default HowItWorks;
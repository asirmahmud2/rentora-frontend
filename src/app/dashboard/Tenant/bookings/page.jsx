import Link from "next/link";
import Image from "next/image";
import {
    FiArrowUpRight,
    FiCalendar,
    FiChevronRight,
    FiClock,
    FiMapPin,
} from "react-icons/fi";
import { getUserBooking } from "@/app/Server/Actions/booking";
import { getProperty } from "@/app/Server/api/mutation";
import { getUser } from "@/lib/getUser";

const tabs = ["All", "Pending", "Approved", "Rejected"];

const statusColor = {
    Pending: "#8A6E68",
    Approved: "#5B6D5B",
    Rejected: "#9A6660",
};

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-BD", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

const formatPrice = (amount) => `৳${Number(amount).toLocaleString("en-BD")}`;

const MyBooking = async ({ searchParams }) => {
    const { status = "All" } = await searchParams;
    const user = await getUser();
    const userId = user?.id;
    const filtered = await getUserBooking(status);
    console.log("MyBooking -> filtered", filtered);
    const allBookings = await getUserBooking("All");
    console.log("MyBooking -> allBookings", allBookings);

    // Attach the property to each booking
    const bookings = await Promise.all(
        filtered.map(async (booking) => {
            const [property] = await getProperty(booking.propertyId);
            return { ...booking, property };
        })
    );

    const count = (tab) =>
        tab === "All"
            ? allBookings.length
            : allBookings.filter((b) => b.bookingStatus === tab).length;

    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                {/* Header */}
                <section className="border-b border-[#1A1A1A]/10 pb-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
                            <div className="mb-5 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#8A6E68]" />
                                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#9B9690]">
                                    Tenant / Bookings
                                </span>
                            </div>

                            <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                                Your
                                <span className="italic text-[#8A6E68]"> reservations.</span>
                            </h1>

                            <p className="mt-6 max-w-xl font-sans text-sm leading-7 text-[#6F6A65]">
                                Keep track of your property reservations, booking
                                status, move-in dates and payment information.
                            </p>
                        </div>

                        <div className="flex gap-8 border-l border-[#1A1A1A]/10 pl-6 lg:min-w-[230px]">
                            {[
                                ["Total", count("All")],
                                ["Approved", count("Approved")],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#9B9690]">
                                        {label}
                                    </p>
                                    <p className="mt-2 font-serif text-4xl">{value || "—"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Status tabs */}
                <section className="border-b border-[#1A1A1A]/10 py-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <nav className="flex flex-wrap gap-x-6 gap-y-3">
                            {tabs.map((tab) => {
                                const active = tab === status;
                                return (
                                    <Link
                                        key={tab}
                                        href={tab === "All" ? "?" : `?status=${tab}`}
                                        className={`relative pb-2 font-sans text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                                            active
                                                ? "text-[#1A1A1A]"
                                                : "text-[#96918C] hover:text-[#1A1A1A]"
                                        }`}
                                    >
                                        {tab}
                                        <span className="ml-2 text-[#8A6E68]">{count(tab)}</span>
                                        {active && (
                                            <span className="absolute bottom-0 left-0 h-px w-full bg-[#8A6E68]" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-3">
                            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#A09A95]">
                                Showing
                            </span>
                            <span className="font-serif text-lg">
                                {bookings.length === 0
                                    ? "No reservations"
                                    : `${bookings.length} reservation${bookings.length > 1 ? "s" : ""}`}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Booking list */}
                <section className="py-10 lg:py-14">
                    {bookings.length > 0 ? (
                        <div className="space-y-5">
                            {bookings.map((booking) => {
                                const { property } = booking;
                                const color = statusColor[booking.bookingStatus] ?? statusColor.Pending;
                                const { area, city } = property?.location ?? {};

                                return (
                                    <article
                                        key={booking._id}
                                        className="group border border-[#1A1A1A]/10 bg-white transition-all duration-500 hover:border-[#8A6E68]/40"
                                    >
                                        <div className="grid lg:grid-cols-[280px_1fr_auto]">
                                            {/* Image */}
                                            <div className="relative aspect-[4/3] overflow-hidden bg-[#EEE9E4] lg:aspect-auto lg:min-h-[220px]">
                                                {property?.images?.[0] && (
                                                    <Image
                                                        src={property.images[0]}
                                                        alt={property.title}
                                                        fill
                                                        sizes="(max-width: 1024px) 100vw, 280px"
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                )}

                                                <span
                                                    style={{ color }}
                                                    className="absolute left-4 top-4 inline-flex items-center gap-2 bg-white/95 px-3 py-2 font-sans text-[9px] uppercase tracking-[0.16em]"
                                                >
                                                    <span
                                                        style={{ backgroundColor: color }}
                                                        className="h-1.5 w-1.5 rounded-full"
                                                    />
                                                    {booking.bookingStatus}
                                                </span>
                                            </div>

                                            {/* Info */}
                                            <div className="flex flex-col justify-between p-6 sm:p-7 lg:p-8">
                                                <div>
                                                    <p className="mb-4 font-sans text-[9px] uppercase tracking-[0.2em] text-[#AAA49F]">
                                                        Ref · <span className="text-[#8A6E68]">{String(booking._id).slice(-6)}</span>
                                                    </p>

                                                    <h2 className="font-serif text-2xl leading-tight sm:text-3xl">
                                                        {property?.title ?? "Property unavailable"}
                                                    </h2>

                                                    <div className="mt-3 flex items-center gap-2 text-[#77716C]">
                                                        <FiMapPin className="text-sm" />
                                                        <span className="font-sans text-xs">
                                                            {[area, city].filter(Boolean).join(", ")}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-8 grid grid-cols-2 gap-5 border-t border-[#1A1A1A]/10 pt-6 sm:grid-cols-4">
                                                    <div>
                                                        <p className="mb-2 flex items-center gap-2 font-sans text-[8px] uppercase tracking-[0.16em] text-[#A19B96]">
                                                            <FiCalendar className="text-xs" /> Move-in
                                                        </p>
                                                        <p className="font-sans text-xs text-[#34312F]">
                                                            {formatDate(booking.moveInDate)}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="mb-2 flex items-center gap-2 font-sans text-[8px] uppercase tracking-[0.16em] text-[#A19B96]">
                                                            <FiCalendar className="text-xs" /> Move-out
                                                        </p>
                                                        <p className="font-sans text-xs text-[#34312F]">
                                                            {formatDate(booking.moveOutDate)}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="mb-2 font-sans text-[8px] uppercase tracking-[0.16em] text-[#A19B96]">
                                                            Total paid
                                                        </p>
                                                        <p className="font-serif text-lg">
                                                            {formatPrice(booking.totalAmount)}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="mb-2 flex items-center gap-2 font-sans text-[8px] uppercase tracking-[0.16em] text-[#A19B96]">
                                                            <FiClock className="text-xs" /> Booked
                                                        </p>
                                                        <p className="font-sans text-xs text-[#34312F]">
                                                            {formatDate(booking.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action */}
                                            <div className="flex items-center border-t border-[#1A1A1A]/10 p-5 lg:border-l lg:border-t-0 lg:p-7">
                                                <Link
                                                    href={`/dashboard/Tenant/bookings/${booking._id}`}
                                                    className="group/action flex w-full items-center justify-between gap-5 border border-[#1A1A1A]/10 px-5 py-4 transition-all duration-300 hover:border-[#8A6E68] hover:bg-[#F8F5F1] lg:w-auto"
                                                >
                                                    <span className="font-sans text-[9px] uppercase tracking-[0.18em]">
                                                        View Details
                                                    </span>
                                                    <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        /* Empty state */
                        <div className="relative overflow-hidden border border-[#1A1A1A]/10 bg-white px-6 py-20 sm:px-10 lg:px-20 lg:py-28">
                            <span className="pointer-events-none absolute -right-3 -top-12 select-none font-serif text-[220px] leading-none text-[#EEEAE6] sm:text-[280px]">
                                R
                            </span>

                            <div className="relative max-w-2xl">
                                <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                                    {status === "All" ? "Nothing reserved," : `No ${status.toLowerCase()} bookings,`}
                                    <span className="italic text-[#8A6E68]"> yet.</span>
                                </h2>

                                <p className="mt-6 max-w-lg font-sans text-sm leading-7 text-[#716C67]">
                                    Your booked properties will appear here once you
                                    make a reservation. Explore available homes and
                                    find a place that feels right.
                                </p>

                                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                                    <Link
                                        href="/properties"
                                        className="group inline-flex items-center justify-center gap-5 bg-[#1A1A1A] px-6 py-4 font-sans text-[9px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#8A6E68]"
                                    >
                                        Explore Properties
                                        <FiArrowUpRight className="text-sm" />
                                    </Link>

                                    <Link
                                        href="/dashboard/Tenant/favorites"
                                        className="group inline-flex items-center justify-center gap-3 border border-[#1A1A1A]/10 px-6 py-4 font-sans text-[9px] uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#8A6E68]"
                                    >
                                        View Favorites
                                        <FiChevronRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default MyBooking;
import Link from "next/link";
import { redirect } from "next/navigation";
import {
    FiArrowUpRight,
    FiCalendar,
    FiCheck,
    FiCreditCard,
    FiFileText,
    FiMapPin,
} from "react-icons/fi";
import { stripe } from "@/lib/stripe";
import { AddBooking } from "@/app/Server/Actions/booking";
import { getProperty } from "@/app/Server/api/mutation";

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

const formatPrice = (amount) => `৳${Number(amount).toLocaleString("en-BD")}`;

const PaymentSuccessful = async ({ searchParams }) => {
    const { session_id } = await searchParams;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
        redirect(`/payment/cancel?session_id=${session_id}`);
    }

    const totalAmount = session.amount_total / 100; // BDT has 2 decimals
    const { propertyId, moveInDate, moveOutDate } = session.metadata;

    const [property] = await getProperty(propertyId);
    const res = await AddBooking({ sessionId: session.id, totalAmount, ...session.metadata });
    console.log("AddBooking:", res.status, res.data);

    const { area, city, country } = property.location;
    const location = [area, city, country].filter(Boolean).join(", ");

    const details = [
        { icon: FiCalendar, label: "Move-in date", value: formatDate(moveInDate) },
        { icon: FiCalendar, label: "Move-out date", value: formatDate(moveOutDate) },
        { icon: FiCreditCard, label: "Amount paid", value: formatPrice(totalAmount) },
        { icon: FiFileText, label: "Booking reference", value: res.data._id ?? session.id },
    ];

    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">
            <header className="border-b border-[#1A1A1A]/10">
                <div className="container mx-auto flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
                    <Link href="/" className="font-serif text-2xl tracking-[0.12em]">
                        RENTORA
                    </Link>
                    <span className="font-sans text-[8px] uppercase tracking-[0.24em] text-[#99928C] sm:text-[9px]">
                        Booking Confirmation
                    </span>
                </div>
            </header>

            <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                {/* Success header */}
                <section className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#8A6E68]/25 bg-[#EEE9E4]">
                        <FiCheck className="text-2xl text-[#8A6E68]" strokeWidth={1.5} />
                    </div>

                    <h1 className="mt-8 font-serif text-5xl leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                        Thank you.
                        <span className="block italic text-[#8A6E68]">Payment received.</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-lg font-sans text-sm leading-7 text-[#77716C]">
                        {res.ok
                            ? "Your booking is confirmed. The details are below."
                            : "Your payment went through, but we couldn't save your booking. Please contact support with the reference below."}
                    </p>
                </section>

                {/* Reservation summary */}
                <section className="mt-12 border border-[#1A1A1A]/10">
                    <div className="p-5 sm:p-7">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#1A1A1A]/10 bg-[#EEE9E4]">
                                <FiMapPin className="text-lg text-[#8A6E68]" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#99928C]">
                                    Property
                                </p>
                                <h2 className="mt-2 font-serif text-xl sm:text-2xl">
                                    {property.title}
                                </h2>
                                <p className="mt-2 font-sans text-xs text-[#77716C]">{location}</p>
                            </div>
                        </div>

                        <div className="mt-7 grid grid-cols-1 gap-5 border-t border-[#1A1A1A]/10 pt-6 sm:grid-cols-2">
                            {details.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <Icon className="mt-1 shrink-0 text-sm text-[#8A6E68]" />
                                    <div className="min-w-0">
                                        <p className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#99928C]">
                                            {label}
                                        </p>
                                        <p className="mt-2 break-all font-sans text-sm text-[#33302D]">
                                            {value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#1A1A1A]/10 bg-[#EEE9E4]/60 px-5 py-5 sm:px-7">
                        <p className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#77716C]">
                            Total paid
                        </p>
                        <p className="font-serif text-3xl">{formatPrice(totalAmount)}</p>
                    </div>
                </section>

                {/* Actions */}
                <section className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/dashboard/tenant/bookings"
                        className="group inline-flex items-center justify-center gap-4 bg-[#1A1A1A] px-7 py-4 font-sans text-[9px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#8A6E68]"
                    >
                        View My Bookings
                        <FiArrowUpRight className="text-sm" />
                    </Link>

                    <Link
                        href="/properties"
                        className="group inline-flex items-center justify-center gap-4 border border-[#1A1A1A]/15 px-7 py-4 font-sans text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-[#8A6E68] hover:bg-[#F8F5F1]"
                    >
                        Explore Properties
                        <FiArrowUpRight className="text-sm" />
                    </Link>
                </section>
            </div>
        </main>
    );
};

export default PaymentSuccessful;
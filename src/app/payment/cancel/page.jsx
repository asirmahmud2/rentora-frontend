import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight, FiShield, FiX } from "react-icons/fi";
import { stripe } from "@/lib/stripe";

const PaymentCancel = async ({ searchParams }) => {
    const { session_id } = await searchParams;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const propertyHref = `/properties/${session.metadata.propertyId}`;

    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">
            <header className="border-b border-[#1A1A1A]/10">
                <div className="container mx-auto flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
                    <Link href="/" className="font-serif text-2xl tracking-[0.12em]">
                        RENTORA
                    </Link>
                    <span className="font-sans text-[8px] uppercase tracking-[0.24em] text-[#99928C] sm:text-[9px]">
                        Payment Cancelled
                    </span>
                </div>
            </header>

            <div className="container mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#1A1A1A]/15 bg-[#EEE9E4]">
                    <FiX className="text-2xl text-[#8A6E68]" strokeWidth={1.5} />
                </div>

                <h1 className="mt-8 font-serif text-5xl leading-[1.02] tracking-[-0.035em] sm:text-6xl">
                    Payment cancelled.
                    <span className="block italic text-[#8A6E68]">No worries.</span>
                </h1>

                <p className="mx-auto mt-6 max-w-md font-sans text-sm leading-7 text-[#77716C]">
                    Your booking was not completed and you have not been charged.
                    The property is still available, so you can try again whenever
                    you're ready.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href={propertyHref}
                        className="group inline-flex items-center justify-center gap-4 bg-[#1A1A1A] px-7 py-4 font-sans text-[9px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#8A6E68]"
                    >
                        Back to Property
                        <FiArrowUpRight className="text-sm" />
                    </Link>

                    <Link
                        href="/properties"
                        className="group inline-flex items-center justify-center gap-4 border border-[#1A1A1A]/15 px-7 py-4 font-sans text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-[#8A6E68] hover:bg-[#F8F5F1]"
                    >
                        <FiArrowLeft className="text-sm" />
                        All Properties
                    </Link>
                </div>

                <div className="mx-auto mt-12 flex max-w-sm items-start gap-3 border-t border-[#1A1A1A]/10 pt-6 text-left">
                    <FiShield className="mt-0.5 shrink-0 text-sm text-[#8A6E68]" />
                    <p className="font-sans text-[10px] leading-5 text-[#817A75]">
                        Payments are processed securely by Stripe. If you were charged
                        by mistake, contact support with your checkout reference.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default PaymentCancel;
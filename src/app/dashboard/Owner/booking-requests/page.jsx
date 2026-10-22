import BookingRequestsTable from "./BookingRequestsTable";
import { getUserBooking } from "@/app/Server/Actions/booking";
import { getProperty } from "@/app/Server/api/mutation";

const BookingRequest = async () => {
    const result = await getUserBooking();
    const list = Array.isArray(result) ? result : [];
    const errorMessage = Array.isArray(result)
        ? ""
        : "Could not load booking requests. Please try again.";

    // Attach the property to each booking
    const bookings = await Promise.all(
        list.map(async (booking) => {
            const [property] = await getProperty(booking.propertyId);
            return { ...booking, property: property ?? null };
        })
    );

    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                {/* Header */}
                <section className="border-b border-[#1A1A1A]/10 pb-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
                            <div className="mb-5 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#8A6E68]" />
                                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9B9690]">
                                    Owner / Booking Requests
                                </span>
                            </div>

                            <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                                Your properties,
                                <span className="italic text-[#8A6E68]"> their next home.</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-sm leading-7 text-[#6F6A65]">
                                Review tenant reservations, check their stay
                                details, and decide which requests to approve.
                            </p>
                        </div>

                        <div className="border-l border-[#1A1A1A]/10 pl-6 lg:min-w-[180px]">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#9B9690]">
                                Total Requests
                            </p>
                            <p className="mt-3 font-serif text-5xl leading-none">
                                {bookings.length}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Requests */}
                <section className="py-10 lg:py-14">
                    {errorMessage ? (
                        <div className="border border-[#8A6E68]/30 bg-white p-6 text-sm text-[#694D48]">
                            {errorMessage}
                        </div>
                    ) : (
                        <BookingRequestsTable bookings={bookings} />
                    )}
                </section>
            </div>
        </main>
    );
};

export default BookingRequest;
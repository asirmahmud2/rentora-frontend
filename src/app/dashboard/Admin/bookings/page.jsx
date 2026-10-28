import AdminBookingsTable from "./AdminBookingsTable";
import { getUserBooking } from "@/app/Server/Actions/booking";
import { getProperty } from "@/app/Server/api/mutation";

const AdminBookings = async () => {
    const result = await getUserBooking();
    const list = Array.isArray(result) ? result : [];
    const errorMessage = Array.isArray(result)
        ? ""
        : "Could not load bookings. Please try again.";

    // Attach the property to each booking
    const bookings = await Promise.all(
        list.map(async (booking) => {
            const [property] = await getProperty(booking.propertyId);
            return { ...booking, property: property ?? null };
        })
    );

    const count = (status) =>
        bookings.filter((b) => b.bookingStatus === status).length;

    const stats = [
        { label: "Pending", value: count("Pending") },
        { label: "Approved", value: count("Approved") },
        { label: "Rejected", value: count("Rejected") },
    ];

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
                                    Administration / Bookings
                                </span>
                            </div>

                            <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                                Every reservation,
                                <span className="italic text-[#8A6E68]"> in view.</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-sm leading-7 text-[#6F6A65]">
                                Monitor booking activity across RENTORA.
                                Review reservation status, payments, tenants,
                                and property owners.
                            </p>
                        </div>

                        <div className="border-l border-[#1A1A1A]/10 pl-6 lg:min-w-[170px]">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#9B9690]">
                                Total Bookings
                            </p>
                            <p className="mt-3 font-serif text-5xl">{bookings.length}</p>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="grid grid-cols-3 border-b border-[#1A1A1A]/10 py-8">
                    {stats.map((item, index) => (
                        <div
                            key={item.label}
                            className={`px-4 first:pl-0 sm:px-7 ${index !== stats.length - 1 ? "border-r border-[#1A1A1A]/10" : ""
                                }`}
                        >
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#9B9690]">
                                {item.label}
                            </p>
                            <p className="mt-3 font-serif text-3xl sm:text-4xl">{item.value}</p>
                        </div>
                    ))}
                </section>

                {/* Bookings */}
                <section className="py-10 lg:py-14">
                    <div className="mb-8">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="text-[9px] tracking-[0.2em] text-[#8A6E68]">01</span>
                            <span className="h-px w-7 bg-[#1A1A1A]/10" />
                            <span className="text-[9px] uppercase tracking-[0.22em] text-[#9B9690]">
                                Booking Records
                            </span>
                        </div>

                        <h2 className="font-serif text-4xl sm:text-5xl">
                            All <span className="italic text-[#8A6E68]">bookings.</span>
                        </h2>
                    </div>

                    {errorMessage ? (
                        <div role="alert" className="border border-[#8A6E68]/30 bg-white p-6 text-sm text-[#694D48]">
                            {errorMessage}
                        </div>
                    ) : (
                        <AdminBookingsTable bookings={bookings} />
                    )}
                </section>

                {/* Footer */}
                <footer className="border-t border-[#1A1A1A]/10 pt-8">
                    <div className="flex flex-col gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#A09A95]">
                            RENTORA / Booking Management
                        </p>
                        <p className="font-serif text-sm italic text-[#85807B]">
                            Every reservation, accounted for.
                        </p>
                    </div>
                </footer>
            </div>
        </main>
    );
};

export default AdminBookings;
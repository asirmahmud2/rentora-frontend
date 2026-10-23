"use client";

import { useState } from "react";
import Image from "next/image";
import { FiEye, FiFileText, FiMapPin, FiX } from "react-icons/fi";

const tabs = ["All", "Pending", "Approved", "Rejected"];

const colors = {
    Pending: "bg-[#F7F3ED] text-[#8A6E68]",
    Approved: "bg-[#F0F4EF] text-[#5B6D5B]",
    Rejected: "bg-[#FBF1EF] text-[#9A6660]",
};

const formatDate = (date) =>
    date && !Number.isNaN(new Date(date).getTime())
        ? new Date(date).toLocaleDateString("en-BD", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "—";

const formatPrice = (amount) =>
    amount == null ? "—" : `৳${Number(amount).toLocaleString("en-BD")}`;

const getLocation = (property) =>
    [property?.location?.city, property?.location?.country].filter(Boolean).join(", ") || "—";

const StatusBadge = ({ status }) => (
    <span
        className={`inline-flex items-center gap-2 whitespace-nowrap px-3 py-2 text-[10px] uppercase tracking-[0.12em] ${
            colors[status] || colors.Pending
        }`}
    >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {status || "Pending"}
    </span>
);

const DetailsModal = ({ booking, onClose }) => {
    const p = booking.property;
    const owner = p?.ownerInformation;

    const fields = [
        ["Move-in", formatDate(booking.moveInDate)],
        ["Move-out", formatDate(booking.moveOutDate)],
        ["Booked on", formatDate(booking.createdAt)],
        ["Contact", booking.contactNumber || "—"],
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6"
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                role="dialog"
                aria-modal="true"
                className="max-h-full w-full max-w-lg overflow-y-auto bg-[#FDFCF9] p-6 sm:p-7"
            >
                <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-5">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#9B9690]">
                            Booking · {String(booking._id).slice(-6)}
                        </p>
                        <h2 className="mt-2 font-serif text-2xl">Reservation details</h2>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close" className="text-[#77716C] hover:text-[#8A6E68]">
                        <FiX />
                    </button>
                </div>

                <div className="mt-5 space-y-5">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#9B9690]">Property</p>
                        <p className="mt-1 font-serif text-lg">{p?.title || "Property unavailable"}</p>
                        <p className="mt-1 flex items-center gap-2 text-xs text-[#77716C]">
                            <FiMapPin /> {getLocation(p)}
                        </p>
                    </div>

                    <div className="border-t border-[#1A1A1A]/10 pt-5">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#9B9690]">Owner</p>
                        <p className="mt-1 text-sm">{owner?.name || "—"}</p>
                        <p className="mt-1 break-all text-xs text-[#77716C]">{owner?.email || "—"}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-y border-[#1A1A1A]/10 py-5">
                        {fields.map(([label, value]) => (
                            <div key={label}>
                                <p className="text-[10px] uppercase tracking-[0.16em] text-[#9B9690]">{label}</p>
                                <p className="mt-1 text-sm">{value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.16em] text-[#9B9690]">Amount paid</p>
                            <p className="mt-1 font-serif text-2xl">{formatPrice(booking.totalAmount)}</p>
                        </div>
                        <StatusBadge status={booking.bookingStatus} />
                    </div>

                    {booking.notes && (
                        <div className="border-l-2 border-[#8A6E68]/40 bg-white px-4 py-3">
                            <p className="text-[10px] uppercase tracking-[0.18em] text-[#9B9690]">Tenant note</p>
                            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-[#6F6A65]">
                                {booking.notes}
                            </p>
                        </div>
                    )}

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#9B9690]">Stripe session</p>
                        <p className="mt-1 break-all text-xs text-[#6F6A65]">{booking.sessionId || "—"}</p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 w-full bg-[#1A1A1A] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-white transition hover:bg-[#8A6E68]"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const AdminBookingsTable = ({ bookings = [] }) => {
    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);

    const count = (tab) =>
        tab === "All"
            ? bookings.length
            : bookings.filter((b) => b.bookingStatus === tab).length;

    const query = search.trim().toLowerCase();

    const shown = bookings.filter((b) => {
        if (activeTab !== "All" && b.bookingStatus !== activeTab) return false;

        const text = [
            b._id,
            b.contactNumber,
            b.property?.title,
            b.property?.ownerInformation?.name,
            b.property?.ownerInformation?.email,
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return text.includes(query);
    });

    return (
        <>
            {/* Tabs + search */}
            <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-[#1A1A1A]/10">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`relative pb-3 text-[10px] uppercase tracking-[0.18em] ${
                                activeTab === tab
                                    ? "text-[#1A1A1A]"
                                    : "text-[#99928C] hover:text-[#1A1A1A]"
                            }`}
                        >
                            {tab}
                            <span className="ml-2 text-[#8A6E68]">{count(tab)}</span>
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 h-px w-full bg-[#8A6E68]" />
                            )}
                        </button>
                    ))}
                </div>

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search property, owner, phone..."
                    aria-label="Search bookings"
                    className="h-11 w-full border border-[#1A1A1A]/15 bg-white px-4 text-xs outline-none transition focus:border-[#8A6E68] lg:max-w-sm"
                />
            </div>

            {shown.length === 0 ? (
                <div className="border border-[#1A1A1A]/10 bg-white px-6 py-14 text-center">
                    <FiFileText className="mx-auto text-xl text-[#8A6E68]" />
                    <h3 className="mt-4 font-serif text-2xl">
                        No bookings <span className="italic text-[#8A6E68]">found.</span>
                    </h3>
                    <p className="mt-2 text-xs text-[#77716C]">Try another status or search term.</p>
                </div>
            ) : (
                /* Scrolls sideways and up/down. The header stays pinned. */
                <div className="max-h-[600px] overflow-auto border border-[#1A1A1A]/10 bg-white">
                    <table className="w-full min-w-[1000px] border-collapse">
                        <thead className="sticky top-0 z-10 bg-[#F8F5F1]">
                            <tr className="border-b border-[#1A1A1A]/10 text-left text-[10px] uppercase tracking-[0.16em] text-[#99928C]">
                                {["Property", "Owner", "Contact", "Stay", "Amount", "Status", ""].map((h) => (
                                    <th key={h} className="whitespace-nowrap px-5 py-4 font-normal">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {shown.map((b) => {
                                const p = b.property;

                                return (
                                    <tr
                                        key={b._id}
                                        className="border-b border-[#1A1A1A]/10 last:border-0 hover:bg-[#FCFAF7]"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-12 w-16 shrink-0 overflow-hidden bg-[#EEE9E4]">
                                                    {p?.images?.[0] && (
                                                        <Image
                                                            src={p.images[0]}
                                                            alt={p.title || "Property"}
                                                            fill
                                                            sizes="64px"
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div className="min-w-[160px]">
                                                    <p className="whitespace-nowrap font-serif text-base">
                                                        {p?.title || "Unavailable"}
                                                    </p>
                                                    <p className="mt-1 whitespace-nowrap text-[11px] text-[#89827D]">
                                                        {getLocation(p)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="whitespace-nowrap font-serif text-base">
                                                {p?.ownerInformation?.name || "—"}
                                            </p>
                                            <p className="mt-1 whitespace-nowrap text-[11px] text-[#89827D]">
                                                {p?.ownerInformation?.email || "—"}
                                            </p>
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 text-xs">
                                            {b.contactNumber || "—"}
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="whitespace-nowrap text-xs">{formatDate(b.moveInDate)}</p>
                                            <p className="mt-1 whitespace-nowrap text-[11px] text-[#99928C]">
                                                to {formatDate(b.moveOutDate)}
                                            </p>
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 font-serif text-lg">
                                            {formatPrice(b.totalAmount)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <StatusBadge status={b.bookingStatus} />
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() => setSelected(b)}
                                                aria-label="View booking details"
                                                className="inline-flex items-center gap-2 border border-[#1A1A1A]/10 px-3 py-2.5 text-[10px] uppercase tracking-[0.12em] transition hover:border-[#8A6E68] hover:bg-[#F8F5F1]"
                                            >
                                                <FiEye className="text-[#8A6E68]" /> View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-[#99928C]">
                Showing {shown.length} of {bookings.length} bookings
            </p>

            {selected && <DetailsModal booking={selected} onClose={() => setSelected(null)} />}
        </>
    );
};

export default AdminBookingsTable;
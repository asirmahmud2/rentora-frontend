"use client";

import { useState } from "react";
import Image from "next/image";
import {
    FiArrowUpRight,
    FiCalendar,
    FiCheck,
    FiEye,
    FiFileText,
    FiMapPin,
    FiPhone,
    FiX,
} from "react-icons/fi";
import { updateBookingStatus } from "@/app/Server/Actions/booking";

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

const getNights = (from, to) => {
    const days = (new Date(to) - new Date(from)) / 86400000;
    return Number.isFinite(days) && days > 0 ? Math.round(days) : "—";
};

const getTenant = (booking) =>
    booking.tenantInformation ||
    booking.userInformation ||
    booking.tenant ||
    booking.user ||
    {};

const getLocation = (property) => {
    const location = property?.location;

    if (typeof location === "string") return location;

    return (
        [location?.area, location?.city, location?.country]
            .filter(Boolean)
            .join(", ") || "—"
    );
};

const StatusBadge = ({ status }) => (
    <span
        className={`inline-flex items-center gap-2 whitespace-nowrap px-3 py-2 text-[8px] uppercase tracking-[0.14em] ${
            colors[status] || colors.Pending
        }`}
    >
        <span
            className={`h-1.5 w-1.5 rounded-full ${
                status === "Approved"
                    ? "bg-[#5B6D5B]"
                    : status === "Rejected"
                      ? "bg-[#9A6660]"
                      : "bg-[#8A6E68]"
            }`}
        />
        {status || "Pending"}
    </span>
);

/* Approve / Reject / Note buttons, used by both desktop and mobile */
const ActionButtons = ({ booking, onDecision, onNote }) => {
    const status = booking.bookingStatus || "Pending";

    return (
        <div className="flex justify-end gap-2">
            {status !== "Approved" && (
                <button
                    type="button"
                    onClick={() => onDecision(booking._id, "Approved")}
                    title="Approve booking"
                    aria-label="Approve booking"
                    className="flex h-9 w-9 items-center justify-center border border-[#5B6D5B]/25 text-[#5B6D5B] transition hover:bg-[#F0F4EF]"
                >
                    <FiCheck />
                </button>
            )}

            {status !== "Rejected" && (
                <button
                    type="button"
                    onClick={() => onDecision(booking._id, "Rejected")}
                    title="Reject booking"
                    aria-label="Reject booking"
                    className="flex h-9 w-9 items-center justify-center border border-[#9A6660]/25 text-[#9A6660] transition hover:bg-[#FBF1EF]"
                >
                    <FiX />
                </button>
            )}

            {booking.notes && (
                <button
                    type="button"
                    onClick={() => onNote(booking)}
                    title="Read tenant note"
                    aria-label="Read tenant note"
                    className="flex h-9 w-9 items-center justify-center border border-[#1A1A1A]/10 text-[#77716C] transition hover:border-[#8A6E68] hover:bg-[#F8F5F1]"
                >
                    <FiFileText />
                </button>
            )}
        </div>
    );
};

/* Compact note modal */
const NoteModal = ({ booking, onClose }) => (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
        onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
        }}
    >
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="tenant-note-title"
            className="w-full max-w-md bg-[#FDFCF9] p-6 sm:p-7"
        >
            <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-5">
                <div>
                    <p className="text-[8px] uppercase tracking-[0.22em] text-[#9B9690]">
                        Booking · {String(booking._id).slice(-6)}
                    </p>

                    <h2 id="tenant-note-title" className="mt-2 font-serif text-2xl">
                        Tenant note
                    </h2>

                    <p className="mt-1 text-xs text-[#77716C]">
                        {booking.property?.title || "Property reservation"}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close note"
                    className="text-[#77716C] hover:text-[#8A6E68]"
                >
                    <FiX />
                </button>
            </div>

            <div className="mt-5 border-l-2 border-[#8A6E68]/50 bg-white px-4 py-4">
                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#5F5954]">
                    {booking.notes || "No additional notes were provided."}
                </p>
            </div>

            <button
                type="button"
                onClick={onClose}
                className="mt-5 w-full bg-[#1A1A1A] px-5 py-3 text-[9px] uppercase tracking-[0.18em] text-white transition hover:bg-[#8A6E68]"
            >
                Close
            </button>
        </div>
    </div>
);

const BookingRequestsTable = ({ bookings = [] }) => {
    const [activeTab, setActiveTab] = useState("All");
    const [selectedNote, setSelectedNote] = useState(null);

    const count = (tab) =>
        tab === "All"
            ? bookings.length
            : bookings.filter((b) => b.bookingStatus === tab).length;

    const shown =
        activeTab === "All"
            ? bookings
            : bookings.filter((b) => b.bookingStatus === activeTab);

    const handleDecision = async (bookingId, newStatus) => {
        const res = await updateBookingStatus(bookingId, newStatus);

        if (!res.ok) {
            alert(res.data?.message || "Could not update this booking.");
        }
    };

    return (
        <>
            {/* Status filters */}
            <div className="mb-7 flex flex-wrap gap-x-6 gap-y-3 border-b border-[#1A1A1A]/10">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`relative pb-3 text-[9px] uppercase tracking-[0.2em] transition ${
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

            {shown.length > 0 ? (
                <>
                    {/* Desktop / Tablet table */}
                    <div className="hidden overflow-hidden border border-[#1A1A1A]/10 bg-white md:block">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1050px] border-collapse">
                                <thead>
                                    <tr className="border-b border-[#1A1A1A]/10 bg-[#F8F5F1]">
                                        {[
                                            "Tenant",
                                            "Property",
                                            "Stay Dates",
                                            "Amount",
                                            "Status / Note",
                                            "Actions",
                                        ].map((heading) => (
                                            <th
                                                key={heading}
                                                className={`px-5 py-4 text-[8px] uppercase tracking-[0.18em] text-[#99928C] ${
                                                    heading === "Actions"
                                                        ? "text-right"
                                                        : "text-left"
                                                }`}
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {shown.map((b) => {
                                        const p = b.property;
                                        const tenant = getTenant(b);
                                        const status = b.bookingStatus || "Pending";

                                        return (
                                            <tr
                                                key={b._id}
                                                className="group border-b border-[#1A1A1A]/8 last:border-0 transition-colors hover:bg-[#FCFAF7]"
                                            >
                                                {/* Tenant */}
                                                <td className="px-5 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#EEE9E4] font-serif text-xs text-[#8A6E68]">
                                                            {tenant.image || tenant.photo ? (
                                                                <Image
                                                                    src={tenant.image || tenant.photo}
                                                                    alt={tenant.name || "Tenant"}
                                                                    fill
                                                                    sizes="40px"
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                (tenant.name || b.tenantName || "T")
                                                                    .charAt(0)
                                                                    .toUpperCase()
                                                            )}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="max-w-[150px] truncate font-serif text-base">
                                                                {tenant.name ||
                                                                    b.tenantName ||
                                                                    b.userName ||
                                                                    "Tenant"}
                                                            </p>

                                                            <p className="mt-1 max-w-[170px] truncate text-[10px] text-[#89827D]">
                                                                {tenant.email ||
                                                                    b.tenantEmail ||
                                                                    b.email ||
                                                                    "—"}
                                                            </p>

                                                            <a
                                                                href={`tel:${b.contactNumber || tenant.phone || ""}`}
                                                                className="mt-1 inline-flex items-center gap-1.5 text-[10px] text-[#8A6E68] hover:underline"
                                                            >
                                                                <FiPhone />
                                                                {b.contactNumber ||
                                                                    tenant.phone ||
                                                                    "No contact"}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Property */}
                                                <td className="px-5 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative h-14 w-20 shrink-0 overflow-hidden bg-[#EEE9E4]">
                                                            {p?.images?.[0] && (
                                                                <Image
                                                                    src={p.images[0]}
                                                                    alt={p.title || "Property"}
                                                                    fill
                                                                    sizes="80px"
                                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                                />
                                                            )}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="max-w-[200px] truncate font-serif text-base">
                                                                {p?.title || "Property unavailable"}
                                                            </p>

                                                            <p className="mt-1 flex max-w-[200px] items-center gap-1.5 truncate text-[10px] text-[#89827D]">
                                                                <FiMapPin className="shrink-0" />
                                                                {getLocation(p)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Stay dates */}
                                                <td className="px-5 py-5">
                                                    <div className="flex items-start gap-2">
                                                        <FiCalendar className="mt-1 shrink-0 text-xs text-[#8A6E68]" />

                                                        <div>
                                                            <p className="text-xs">
                                                                {formatDate(b.moveInDate)}
                                                            </p>

                                                            <p className="mt-1 text-[10px] text-[#99928C]">
                                                                to {formatDate(b.moveOutDate)}
                                                            </p>

                                                            <p className="mt-1 text-[9px] text-[#8A6E68]">
                                                                {getNights(b.moveInDate, b.moveOutDate)} days
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Amount */}
                                                <td className="px-5 py-5">
                                                    <p className="font-serif text-xl">
                                                        {formatPrice(b.totalAmount)}
                                                    </p>

                                                    {p?.rent != null && (
                                                        <p className="mt-1 text-[9px] text-[#99928C]">
                                                            {formatPrice(p.rent)} /{" "}
                                                            {p.rentType?.toLowerCase() || "period"}
                                                        </p>
                                                    )}
                                                </td>

                                                {/* Status + Note */}
                                                <td className="px-5 py-5">
                                                    <StatusBadge status={status} />

                                                    {b.notes && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedNote(b)}
                                                            className="mt-2 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-[#8A6E68] hover:underline"
                                                        >
                                                            <FiEye />
                                                            View Note
                                                        </button>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-5">
                                                    <ActionButtons
                                                        booking={b}
                                                        onDecision={handleDecision}
                                                        onNote={setSelectedNote}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile rows */}
                    <div className="space-y-3 md:hidden">
                        {shown.map((b) => {
                            const p = b.property;
                            const tenant = getTenant(b);
                            const status = b.bookingStatus || "Pending";

                            return (
                                <article
                                    key={b._id}
                                    className="border border-[#1A1A1A]/10 bg-white p-4"
                                >
                                    <div className="flex gap-3">
                                        <div className="relative h-20 w-24 shrink-0 overflow-hidden bg-[#EEE9E4]">
                                            {p?.images?.[0] && (
                                                <Image
                                                    src={p.images[0]}
                                                    alt={p.title || "Property"}
                                                    fill
                                                    sizes="96px"
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <StatusBadge status={status} />

                                                <span className="text-[9px] text-[#99928C]">
                                                    #{String(b._id).slice(-6)}
                                                </span>
                                            </div>

                                            <h3 className="mt-2 truncate font-serif text-lg">
                                                {p?.title || "Property unavailable"}
                                            </h3>

                                            <p className="mt-1 truncate text-[10px] text-[#77716C]">
                                                {tenant.name ||
                                                    b.tenantName ||
                                                    b.userName ||
                                                    "Tenant"}
                                                {" · "}
                                                {tenant.email || b.email || b.tenantEmail || "—"}
                                            </p>

                                            <p className="mt-1 flex items-center gap-1.5 truncate text-[10px] text-[#89827D]">
                                                <FiMapPin />
                                                {getLocation(p)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#1A1A1A]/8 pt-4">
                                        <div>
                                            <p className="font-serif text-xl">
                                                {formatPrice(b.totalAmount)}
                                            </p>

                                            <p className="mt-1 text-[10px] text-[#77716C]">
                                                {formatDate(b.moveInDate)} –{" "}
                                                {formatDate(b.moveOutDate)}
                                            </p>
                                        </div>

                                        <ActionButtons
                                            booking={b}
                                            onDecision={handleDecision}
                                            onNote={setSelectedNote}
                                        />
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </>
            ) : (
                <div className="border border-[#1A1A1A]/10 bg-white p-12 text-center">
                    <FiCalendar className="mx-auto text-2xl text-[#8A6E68]" />

                    <h3 className="mt-5 font-serif text-3xl">
                        No requests <span className="italic text-[#8A6E68]">found.</span>
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-[#77716C]">
                        Booking requests matching this status will appear here.
                    </p>

                    {activeTab !== "All" && (
                        <button
                            type="button"
                            onClick={() => setActiveTab("All")}
                            className="mt-5 text-[9px] uppercase tracking-[0.18em] text-[#8A6E68] hover:underline"
                        >
                            View all requests
                            <FiArrowUpRight className="ml-2 inline" />
                        </button>
                    )}
                </div>
            )}

            {/* Note modal */}
            {selectedNote && (
                <NoteModal
                    booking={selectedNote}
                    onClose={() => setSelectedNote(null)}
                />
            )}
        </>
    );
};

export default BookingRequestsTable;
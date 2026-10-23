"use client";

import { useState } from "react";
import { FiCreditCard, FiEye, FiSearch, FiX } from "react-icons/fi";

const tabs = ["All", "Paid", "Refunded", "Failed"];

const statusColors = {
    Paid: "bg-[#F0F4EF] text-[#5B6D5B]",
    Refunded: "bg-[#F7F3ED] text-[#8A6E68]",
    Failed: "bg-[#FBF1EF] text-[#9A6660]",
};

const formatDate = (date) =>
    date && !Number.isNaN(new Date(date).getTime())
        ? new Date(date).toLocaleString("en-BD", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : "—";

const formatAmount = (amount, currency = "BDT") =>
    `${currency} ${Number(amount ?? 0).toLocaleString("en-BD")}`;

const StatusBadge = ({ status }) => (
    <span
        className={`inline-flex items-center gap-2 whitespace-nowrap px-3 py-2 text-[8px] uppercase tracking-[0.14em] ${
            statusColors[status] || statusColors.Failed
        }`}
    >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {status || "Unknown"}
    </span>
);

const TransactionDetailsModal = ({ transaction, onClose }) => {
    // Each row in the details list: [label, value]
    const rows = [
        ["Transaction ID", transaction.transactionId],
        ["Booking ID", transaction.bookingId],
        ["Property", transaction.propertyName],
        ["Property ID", transaction.propertyId],
        ["Tenant", transaction.tenantName],
        ["Tenant ID", transaction.tenantId],
        ["Owner", transaction.ownerName],
        ["Owner ID", transaction.ownerId],
        ["Date", formatDate(transaction.date)],
    ];

    return (
        // Dark background. Clicking it closes the modal.
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6"
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
            {/* max-h-full + overflow-y-auto makes the modal scroll when it is too tall */}
            <div
                role="dialog"
                aria-modal="true"
                className="max-h-full w-full max-w-md overflow-y-auto bg-[#FDFCF9] p-6 sm:p-7"
            >
                {/* Title + close button */}
                <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-5">
                    <div>
                        <p className="text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                            Payment Record
                        </p>
                        <h2 className="mt-2 font-serif text-2xl">Transaction details</h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="text-[#77716C] transition hover:text-[#8A6E68]"
                    >
                        <FiX />
                    </button>
                </div>

                {/* Amount + status */}
                <div className="mt-5">
                    <p className="text-[8px] uppercase tracking-[0.18em] text-[#9B9690]">Amount</p>
                    <p className="mt-1 font-serif text-3xl">
                        {formatAmount(transaction.amount, transaction.currency)}
                    </p>
                    <div className="mt-3">
                        <StatusBadge status={transaction.status} />
                    </div>
                </div>

                {/* All detail rows */}
                <div className="mt-5 divide-y divide-[#1A1A1A]/10 border-y border-[#1A1A1A]/10">
                    {rows.map(([label, value]) => (
                        <div key={label} className="grid grid-cols-[110px_1fr] gap-4 py-3">
                            <p className="text-[8px] uppercase tracking-[0.12em] text-[#99928C]">
                                {label}
                            </p>
                            <p className="break-all text-xs leading-5 text-[#45403C]">
                                {value || "—"}
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 w-full bg-[#1A1A1A] px-5 py-3 text-[9px] uppercase tracking-[0.18em] text-white transition hover:bg-[#8A6E68]"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const TransactionTable = ({ transactions = [] }) => {
    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);

    // Number shown next to each tab
    const count = (tab) =>
        tab === "All"
            ? transactions.length
            : transactions.filter((t) => t.status === tab).length;

    // Filter by tab first, then by the search text
    const query = search.trim().toLowerCase();

    const shown = transactions.filter((t) => {
        if (activeTab !== "All" && t.status !== activeTab) return false;

        const text = [
            t.transactionId,
            t.bookingId,
            t.propertyName,
            t.tenantName,
            t.ownerName,
            t.status,
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
                            className={`relative pb-3 text-[9px] uppercase tracking-[0.18em] transition ${
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

                <div className="flex h-11 w-full items-center gap-3 border border-[#1A1A1A]/15 bg-white px-4 transition focus-within:border-[#8A6E68] lg:max-w-sm">
                    <FiSearch className="shrink-0 text-sm text-[#8A6E68]" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search transactions..."
                        aria-label="Search transactions"
                        className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#AAA49F]"
                    />
                </div>
            </div>

            {/* Table (scrolls sideways on small screens) */}
            <div className="overflow-hidden border border-[#1A1A1A]/10 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px] border-collapse">
                        <thead>
                            <tr className="border-b border-[#1A1A1A]/10 bg-[#F8F5F1] text-left text-[8px] uppercase tracking-[0.16em] text-[#99928C]">
                                {["Transaction", "Property", "Tenant", "Owner", "Amount", "Date", "Status", ""].map(
                                    (heading, index) => (
                                        <th
                                            key={index}
                                            className="whitespace-nowrap px-5 py-4 font-normal"
                                        >
                                            {heading}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {shown.map((t) => (
                                <tr
                                    key={t._id}
                                    className="border-b border-[#1A1A1A]/8 transition-colors last:border-0 hover:bg-[#FCFAF7]"
                                >
                                    <td className="px-5 py-5">
                                        <p className="max-w-[180px] truncate font-serif text-base">
                                            {t.transactionId || "—"}
                                        </p>
                                        <p className="mt-1 text-[9px] text-[#99928C]">
                                            Booking · {String(t.bookingId || "—").slice(-8)}
                                        </p>
                                    </td>

                                    <td className="px-5 py-5">
                                        <p className="max-w-[190px] truncate font-serif text-base">
                                            {t.propertyName || "—"}
                                        </p>
                                        <p className="mt-1 text-[9px] text-[#99928C]">
                                            ID · {String(t.propertyId || "—").slice(-8)}
                                        </p>
                                    </td>

                                    <td className="px-5 py-5">
                                        <p className="whitespace-nowrap text-xs">{t.tenantName || "—"}</p>
                                        <p className="mt-1 text-[9px] text-[#99928C]">
                                            ID · {String(t.tenantId || "—").slice(-8)}
                                        </p>
                                    </td>

                                    <td className="px-5 py-5">
                                        <p className="whitespace-nowrap text-xs">{t.ownerName || "—"}</p>
                                        <p className="mt-1 text-[9px] text-[#99928C]">
                                            ID · {String(t.ownerId || "—").slice(-8)}
                                        </p>
                                    </td>

                                    <td className="whitespace-nowrap px-5 py-5 font-serif text-lg">
                                        {formatAmount(t.amount, t.currency)}
                                    </td>

                                    <td className="whitespace-nowrap px-5 py-5 text-xs text-[#68625D]">
                                        {formatDate(t.date)}
                                    </td>

                                    <td className="px-5 py-5">
                                        <StatusBadge status={t.status} />
                                    </td>

                                    <td className="px-5 py-5 text-right">
                                        <button
                                            type="button"
                                            onClick={() => setSelected(t)}
                                            className="inline-flex items-center gap-2 border border-[#1A1A1A]/10 px-3 py-2.5 text-[8px] uppercase tracking-[0.14em] transition hover:border-[#8A6E68] hover:bg-[#F8F5F1]"
                                        >
                                            <FiEye className="text-[#8A6E68]" />
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty state */}
                {shown.length === 0 && (
                    <div className="px-6 py-14 text-center">
                        <FiCreditCard className="mx-auto text-2xl text-[#8A6E68]" />
                        <h3 className="mt-4 font-serif text-2xl">
                            No transactions <span className="italic text-[#8A6E68]">found.</span>
                        </h3>
                        <p className="mt-2 text-xs text-[#77716C]">Try another status or search term.</p>
                    </div>
                )}
            </div>

            <p className="mt-4 text-[9px] uppercase tracking-[0.14em] text-[#99928C]">
                Showing {shown.length} of {transactions.length} transactions
            </p>

            {/* Details modal */}
            {selected && (
                <TransactionDetailsModal
                    transaction={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </>
    );
};

export default TransactionTable;
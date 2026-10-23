import React from "react";
import { transactionHistory } from "@/app/Server/Actions/booking";
import TransactionTable from "./TransactionTable";

const TransactionPage = async () => {
    let transactions = [];
    let errorMessage = "";

    try {
        const result = await transactionHistory();

        const list = Array.isArray(result)
            ? result
            : result?.data ?? result?.transactions ?? [];

        if (!Array.isArray(list)) {
            throw new Error("Invalid transaction response");
        }

        transactions = list.map((t) => {
            const parsedDate = t.date ? new Date(t.date) : null;

            return {
                ...t,
                _id: String(t._id ?? ""),
                transactionId: t.transactionId ?? "",
                bookingId: String(t.bookingId ?? ""),
                propertyId: String(t.propertyId ?? ""),
                tenantId: String(t.tenantId ?? ""),
                ownerId: String(t.ownerId ?? ""),
                amount: Number(t.amount ?? 0),
                date:
                    parsedDate && !Number.isNaN(parsedDate.getTime())
                        ? parsedDate.toISOString()
                        : null,
            };
        });
    } catch (error) {
        console.error("Transaction history error:", error);
        errorMessage = "Could not load transactions. Please try again.";
    }

    const paidCount = transactions.filter(
        (t) => t.status?.toLowerCase() === "paid"
    ).length;

    const otherCount = transactions.length - paidCount;

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
                                    Administration / Transactions
                                </span>
                            </div>

                            <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                                Every payment,
                                <span className="italic text-[#8A6E68]">
                                    {" "}accounted for.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-sm leading-7 text-[#6F6A65]">
                                Monitor payment records across RENTORA,
                                including transaction references, properties,
                                tenants, owners, and payment status.
                            </p>
                        </div>

                        <div className="border-l border-[#1A1A1A]/10 pl-6 lg:min-w-[175px]">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#9B9690]">
                                Total Transactions
                            </p>
                            <p className="mt-3 font-serif text-5xl leading-none">
                                {transactions.length}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Summary */}
                <section className="grid grid-cols-2 border-b border-[#1A1A1A]/10 py-8 sm:grid-cols-3">
                    {[
                        { label: "All Records", value: transactions.length },
                        { label: "Paid", value: paidCount },
                        { label: "Other Statuses", value: otherCount },
                    ].map((item, index) => (
                        <div
                            key={item.label}
                            className={`px-4 py-2 first:pl-0 sm:px-7 ${
                                index !== 2
                                    ? "border-r border-[#1A1A1A]/10"
                                    : ""
                            } ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                        >
                            <p className="text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                {item.label}
                            </p>
                            <p className="mt-3 font-serif text-3xl sm:text-4xl">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Transaction table */}
                <section className="py-10 lg:py-14">
                    <div className="mb-8">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="text-[9px] tracking-[0.2em] text-[#8A6E68]">
                                01
                            </span>
                            <span className="h-px w-7 bg-[#1A1A1A]/10" />
                            <span className="text-[9px] uppercase tracking-[0.22em] text-[#9B9690]">
                                Payment Records
                            </span>
                        </div>

                        <h2 className="font-serif text-4xl sm:text-5xl">
                            Transaction
                            <span className="italic text-[#8A6E68]">
                                {" "}history.
                            </span>
                        </h2>
                    </div>

                    {errorMessage ? (
                        <div
                            role="alert"
                            className="border border-[#8A6E68]/30 bg-white p-6 text-sm text-[#694D48]"
                        >
                            {errorMessage}
                        </div>
                    ) : (
                        <TransactionTable transactions={transactions} />
                    )}
                </section>

                <footer className="border-t border-[#1A1A1A]/10 pt-8">
                    <div className="flex flex-col gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#A09A95]">
                            RENTORA / Financial Records
                        </p>
                        <p className="font-serif text-sm italic text-[#85807B]">
                            Every transaction, traceable.
                        </p>
                    </div>
                </footer>
            </div>
        </main>
    );
};

export default TransactionPage;
"use client";

import { RejectProperty } from "@/app/Server/Actions/properties";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const RejectPropertyModal = ({ property, onClose }) => {
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!feedback.trim()) {
            return;
        }

        const rejectionData = {
            propertyId: property._id,
            status: "Rejected",
            rejectionFeedback: feedback.trim(),
        };

        console.log("Reject property:", rejectionData);

        await RejectProperty(rejectionData, property._id);

        setIsSubmitting(true);

        // Add your server action/API here later.
        //
        // await RejectProperty(rejectionData);

        setIsSubmitting(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
            <div className="w-full max-w-md bg-[#FDFCF9] p-6 sm:p-7">

                {/* Header */}
                <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-5">
                    <div className="min-w-0">
                        <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                            Property Moderation
                        </p>

                        <h2 className="mt-2 truncate font-serif text-2xl text-[#1A1A1A]">
                            Reject property
                        </h2>

                        <p className="mt-1 truncate font-sans text-[10px] text-[#77716C]">
                            {property.title}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="ml-4 text-[#77716C] transition-colors hover:text-[#8A6E68]"
                    >
                        <FiX />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="pt-6">

                    <label
                        htmlFor="rejectionFeedback"
                        className="mb-2 block font-sans text-[9px] uppercase tracking-[0.16em] text-[#77716C]"
                    >
                        Rejection feedback
                    </label>

                    <textarea
                        id="rejectionFeedback"
                        value={feedback}
                        onChange={(event) =>
                            setFeedback(event.target.value)
                        }
                        placeholder="Explain why this property is being rejected..."
                        rows={5}
                        required
                        className="w-full resize-none border border-[#1A1A1A]/15 bg-white px-4 py-3 font-sans text-sm leading-6 text-[#1A1A1A] outline-none transition-colors placeholder:text-[#B0AAA5] focus:border-[#8A6E68]"
                    />

                    <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="border border-[#1A1A1A]/10 px-5 py-3 font-sans text-[9px] uppercase tracking-[0.18em] text-[#55504C] transition-colors hover:border-[#8A6E68]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#1A1A1A] px-5 py-3 font-sans text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#8A6E68] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Submitting..."
                                : "Reject Property"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RejectPropertyModal;
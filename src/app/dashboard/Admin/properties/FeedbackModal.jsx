"use client";

import React from "react";
import { FiX } from "react-icons/fi";

const FeedbackModal = ({ property, onClose }) => {
    const feedback = property?.rejectionFeedback?.trim();

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
                            Rejection feedback
                        </h2>

                        <p className="mt-1 truncate font-sans text-[10px] text-[#77716C]">
                            {property?.title}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-4 shrink-0 text-[#77716C] transition-colors hover:text-[#8A6E68]"
                    >
                        <FiX size={18} />
                    </button>
                </div>

                {/* Feedback */}
                <div className="pt-6">
                    <p className="mb-2 font-sans text-[9px] uppercase tracking-[0.16em] text-[#77716C]">
                        Feedback from admin
                    </p>

                    <div className="border border-[#1A1A1A]/15 bg-white px-4 py-4">
                        <div className="max-h-60 overflow-y-auto pr-2">
                            {feedback ? (
                                <p className="whitespace-pre-wrap font-sans text-sm leading-6 text-[#1A1A1A]">
                                    {feedback}
                                </p>
                            ) : (
                                <p className="font-sans text-sm leading-6 text-[#9B9690]">
                                    No rejection feedback has been provided.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Close */}
                    <div className="mt-5 flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border border-[#1A1A1A]/10 px-5 py-3 font-sans text-[9px] uppercase tracking-[0.18em] text-[#55504C] transition-colors hover:border-[#8A6E68] hover:text-[#8A6E68]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
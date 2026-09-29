"use client";

import { DeleteProperty } from "@/app/Server/Actions/properties";
import React, { useState } from "react";
import { FiTrash2, FiX } from "react-icons/fi";

const DeletePropertyModal = ({ property, onClose }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const deleteData = {
            propertyId: property._id,
        };
        
        console.log("Delete property:", deleteData);
        setIsDeleting(true);
        const result = await DeleteProperty(property._id);
        setIsDeleting(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
            <div className="w-full max-w-sm bg-[#FDFCF9] p-6 sm:p-7">

                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <div className="mb-4 flex h-10 w-10 items-center justify-center border border-[#A36B64]/20 bg-[#FBF2F0]">
                            <FiTrash2 className="text-sm text-[#9A6963]" />
                        </div>

                        <h2 className="font-serif text-2xl text-[#1A1A1A]">
                            Delete property?
                        </h2>

                        <p className="mt-2 font-sans text-xs leading-6 text-[#77716C]">
                            This will remove
                            <span className="font-medium text-[#1A1A1A]">
                                {" "}
                                {property.title}
                            </span>{" "}
                            from the platform.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="text-[#77716C] transition-colors hover:text-[#8A6E68]"
                    >
                        <FiX />
                    </button>
                </div>

                {/* Actions */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
                >
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="border border-[#1A1A1A]/10 px-5 py-3 font-sans text-[9px] uppercase tracking-[0.18em] text-[#55504C] transition-colors hover:border-[#8A6E68]"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isDeleting}
                        className="bg-[#9A6963] px-5 py-3 font-sans text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#7F504B] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isDeleting ? "Deleting..." : "Delete Property"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DeletePropertyModal;
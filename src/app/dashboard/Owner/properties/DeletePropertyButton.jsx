"use client";

import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import DeletePropertyModal from "../../Admin/properties/DeletePropertyModal";


const DeletePropertyButton = ({ property, mobile = false }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            {mobile ? (
                <button
                    type="button"
                    onClick={openDeleteModal}
                    className="group inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.18em] text-[#96908B] transition hover:text-[#8A6E68]"
                >
                    <FiTrash2 className="text-xs" />
                    Delete
                </button>
            ) : (
                <button
                    type="button"
                    onClick={openDeleteModal}
                    aria-label={`Delete ${property.title}`}
                    className="flex h-9 w-9 items-center justify-center text-[#A09A95] transition hover:bg-[#8A6E68]/5 hover:text-[#8A6E68]"
                >
                    <FiTrash2 className="text-sm" />
                </button>
            )}

            {isDeleteModalOpen && (
                <DeletePropertyModal
                    property={property}
                    onClose={closeDeleteModal}
                />
            )}
        </>
    );
};

export default DeletePropertyButton;
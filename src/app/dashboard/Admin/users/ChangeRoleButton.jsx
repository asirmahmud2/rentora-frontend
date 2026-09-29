"use client";

import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import ChangeRoleModal from "./ChangeRoleModal";

const ChangeRoleButton = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="group flex w-full items-center justify-between border-t border-[#1A1A1A]/8 pt-5 font-sans text-[8px] uppercase tracking-[0.18em] text-[#1A1A1A]"
            >
                <span>Change Role</span>

                <FiArrowUpRight className="text-sm text-[#8A6E68] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

            {isOpen && (
                <ChangeRoleModal
                    user={user}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default ChangeRoleButton;
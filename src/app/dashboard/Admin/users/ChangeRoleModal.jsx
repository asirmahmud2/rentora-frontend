"use client";

import { ChangeUserRole } from "@/app/Server/Actions/ChangeRole";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const ChangeRoleModal = ({ user, onClose }) => {
const [role, setRole] = useState(user?.role || "Tenant");
const [loading, setLoading] = useState(false);

const handleSubmit = async (event) => {
    event.preventDefault();

    const roleData = {
        userId: user?.id || user?._id,
        role,
    };

    try {
        setLoading(true);
        console.log("Role data to be sent:", roleData);
        const response = await ChangeUserRole(roleData);

        if (!response.ok) {
            throw new Error("Failed to change role");
        }

        onClose();
    } catch (error) {
        console.error("Role change error:", error);
    } finally {
        setLoading(false);
    }
};

if (!user) {
    return null;
}

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
        <div className="w-full max-w-sm bg-[#FDFCF9] p-6 shadow-xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-4">
                <div>
                    <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                        Change Role
                    </p>

                    <h2 className="mt-2 font-serif text-2xl text-[#1A1A1A]">
                        {user.name || "User"}
                    </h2>

                    <p className="mt-1 font-sans text-[10px] text-[#77716C]">
                        {user.email}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                    className="text-[#77716C] transition-colors hover:text-[#8A6E68]"
                >
                    <FiX />
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="pt-5">
                <label className="mb-2 block font-sans text-[9px] uppercase tracking-[0.16em] text-[#77716C]">
                    Change role to
                </label>

                <select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    disabled={loading}
                    className="w-full border border-[#1A1A1A]/15 bg-white px-4 py-3 font-sans text-sm text-[#1A1A1A] outline-none transition-colors focus:border-[#8A6E68] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <option value="Tenant">Tenant</option>
                    <option value="Owner">Owner</option>
                    <option value="Admin">Admin</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 w-full bg-[#1A1A1A] px-5 py-3 font-sans text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#8A6E68] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Updating..." : "Submit"}
                </button>
            </form>
        </div>
    </div>
);


};

export default ChangeRoleModal;

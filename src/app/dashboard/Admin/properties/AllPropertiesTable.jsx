"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
    FiArrowUpRight,
    FiCheck,
    FiEdit3,
    FiTrash2,
    FiX,
    FiEye,
    FiMapPin,
} from "react-icons/fi";

import RejectPropertyModal from "./RejectPropertyModal";
import DeletePropertyModal from "./DeletePropertyModal";
import { ApproveProperty } from "@/app/Server/Actions/properties";
import FeedbackModal from "./FeedbackModal";

const AllPropertiesTable = ({ properties }) => {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    const [propertyToDelete, setPropertyToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const formatRent = (rent) => {
        if (rent === undefined || rent === null) {
            return "—";
        }

        return `৳${Number(rent).toLocaleString("en-BD")}`;
    };

    const getLocation = (property) => {
        const location = property?.location;

        if (!location) {
            return "—";
        }

        if (typeof location === "string") {
            return location;
        }

        return [location.area, location.city, location.country]
            .filter(Boolean)
            .join(", ");
    };

    const openRejectModal = (property) => {
        setSelectedProperty(property);
        setIsRejectModalOpen(true);
    };

    const closeRejectModal = () => {
        setSelectedProperty(null);
        setIsRejectModalOpen(false);
    };

    const openFeedbackModal = (property) => {
        setSelectedProperty(property);
        setIsFeedbackModalOpen(true);
    };

    const closeFeedbackModal = () => {
        setSelectedProperty(null);
        setIsFeedbackModalOpen(false);
    };

    const openDeleteModal = (property) => {
        setPropertyToDelete(property);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setPropertyToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleApprove = async (property) => {
        const actionData = {
            propertyId: property._id,
            status: "Approved",
        };

        await ApproveProperty(actionData, property._id);

        console.log("Approve property:", actionData);

        // Add your server action/API here later.
    };

    return (
        <>
            {properties.length > 0 ? (
                <>
                    {/* =================================================
                        DESKTOP TABLE
                    ================================================== */}
                    <div className="hidden overflow-hidden border border-[#1A1A1A]/10 bg-white md:block">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px] border-collapse">
                                <thead>
                                    <tr className="border-b border-[#1A1A1A]/10 bg-[#F8F5F1]">
                                        <th className="px-6 py-4 text-left font-sans text-[8px] uppercase tracking-[0.2em] text-[#9A948F]">
                                            Property
                                        </th>

                                        <th className="px-6 py-4 text-left font-sans text-[8px] uppercase tracking-[0.2em] text-[#9A948F]">
                                            Owner
                                        </th>

                                        <th className="px-6 py-4 text-left font-sans text-[8px] uppercase tracking-[0.2em] text-[#9A948F]">
                                            Type
                                        </th>

                                        <th className="px-6 py-4 text-left font-sans text-[8px] uppercase tracking-[0.2em] text-[#9A948F]">
                                            Rent
                                        </th>

                                        <th className="px-6 py-4 text-left font-sans text-[8px] uppercase tracking-[0.2em] text-[#9A948F]">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-right font-sans text-[8px] uppercase tracking-[0.2em] text-[#9A948F]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {properties.map((property, index) => (
                                        <tr
                                            key={property._id}
                                            className="group border-b border-[#1A1A1A]/8 last:border-b-0 transition-colors duration-300 hover:bg-[#FCFAF7]"
                                        >
                                            {/* Property */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative h-14 w-20 shrink-0 overflow-hidden bg-[#EEE9E4]">
                                                        {property.images?.[0] ? (
                                                            <Image
                                                                src={property.images[0]}
                                                                alt={
                                                                    property.title ||
                                                                    "Property"
                                                                }
                                                                fill
                                                                sizes="80px"
                                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center font-serif text-lg text-[#8A6E68]">
                                                                R
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="mb-1 font-sans text-[8px] tracking-[0.16em] text-[#8A6E68]">
                                                            {String(index + 1).padStart(
                                                                2,
                                                                "0"
                                                            )}
                                                        </p>

                                                        <p className="max-w-[250px] truncate font-serif text-lg text-[#1A1A1A]">
                                                            {property.title ||
                                                                "Untitled Property"}
                                                        </p>

                                                        <div className="mt-1 flex items-center gap-1.5 text-[#8A847F]">
                                                            <FiMapPin className="text-[10px]" />

                                                            <span className="max-w-[240px] truncate font-sans text-[9px]">
                                                                {getLocation(
                                                                    property
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Owner */}
                                            <td className="px-6 py-5">
                                                <div>
                                                    <p className="font-serif text-base text-[#1A1A1A]">
                                                        {property.ownerInformation
                                                            ?.name || "—"}
                                                    </p>

                                                    <p className="mt-1 max-w-[190px] truncate font-sans text-[9px] text-[#8A847F]">
                                                        {property.ownerInformation
                                                            ?.email || "—"}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Type */}
                                            <td className="px-6 py-5">
                                                <span className="font-sans text-[10px] text-[#68625D]">
                                                    {property.propertyType ||
                                                        "—"}
                                                </span>
                                            </td>

                                            {/* Rent */}
                                            <td className="px-6 py-5">
                                                <p className="font-serif text-lg text-[#1A1A1A]">
                                                    {formatRent(
                                                        property.rent
                                                    )}
                                                </p>

                                                <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.14em] text-[#A09A95]">
                                                    {property.rentType ||
                                                        "—"}
                                                </p>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-5">
                                                <StatusBadge
                                                    status={property.status}
                                                />

                                                {/* Rejection feedback */}
                                                {property.status ===
                                                    "Rejected" &&
                                                    property.rejectionFeedback && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openFeedbackModal(
                                                                    property
                                                                )
                                                            }
                                                            className="mt-2 flex items-center gap-2 font-sans text-[8px] uppercase tracking-[0.12em] text-[#8A6E68] hover:underline"
                                                        >
                                                            <FiEye />

                                                            Feedback
                                                        </button>
                                                    )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-5">
                                                <div className="flex justify-end gap-2">
                                                    {/* Approve */}
                                                    {property.status !==
                                                        "Approved" && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleApprove(
                                                                        property
                                                                    )
                                                                }
                                                                title="Approve"
                                                                className="flex h-9 w-9 items-center justify-center border border-[#1A1A1A]/10 text-[#627262] transition-all duration-300 hover:border-[#627262] hover:bg-[#F2F6F2]"
                                                            >
                                                                <FiCheck className="text-sm" />
                                                            </button>
                                                        )}

                                                    {/* Reject */}
                                                    {property.status !==
                                                        "Rejected" && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    openRejectModal(
                                                                        property
                                                                    )
                                                                }
                                                                title="Reject"
                                                                className="flex h-9 w-9 items-center justify-center border border-[#1A1A1A]/10 text-[#9A6963] transition-all duration-300 hover:border-[#9A6963] hover:bg-[#FBF4F2]"
                                                            >
                                                                <FiX className="text-sm" />
                                                            </button>
                                                        )}

                                                    {/* Update */}
                                                    <Link
                                                        href={`/dashboard/Admin/properties/${property._id}/edit`}
                                                        title="Update"
                                                        className="flex h-9 w-9 items-center justify-center border border-[#1A1A1A]/10 text-[#6D6863] transition-all duration-300 hover:border-[#8A6E68] hover:bg-[#F8F5F1]"
                                                    >
                                                        <FiEdit3 className="text-sm" />
                                                    </Link>

                                                    {/* Delete */}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                property
                                                            )
                                                        }
                                                        title="Delete"
                                                        className="flex h-9 w-9 items-center justify-center border border-[#1A1A1A]/10 text-[#9A6963] transition-all duration-300 hover:border-[#9A6963] hover:bg-[#FBF4F2]"
                                                    >
                                                        <FiTrash2 className="text-sm" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* =================================================
                        MOBILE CARDS
                    ================================================== */}
                    <div className="space-y-4 md:hidden">
                        {properties.map((property, index) => (
                            <article
                                key={property._id}
                                className="border border-[#1A1A1A]/10 bg-white p-5"
                            >
                                {/* Image + Heading */}
                                <div className="flex gap-4">
                                    <div className="relative h-20 w-24 shrink-0 overflow-hidden bg-[#EEE9E4]">
                                        {property.images?.[0] ? (
                                            <Image
                                                src={property.images[0]}
                                                alt={
                                                    property.title ||
                                                    "Property"
                                                }
                                                fill
                                                sizes="96px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center font-serif text-lg text-[#8A6E68]">
                                                R
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="font-sans text-[9px] tracking-[0.15em] text-[#8A6E68]">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            <StatusBadge
                                                status={property.status}
                                            />
                                        </div>

                                        <h3 className="mt-2 font-serif text-xl leading-tight text-[#1A1A1A]">
                                            {property.title ||
                                                "Untitled Property"}
                                        </h3>
                                    </div>
                                </div>

                                {/* Information */}
                                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#1A1A1A]/8 pt-5">
                                    <div>
                                        <p className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#A09A95]">
                                            Owner
                                        </p>

                                        <p className="mt-1 truncate font-serif text-sm text-[#383431]">
                                            {property.ownerInformation
                                                ?.name || "—"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#A09A95]">
                                            Type
                                        </p>

                                        <p className="mt-1 font-sans text-xs text-[#5F5A55]">
                                            {property.propertyType || "—"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#A09A95]">
                                            Rent
                                        </p>

                                        <p className="mt-1 font-serif text-lg text-[#1A1A1A]">
                                            {formatRent(property.rent)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-sans text-[8px] uppercase tracking-[0.15em] text-[#A09A95]">
                                            Location
                                        </p>

                                        <p className="mt-1 truncate font-sans text-xs text-[#5F5A55]">
                                            {getLocation(property)}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-5 grid grid-cols-4 border-t border-[#1A1A1A]/8 pt-5">
                                    {property.status !== "Approved" && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleApprove(property)
                                            }
                                            className="flex items-center justify-center border-r border-[#1A1A1A]/8 text-[#627262]"
                                        >
                                            <FiCheck />
                                        </button>
                                    )}

                                    {property.status !== "Rejected" && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openRejectModal(property)
                                            }
                                            className="flex items-center justify-center border-r border-[#1A1A1A]/8 text-[#9A6963]"
                                        >
                                            <FiX />
                                        </button>
                                    )}

                                    <Link
                                        href={`/dashboard/admin/properties/${property._id}/edit`}
                                        className="flex items-center justify-center border-r border-[#1A1A1A]/8 text-[#6D6863]"
                                    >
                                        <FiEdit3 />
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openDeleteModal(property)
                                        }
                                        className="flex items-center justify-center text-[#9A6963]"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </>
            ) : (
                /* =====================================================
                   EMPTY STATE
                ====================================================== */
                <div className="relative overflow-hidden border border-[#1A1A1A]/10 bg-white px-6 py-20 sm:px-10 lg:px-20 lg:py-28">
                    <span className="pointer-events-none absolute -right-5 -top-12 select-none font-serif text-[250px] leading-none text-[#EEEAE6]">
                        P
                    </span>

                    <div className="relative max-w-xl">
                        <div className="mb-6 flex items-center gap-4">
                            <span className="font-sans text-[10px] tracking-[0.18em] text-[#8A6E68]">
                                01
                            </span>

                            <span className="h-px w-8 bg-[#1A1A1A]/10" />
                        </div>

                        <h2 className="font-serif text-4xl leading-[1.05] sm:text-5xl">
                            No properties
                            <span className="italic text-[#8A6E68]">
                                {" "}found.
                            </span>
                        </h2>

                        <p className="mt-6 font-sans text-sm leading-7 text-[#716C67]">
                            Property listings submitted to RENTORA will appear
                            here for administration and moderation.
                        </p>
                    </div>
                </div>
            )}

            {/* =========================================================
                REJECT MODAL
            ========================================================== */}
            {isRejectModalOpen && selectedProperty && (
                <RejectPropertyModal
                    property={selectedProperty}
                    onClose={closeRejectModal}
                />
            )}

            {/* =========================================================
                FEEDBACK MODAL
            ========================================================== */}
            {isFeedbackModalOpen && selectedProperty && (
                <FeedbackModal
                    property={selectedProperty}
                    onClose={closeFeedbackModal}
                />
            )}

            {/* =========================================================
                DELETE MODAL
            ========================================================== */}
            {isDeleteModalOpen && propertyToDelete && (
                <DeletePropertyModal
                    property={propertyToDelete}
                    onClose={closeDeleteModal}
                />
            )}
        </>
    );
};

/* =============================================================
   STATUS BADGE
============================================================= */

const StatusBadge = ({ status }) => {
    const normalizedStatus = status || "Pending";

    const statusClasses = {
        Approved: "bg-[#F1F5F0] text-[#5E705E]",
        Rejected: "bg-[#FBF2F0] text-[#94655F]",
        Pending: "bg-[#F7F3ED] text-[#8A6E68]",
    };

    const dotClasses = {
        Approved: "bg-[#617261]",
        Rejected: "bg-[#A36B64]",
        Pending: "bg-[#8A6E68]",
    };

    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-2 font-sans text-[8px] uppercase tracking-[0.16em] ${statusClasses[normalizedStatus] ||
                statusClasses.Pending
                }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${dotClasses[normalizedStatus] ||
                    dotClasses.Pending
                    }`}
            />

            {normalizedStatus}
        </span>
    );
};

export default AllPropertiesTable;
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    Button,
    Input,
    Label,
    TextArea,
    TextField,
} from "@heroui/react";

import {
    FiArrowUpRight,
    FiCalendar,
    FiCheck,
    FiInfo,
    FiPhone,
    FiUser,
    FiX,
} from "react-icons/fi";

const BookingModal = ({ isOpen, onClose, property, user }) => {
    const router = useRouter();

    const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
    const [bookingError, setBookingError] = useState("");

    const [bookingData, setBookingData] = useState({
        moveInDate: "",
        contactNumber: "",
        notes: "",
    });

    const formatRent = (rent) => {
        return `৳${Number(rent || 0).toLocaleString("en-BD")}`;
    };

    const handleBookingChange = (event) => {
        const { name, value } = event.target;

        setBookingData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        setBookingError("");
    };

    const handleBookingSubmit = async (event) => {
        event.preventDefault();
        setBookingError("");

        if (!bookingData.moveInDate) {
            setBookingError("Please select your preferred move-in date.");
            return;
        }

        if (!bookingData.contactNumber.trim()) {
            setBookingError("Please enter your contact number.");
            return;
        }

        try {
            setIsBookingSubmitting(true);

            /*
             * Save the booking information temporarily.
             *
             * Your payment page can retrieve this information
             * and create the final booking only after successful
             * Stripe payment.
             */
            sessionStorage.setItem(
                "rentoraBooking",
                JSON.stringify({
                    propertyId: property._id.toString(),
                    moveInDate: bookingData.moveInDate,
                    contactNumber: bookingData.contactNumber.trim(),
                    notes: bookingData.notes.trim(),
                })
            );

            router.push(
                `/payment?propertyId=${property._id.toString()}`
            );
        } catch (error) {
            console.error("Booking error:", error);

            setBookingError("Something went wrong. Please try again.");
            setIsBookingSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isBookingSubmitting) {
            return;
        }

        setBookingError("");
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-[#1A1A1A]/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    handleClose();
                }
            }}
        >
            <div className="max-h-[92vh] w-full overflow-y-auto bg-[#FDFCF9] sm:max-w-2xl">
                {/* Modal header */}
                <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 px-6 py-6 sm:px-8">
                    <div>
                        <p className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#8A6E68]">
                            Reserve Property
                        </p>

                        <h2 className="mt-2 max-w-lg font-serif text-2xl text-[#1A1A1A] sm:text-3xl">
                            {property.title}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close booking dialog"
                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#1A1A1A]/10 text-[#6F6863] transition hover:border-[#8A6E68] hover:text-[#8A6E68]"
                    >
                        <FiX />
                    </button>
                </div>

                {/* Modal content */}
                <form
                    onSubmit={handleBookingSubmit}
                    className="px-6 py-6 sm:px-8 sm:py-8"
                >
                    {/* Property summary */}
                    <div className="mb-7 grid grid-cols-[90px_1fr] gap-4 bg-[#EEE9E4] p-3">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            {property.images?.[0] ? (
                                <Image
                                    src={property.images[0]}
                                    alt={property.title}
                                    fill
                                    sizes="90px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center font-serif text-2xl text-[#B4ACA5]">
                                    R
                                </div>
                            )}
                        </div>

                        <div className="min-w-0 self-center">
                            <p className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#8A6E68]">
                                {property.propertyType}
                            </p>

                            <p className="mt-1 line-clamp-2 font-serif text-lg text-[#1A1A1A]">
                                {property.title}
                            </p>

                            <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.1em] text-[#918A85]">
                                {formatRent(property.rent)} / {property.rentType}
                            </p>
                        </div>
                    </div>

                    {/* Error */}
                    {bookingError && (
                        <div className="mb-6 flex items-start gap-3 border border-[#8A6E68]/25 bg-[#8A6E68]/5 px-4 py-3">
                            <FiInfo className="mt-0.5 shrink-0 text-sm text-[#8A6E68]" />

                            <p className="font-sans text-xs leading-5 text-[#694D48]">
                                {bookingError}
                            </p>
                        </div>
                    )}

                    {/* Move-in date */}
                    <TextField
                        name="moveInDate"
                        type="date"
                        isRequired
                        className="w-full"
                    >
                        <Label className="mb-2 font-sans text-[8px] uppercase tracking-[0.2em] text-[#514C49]">
                            Move-in Date
                        </Label>

                        <div className="relative">
                            <FiCalendar className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-[#8A6E68]" />

                            <Input
                                name="moveInDate"
                                type="date"
                                value={bookingData.moveInDate}
                                onChange={handleBookingChange}
                                min={new Date().toISOString().split("T")[0]}
                                className="h-13 w-full rounded-none border border-[#1A1A1A]/15 bg-transparent pl-11 pr-4 font-serif text-base shadow-none transition focus-within:border-[#8A6E68]"
                            />
                        </div>
                    </TextField>

                    {/* Contact number */}
                    <TextField
                        name="contactNumber"
                        type="tel"
                        isRequired
                        className="mt-6 w-full"
                    >
                        <Label className="mb-2 font-sans text-[8px] uppercase tracking-[0.2em] text-[#514C49]">
                            Contact Number
                        </Label>

                        <div className="relative">
                            <FiPhone className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-[#8A6E68]" />

                            <Input
                                name="contactNumber"
                                type="tel"
                                value={bookingData.contactNumber}
                                onChange={handleBookingChange}
                                placeholder="+880 1XXXXXXXXX"
                                autoComplete="tel"
                                className="h-13 w-full rounded-none border border-[#1A1A1A]/15 bg-transparent pl-11 pr-4 font-serif text-base shadow-none transition focus-within:border-[#8A6E68]"
                            />
                        </div>
                    </TextField>

                    {/* User info */}
                    <div className="mt-6 border border-[#1A1A1A]/10 bg-[#EEE9E4] p-5">
                        <div className="flex items-center gap-3">
                            <FiUser className="text-sm text-[#8A6E68]" />

                            <div>
                                <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#A09A95]">
                                    Your Information
                                </p>

                                <p className="mt-2 font-serif text-lg text-[#1A1A1A]">
                                    {user?.name || "RENTORA User"}
                                </p>

                                <p className="mt-1 font-sans text-[10px] text-[#77716D]">
                                    {user?.email || ""}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="mt-6">
                        <Label
                            htmlFor="notes"
                            className="mb-2 block font-sans text-[8px] uppercase tracking-[0.2em] text-[#514C49]"
                        >
                            Additional Notes
                        </Label>

                        <TextArea
                            id="notes"
                            name="notes"
                            value={bookingData.notes}
                            onChange={handleBookingChange}
                            placeholder="Anything the owner should know before your booking..."
                            rows={5}
                            className="w-full rounded-none border border-[#1A1A1A]/15 bg-transparent px-4 py-3 font-serif text-base leading-7 shadow-none transition focus-within:border-[#8A6E68]"
                        />
                    </div>

                    {/* Confirmation */}
                    <div className="mt-7 border-t border-[#1A1A1A]/10 pt-6">
                        <div className="flex items-start gap-3">
                            <FiCheck className="mt-0.5 shrink-0 text-sm text-[#8A6E68]" />

                            <p className="font-sans text-[10px] leading-5 text-[#77716D]">
                                After confirming your booking information, you will
                                continue to the secure payment page.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onPress={handleClose}
                            isDisabled={isBookingSubmitting}
                            className="h-12 rounded-none px-6 font-sans text-[9px] uppercase tracking-[0.2em] text-[#6F6863] hover:bg-[#EEE9E4]"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="primary"
                            isDisabled={isBookingSubmitting}
                            className="h-12 rounded-none bg-[#1A1A1A] px-6 font-sans text-[9px] uppercase tracking-[0.2em] text-white hover:bg-[#8A6E68]"
                        >
                            {isBookingSubmitting
                                ? "Continuing..."
                                : "Continue to Payment"}

                            {!isBookingSubmitting && <FiArrowUpRight />}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;

"use client";

import React, { useState } from "react";
import { FiStar, FiX } from "react-icons/fi";

const ratingLabels = ["Poor", "Fair", "Good", "Very good", "Excellent"];
const MIN_COMMENT = 10;
const MAX_COMMENT = 500;

const ReviewModal = ({ propertyTitle, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Stars light up for the hovered value first, then the chosen value
    const shownRating = hovered || rating;

    const handleClose = () => {
        if (!isSubmitting) onClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const text = comment.trim();

        if (rating === 0) {
            setError("Please choose a star rating.");
            return;
        }

        if (text.length < MIN_COMMENT) {
            setError(`Please write at least ${MIN_COMMENT} characters.`);
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            await onSubmit({ rating, comment: text });
            onClose();
        } catch (err) {
            setError(err.message || "Could not submit your review.");
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6"
            onMouseDown={(e) => e.target === e.currentTarget && handleClose()}
        >
            {/* max-h-full + overflow-y-auto keeps the box scrollable on short screens */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="review-modal-title"
                className="max-h-full w-full max-w-md overflow-y-auto bg-[#FDFCF9] p-6 sm:p-7"
            >
                {/* Title + close */}
                <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-5">
                    <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#9B9690]">
                            Your review
                        </p>
                        <h2 id="review-modal-title" className="mt-2 font-serif text-2xl">
                            Rate your stay
                        </h2>
                        <p className="mt-1 truncate text-xs text-[#77716C]">
                            {propertyTitle}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close review form"
                        className="text-[#77716C] transition hover:text-[#8A6E68]"
                    >
                        <FiX />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-5">
                    {/* Stars */}
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#9B9690]">
                        Rating
                    </p>

                    <div
                        className="mt-3 flex items-center gap-1"
                        onMouseLeave={() => setHovered(0)}
                    >
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHovered(star)}
                                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                                className="p-1 text-[#8A6E68] transition-transform hover:scale-110"
                            >
                                <FiStar
                                    className={`text-2xl ${
                                        star <= shownRating ? "fill-current" : ""
                                    }`}
                                />
                            </button>
                        ))}

                        <span className="ml-3 font-serif text-sm italic text-[#77716C]">
                            {shownRating ? ratingLabels[shownRating - 1] : "Tap a star"}
                        </span>
                    </div>

                    {/* Comment */}
                    <label
                        htmlFor="review-comment"
                        className="mt-6 block text-[10px] uppercase tracking-[0.18em] text-[#9B9690]"
                    >
                        Your experience
                    </label>

                    <textarea
                        id="review-comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={MAX_COMMENT}
                        rows={5}
                        placeholder="What was the property like? Was the owner helpful?"
                        className="mt-2 w-full resize-none border border-[#1A1A1A]/15 bg-white p-4 text-sm leading-6 outline-none transition placeholder:text-[#AAA49F] focus:border-[#8A6E68]"
                    />

                    <p className="mt-1 text-right text-[10px] text-[#99928C]">
                        {comment.length} / {MAX_COMMENT}
                    </p>

                    {error && (
                        <p
                            role="alert"
                            className="mt-3 border border-[#9A6660]/25 bg-[#FBF1EF] p-3 text-xs text-[#9A6660]"
                        >
                            {error}
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="border border-[#1A1A1A]/10 px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-[#55504C] transition hover:border-[#8A6E68] disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#1A1A1A] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-white transition hover:bg-[#8A6E68] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? "Submitting..." : "Submit review"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
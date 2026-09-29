"use client";

import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import FeedbackModal from "../../Admin/properties/FeedbackModal";

const OwnerFeedbackButton = ({ property, className }) => {
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    const openFeedbackModal = () => {
        setIsFeedbackModalOpen(true);
    };

    const closeFeedbackModal = () => {
        setIsFeedbackModalOpen(false);
    };

    if (
        property?.status !== "Rejected" ||
        !property?.rejectionFeedback
    ) {
        return null;
    }

    return (
        <>
            <button
                type="button"
                onClick={openFeedbackModal}
                className={className}
            >
                <FiEye className="text-xs" />
                View feedback
            </button>

            {isFeedbackModalOpen && (
                <FeedbackModal
                    property={property}
                    onClose={closeFeedbackModal}
                />
            )}
        </>
    );
};

export default OwnerFeedbackButton;
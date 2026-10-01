"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
    Button,
    Input,
    Label,
    ListBox,
    Select,
    TextArea,
    TextField,
} from "@heroui/react";

import {
    FiArrowLeft,
    FiArrowUpRight,
    FiCheck,
    FiImage,
    FiInfo,
    FiMapPin,
    FiPlus,
    FiTrash2,
    FiUser,
} from "react-icons/fi";
import { UpdateProperty } from "@/app/Server/Actions/properties";
import { useRouter } from "next/navigation";

/* =========================================================
   OPTIONS
========================================================= */

const PROPERTY_TYPES = [
    "Apartment",
    "House",
    "Villa",
    "Studio",
    "Condo",
    "Townhouse",
    "Office",
].map((value) => ({
    id: value,
    label: value,
}));

const RENT_TYPES = ["Monthly", "Weekly", "Daily"].map((value) => ({
    id: value,
    label: value,
}));

const SIZE_UNITS = [
    {
        id: "sqft",
        label: "Square Feet (sqft)",
    },
    {
        id: "sqm",
        label: "Square Meters (sqm)",
    },
];

const labelClass =
    "mb-2 block font-sans text-[9px] uppercase tracking-[0.2em] text-[#514C49]";

const inputClass =
    "h-13 w-full rounded-none border border-[#1A1A1A]/15 bg-[#FDFCF9] px-4 font-serif text-base shadow-none transition focus-within:border-[#8A6E68]";


/* =========================================================
   SHARED FIELD COMPONENTS
========================================================= */

const TextInput = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    icon: Icon,
}) => {
    return (
        <TextField name={name} className="w-full">
            <Label className={labelClass}>{label}</Label>

            <div className={Icon ? "relative" : undefined}>
                {Icon && (
                    <Icon className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-[#8A6E68]" />
                )}

                <Input
                    name={name}
                    type={type}
                    min={type === "number" ? "0" : undefined}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${inputClass} ${Icon ? "pl-11 pr-4" : "px-4"
                        }`}
                />
            </div>
        </TextField>
    );
};




const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    rows = 6,
    helper,
}) => {
    return (
        <div>
            <Label htmlFor={name} className={labelClass}>
                {label}
            </Label>

            <TextArea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={`${inputClass} pb-45  leading-7`}
            />

            {helper && (
                <p className="mt-2 font-sans text-[10px] leading-5 text-[#918A85]">
                    {helper}
                </p>
            )}
        </div>
    );
};


const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
}) => {
    return (
        <Select
            value={value}
            onChange={(value) => onChange(name, value)}
            className="w-full"
            variant="secondary"
        >
            <Label className={labelClass}>{label}</Label>

            <Select.Trigger className="h-13 rounded-none border border-[#1A1A1A]/15 bg-[#FDFCF9] shadow-none">
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>

            <Select.Popover className="rounded-none border border-[#1A1A1A]/10 bg-[#FDFCF9] shadow-none">
                <ListBox>
                    {options.map((option) => (
                        <ListBox.Item
                            key={option.id}
                            id={option.id}
                            textValue={option.label}
                        >
                            {option.label}

                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    ))}
                </ListBox>
            </Select.Popover>
        </Select>
    );
};


const SectionHeading = ({ number, title, blurb }) => {
    return (
        <div>
            <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#8A6E68]">
                {number}
            </p>

            <h2 className="mt-2 font-serif text-2xl text-[#1A1A1A]">
                {title}
            </h2>

            <p className="mt-2 max-w-[170px] font-sans text-[10px] leading-5 text-[#918A85]">
                {blurb}
            </p>
        </div>
    );
};


/* =========================================================
   MAIN COMPONENT
========================================================= */

const EditProperty = ({ id, property }) => {
    /*
     * Your API currently returns the property inside an array.
     * The page can pass either the object itself or the whole array.
     */
    const existingProperty = Array.isArray(property)
        ? property[0]
        : property;

    const [formData, setFormData] = useState({
        title: existingProperty?.title || "",

        description: existingProperty?.description || "",

        area: existingProperty?.location?.area || "",
        city: existingProperty?.location?.city || "",
        country: existingProperty?.location?.country || "",

        propertyType: existingProperty?.propertyType || "",

        rent:
            existingProperty?.rent !== undefined
                ? String(existingProperty.rent)
                : "",

        rentType: existingProperty?.rentType || "Monthly",

        bedrooms:
            existingProperty?.bedrooms !== undefined
                ? String(existingProperty.bedrooms)
                : "",

        bathrooms:
            existingProperty?.bathrooms !== undefined
                ? String(existingProperty.bathrooms)
                : "",

        propertySize:
            existingProperty?.propertySize !== undefined
                ? String(existingProperty.propertySize)
                : "",

        sizeUnit: existingProperty?.sizeUnit || "sqft",

        amenities: existingProperty?.amenities?.join("\n") || "",

        extraFeatures:
            existingProperty?.extraFeatures?.join("\n") || "",

        images:
            existingProperty?.images?.length > 0
                ? [...existingProperty.images]
                : [""],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    /* =====================================================
       CHANGE HANDLERS
    ====================================================== */

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        setErrorMessage("");
        setSuccessMessage("");
    };


    const handleSelectChange = (name, value) => {
        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        setErrorMessage("");
        setSuccessMessage("");
    };


    const handleImageChange = (index, value) => {
        setFormData((previousData) => {
            const images = [...previousData.images];

            images[index] = value;

            return {
                ...previousData,
                images,
            };
        });

        setErrorMessage("");
        setSuccessMessage("");
    };


    const addImageField = () => {
        setFormData((previousData) => ({
            ...previousData,
            images: [...previousData.images, ""],
        }));
    };


    const removeImageField = (index) => {
        if (formData.images.length === 1) {
            return;
        }

        setFormData((previousData) => ({
            ...previousData,
            images: previousData.images.filter(
                (_, imageIndex) => imageIndex !== index
            ),
        }));
    };


    /* =====================================================
       HELPERS
    ====================================================== */

    const toList = (value) => {
        return value
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean);
    };


    const validateForm = () => {
        if (!formData.title.trim()) {
            return "Please enter a property title.";
        }

        if (!formData.description.trim()) {
            return "Please enter a property description.";
        }

        if (!formData.area.trim()) {
            return "Please enter the area.";
        }

        if (!formData.city.trim()) {
            return "Please enter the city.";
        }

        if (!formData.country.trim()) {
            return "Please enter the country.";
        }

        if (!formData.propertyType) {
            return "Please select a property type.";
        }

        if (!formData.rent || Number(formData.rent) <= 0) {
            return "Please enter a valid rent amount.";
        }

        if (
            formData.bedrooms === "" ||
            Number(formData.bedrooms) < 0
        ) {
            return "Please enter the number of bedrooms.";
        }

        if (
            formData.bathrooms === "" ||
            Number(formData.bathrooms) < 0
        ) {
            return "Please enter the number of bathrooms.";
        }

        if (
            !formData.propertySize ||
            Number(formData.propertySize) <= 0
        ) {
            return "Please enter the property size.";
        }

        const validImages = formData.images
            .map((image) => image.trim())
            .filter(Boolean);

        if (validImages.length === 0) {
            return "Please add at least one property image.";
        }

        if (
            validImages.some(
                (image) => !/^https?:\/\//.test(image)
            )
        ) {
            return "Each image must be a valid image URL.";
        }

        return null;
    };

    const router = useRouter();


    /* =====================================================
       SUBMIT
    ====================================================== */

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");

        const validationError = validateForm();

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            setIsSubmitting(true);

            const updatedProperty = {
                title: formData.title.trim(),
                description: formData.description.trim(),

                location: {
                    area: formData.area.trim(),
                    city: formData.city.trim(),
                    country: formData.country.trim(),
                },
                propertyType: formData.propertyType,
                rent: Number(formData.rent),
                rentType: formData.rentType,
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                propertySize: Number(formData.propertySize),
                sizeUnit: formData.sizeUnit,
                amenities: toList(formData.amenities),
                images: formData.images
                    .map((image) => image.trim())
                    .filter(Boolean),

                extraFeatures: toList(
                    formData.extraFeatures
                ),

                /*
                 * Keep these existing values.
                 * They are not editable through this form.
                 */
                status: existingProperty?.status,

                ownerInformation:
                    existingProperty?.ownerInformation,
            };

            console.log("Updated property:", updatedProperty);

            const result = await UpdateProperty(updatedProperty, id || existingProperty?._id);
            if (result.matchedCount === 0) {
                throw new Error("Property not found.");
            }

            
            setSuccessMessage(
                "Property information has been prepared successfully."
            );
            router.back();
        } catch (error) {
            console.error("Edit property error:", error);

            setErrorMessage(
                error.message ||
                "Something went wrong while updating the property."
            );
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <main className="min-w-0">

            {/* =====================================================
                HEADER
            ====================================================== */}

            <section className="border-b border-[#1A1A1A]/10 pb-8">

                <Link
                    href="/dashboard/admin/properties"
                    className="mb-7 inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#77716D] transition-colors hover:text-[#8A6E68]"
                >
                    <FiArrowLeft />

                    All Properties
                </Link>

                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

                    <div>

                        <div className="mb-4 flex items-center gap-4">
                            <span className="h-px w-8 bg-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#A09A95]">
                                Property Management
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl leading-none tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl lg:text-[54px]">
                            Edit property.
                        </h1>

                        <p className="mt-4 max-w-xl font-serif text-base leading-7 text-[#77716D] sm:text-lg">
                            Update the information for this RENTORA
                            property listing.
                        </p>

                    </div>

                    {/* Current status */}
                    <div className="flex items-center gap-3 border-l border-[#8A6E68] pl-4">

                        <div>
                            <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                Current Status
                            </p>

                            <p className="mt-1 font-serif text-lg text-[#1A1A1A]">
                                {existingProperty?.status ||
                                    "Pending"}
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* =====================================================
                FORM
            ====================================================== */}

            <form
                onSubmit={handleSubmit}
                className="py-8 sm:py-10 lg:py-12"
            >

                {/* =================================================
                    MESSAGES
                ================================================== */}

                {errorMessage && (
                    <div
                        role="alert"
                        className="mb-8 border border-[#8A6E68]/30 bg-[#8A6E68]/5 px-5 py-4"
                    >
                        <div className="flex items-start gap-3">

                            <FiInfo className="mt-0.5 shrink-0 text-[#8A6E68]" />

                            <p className="font-sans text-xs leading-5 text-[#694D48]">
                                {errorMessage}
                            </p>

                        </div>
                    </div>
                )}

                {successMessage && (
                    <div
                        role="status"
                        className="mb-8 border border-[#65745D]/30 bg-[#65745D]/5 px-5 py-4"
                    >
                        <div className="flex items-center gap-3">

                            <FiCheck className="shrink-0 text-[#65745D]" />

                            <p className="font-sans text-xs leading-5 text-[#4F5C49]">
                                {successMessage}
                            </p>

                        </div>
                    </div>
                )}


                {/* =================================================
                    01 — PROPERTY
                ================================================== */}

                <section className="border-b border-[#1A1A1A]/10 pb-10 sm:pb-12">

                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">

                        <SectionHeading
                            number="01"
                            title="Property"
                            blurb="The essential details of the listing."
                        />

                        <div className="space-y-6">

                            <TextInput
                                label="Property Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Property title"
                            />

                            <TextAreaField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the property..."
                                rows={7}
                            />

                        </div>
                    </div>
                </section>


                {/* =================================================
                    02 — LOCATION
                ================================================== */}

                <section className="border-b border-[#1A1A1A]/10 py-10 sm:py-12">

                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">

                        <SectionHeading
                            number="02"
                            title="Location"
                            blurb="The current property location."
                        />

                        <div className="grid gap-6 sm:grid-cols-2">

                            <TextInput
                                label="Area"
                                name="area"
                                icon={FiMapPin}
                                value={formData.area}
                                onChange={handleChange}
                            />

                            <TextInput
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />

                            <TextInput
                                label="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />

                        </div>
                    </div>
                </section>


                {/* =================================================
                    03 — DETAILS
                ================================================== */}

                <section className="border-b border-[#1A1A1A]/10 py-10 sm:py-12">

                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">

                        <SectionHeading
                            number="03"
                            title="Details"
                            blurb="Pricing, type, size and rooms."
                        />

                        <div className="grid gap-6 sm:grid-cols-2">

                            <SelectField
                                label="Property Type"
                                name="propertyType"
                                value={formData.propertyType}
                                onChange={handleSelectChange}
                                options={PROPERTY_TYPES}
                            />

                            <TextInput
                                label="Rent"
                                name="rent"
                                type="number"
                                value={formData.rent}
                                onChange={handleChange}
                            />

                            <SelectField
                                label="Rent Type"
                                name="rentType"
                                value={formData.rentType}
                                onChange={handleSelectChange}
                                options={RENT_TYPES}
                            />

                            <TextInput
                                label="Bedrooms"
                                name="bedrooms"
                                type="number"
                                value={formData.bedrooms}
                                onChange={handleChange}
                            />

                            <TextInput
                                label="Bathrooms"
                                name="bathrooms"
                                type="number"
                                value={formData.bathrooms}
                                onChange={handleChange}
                            />

                            <TextInput
                                label="Property Size"
                                name="propertySize"
                                type="number"
                                value={formData.propertySize}
                                onChange={handleChange}
                            />

                            <SelectField
                                label="Size Unit"
                                name="sizeUnit"
                                value={formData.sizeUnit}
                                onChange={handleSelectChange}
                                options={SIZE_UNITS}
                            />

                        </div>
                    </div>
                </section>


                {/* =================================================
                    04 — FEATURES
                ================================================== */}

                <section className="border-b border-[#1A1A1A]/10 py-10 sm:py-12">

                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">

                        <SectionHeading
                            number="04"
                            title="Features"
                            blurb="Amenities and additional property features."
                        />

                        <div className="grid gap-6 md:grid-cols-2">

                            <TextAreaField
                                label="Amenities"
                                name="amenities"
                                value={formData.amenities}
                                onChange={handleChange}
                                placeholder={
                                    "Balcony\nElevator\nSecurity\nParking"
                                }
                                rows={9}
                                helper="One amenity per line."
                            />

                            <TextAreaField
                                label="Extra Features"
                                name="extraFeatures"
                                value={formData.extraFeatures}
                                onChange={handleChange}
                                placeholder={
                                    "Green neighborhood\nNear schools\nFamily-friendly"
                                }
                                rows={9}
                                helper="One feature per line."
                            />

                        </div>
                    </div>
                </section>


                {/* =================================================
                    05 — IMAGES
                ================================================== */}

                <section className="border-b border-[#1A1A1A]/10 py-10 sm:py-12">

                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">

                        <SectionHeading
                            number="05"
                            title="Images"
                            blurb="Edit the property's image URLs."
                        />

                        <div>

                            <div className="space-y-3">

                                {formData.images.map(
                                    (image, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3"
                                        >

                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#1A1A1A]/10 bg-[#EEE9E4]">
                                                <FiImage className="text-sm text-[#8A6E68]" />
                                            </div>

                                            <Input
                                                type="url"
                                                value={image}
                                                onChange={(event) =>
                                                    handleImageChange(
                                                        index,
                                                        event.target
                                                            .value
                                                    )
                                                }
                                                placeholder="https://i.ibb.co/your-image.jpg"
                                                className="h-13 min-w-0 flex-1 rounded-none border border-[#1A1A1A]/15 bg-[#FDFCF9] px-4 font-serif text-sm shadow-none transition focus-within:border-[#8A6E68]"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeImageField(
                                                        index
                                                    )
                                                }
                                                disabled={
                                                    formData.images
                                                        .length === 1
                                                }
                                                aria-label={`Remove image ${index + 1
                                                    }`}
                                                className="flex h-11 w-11 shrink-0 items-center justify-center text-[#9B938D] transition hover:text-[#8A6E68] disabled:cursor-not-allowed disabled:opacity-30"
                                            >
                                                <FiTrash2 className="text-sm" />
                                            </button>

                                        </div>
                                    )
                                )}

                            </div>


                            <button
                                type="button"
                                onClick={addImageField}
                                className="group mt-5 inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.18em] text-[#77716D] transition hover:text-[#1A0F04]"
                            >
                                <FiPlus className="text-xs" />

                                Add Another Image
                            </button>

                            <p className="mt-4 font-sans text-[10px] leading-5 text-[#918A85]">
                                The first image is treated as the primary
                                property image.
                            </p>

                        </div>
                    </div>
                </section>


                {/* =================================================
                    06 — OWNER INFORMATION
                ================================================== */}

                <section className="border-b border-[#1A1A1A]/10 py-10 sm:py-12">

                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">

                        <SectionHeading
                            number="06"
                            title="Owner"
                            blurb="Existing ownership information."
                        />

                        <div className="border border-[#1A1A1A]/10 bg-[#EEE9E4] p-5 sm:p-6">

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <div className="flex items-center gap-2">
                                        <FiUser className="text-xs text-[#8A6E68]" />

                                        <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#8A6E68]">
                                            Owner Name
                                        </p>
                                    </div>

                                    <p className="mt-2 font-serif text-lg text-[#1A1A1A]">
                                        {existingProperty
                                            ?.ownerInformation?.name ||
                                            "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#8A6E68]">
                                        Owner Email
                                    </p>

                                    <p className="mt-2 break-all font-sans text-xs text-[#625D58]">
                                        {existingProperty
                                            ?.ownerInformation?.email ||
                                            "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#8A6E68]">
                                        Phone
                                    </p>

                                    <p className="mt-2 font-sans text-xs text-[#625D58]">
                                        {existingProperty
                                            ?.ownerInformation?.phone ||
                                            "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#8A6E68]">
                                        Owner ID
                                    </p>

                                    <p className="mt-2 break-all font-sans text-xs text-[#625D58]">
                                        {existingProperty
                                            ?.ownerInformation?.ownerId ||
                                            "—"}
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>


                {/* =================================================
                    07 — REVIEW
                ================================================== */}

                <section className="py-10 sm:py-12">

                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">

                        <SectionHeading
                            number="07"
                            title="Review"
                            blurb="Current moderation status of this listing."
                        />

                        <div>

                            <div className="border border-[#1A1A1A]/10 bg-[#EEE9E4] p-5 sm:p-6">

                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                    <div>
                                        <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#8A6E68]">
                                            Listing Status
                                        </p>

                                        <p className="mt-2 font-serif text-2xl text-[#1A1A1A]">
                                            {existingProperty
                                                ?.status ||
                                                "Pending"}
                                        </p>

                                        <p className="mt-2 max-w-xl font-sans text-[10px] leading-5 text-[#77716D]">
                                            The current moderation status is
                                            preserved when this property is
                                            updated.
                                        </p>
                                    </div>

                                    <span className="inline-flex w-fit items-center gap-2 border border-[#8A6E68]/25 bg-white/50 px-3 py-2 font-sans text-[8px] uppercase tracking-[0.18em] text-[#8A6E68]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#8A6E68]" />

                                        {existingProperty?.status ||
                                            "Pending"}
                                    </span>

                                </div>
                            </div>


                            <div className="mt-5 flex gap-4 border-t border-[#1A1A1A]/10 pt-5">
                                <FiInfo className="mt-0.5 shrink-0 text-sm text-[#8A6E68]" />

                                <p className="font-sans text-[10px] leading-5 text-[#817A75]">
                                    Owner information and the existing listing
                                    status are preserved automatically.
                                    Only the property information above will
                                    be updated.
                                </p>
                            </div>


                            {/* ACTIONS */}

                            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                                <Link
                                    href="/dashboard/admin/properties"
                                    className="w-full sm:w-auto"
                                >
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="h-12 w-full rounded-none px-7 font-sans text-[9px] uppercase tracking-[0.2em] text-[#6D6762] transition hover:bg-[#EEE9E4] hover:text-[#1A1A1A] sm:w-auto"
                                    >
                                        Cancel
                                    </Button>
                                </Link>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    isDisabled={isSubmitting}
                                    className="h-12 w-full rounded-none bg-[#1A1A1A] px-7 font-sans text-[9px] uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#8A6E68] sm:w-auto"
                                >
                                    {isSubmitting
                                        ? "Updating..."
                                        : "Update Property"}

                                    {!isSubmitting && (
                                        <FiArrowUpRight className="text-sm" />
                                    )}
                                </Button>

                            </div>

                        </div>
                    </div>
                </section>
            </form>
        </main>
    );
};

export default EditProperty;
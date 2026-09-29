"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
} from "react-icons/fi";
import { getUser } from "@/lib/getUser";
import { createProperty } from "@/app/Server/Actions/properties";

/* =========================================================
   CONFIG / OPTIONS
========================================================= */
const PROPERTY_TYPES = [
    "Apartment",
    "House",
    "Villa",
    "Studio",
    "Condo",
    "Townhouse",
    "Office",
].map((v) => ({ id: v, label: v }));

const RENT_TYPES = ["Monthly", "Weekly", "Daily"].map((v) => ({
    id: v,
    label: v,
}));

const SIZE_UNITS = [
    { id: "sqft", label: "Square Feet (sqft)" },
    { id: "sqm", label: "Square Meters (sqm)" },
];

const REQUIRED_TEXT_FIELDS = [
    ["title", "Please enter a property title."],
    ["description", "Please enter a property description."],
    ["area", "Please enter the area."],
    ["city", "Please enter the city."],
    ["country", "Please enter the country."],
    ["propertyType", "Please select a property type."],
];

const labelClass =
    "mb-2 block font-sans text-[9px] uppercase tracking-[0.2em] text-[#514C49]";
const inputClass =
    "h-13 w-full rounded-none border border-[#1A1A1A]/15 bg-[#FDFCF9] px-4 font-serif text-base shadow-none transition focus-within:border-[#8A6E68]";

/* =========================================================
   SHARED FIELD COMPONENTS
========================================================= */
const TextInput = ({ label, name, type = "text", value, onChange, placeholder, icon: Icon, required }) => (
    <TextField name={name} type={type} isRequired={required} className="w-full">
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
                className={`${inputClass} ${Icon ? "pl-11 pr-4" : "px-4"}`}
            />
        </div>
    </TextField>
);

const TextAreaField = ({ label, name, value, onChange, placeholder, rows = 6, helper }) => (
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
            className={`${inputClass} py-3 leading-7`}
        />
        {helper && (
            <p className="mt-2 font-sans text-[10px] leading-5 text-[#918A85]">{helper}</p>
        )}
    </div>
);

const SelectField = ({ label, name, value, onChange, options, required }) => (
    <Select
        value={value}
        onChange={(v) => onChange(name, v)}
        placeholder={required ? `Select ${label.toLowerCase()}` : undefined}
        className="w-full"
        variant="secondary"
        isRequired={required}
    >
        <Label className={labelClass}>{label}</Label>
        <Select.Trigger className="h-13 rounded-none border border-[#1A1A1A]/15 bg-[#FDFCF9] shadow-none">
            <Select.Value />
            <Select.Indicator />
        </Select.Trigger>
        <Select.Popover className="rounded-none border border-[#1A1A1A]/10 bg-[#FDFCF9] shadow-none">
            <ListBox>
                {options.map((opt) => (
                    <ListBox.Item key={opt.id} id={opt.id} textValue={opt.label}>
                        {opt.label}
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                ))}
            </ListBox>
        </Select.Popover>
    </Select>
);

const SectionHeading = ({ number, title, blurb }) => (
    <div>
        <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#8A6E68]">{number}</p>
        <h2 className="mt-2 font-serif text-2xl text-[#1A1A1A]">{title}</h2>
        <p className="mt-2 max-w-[160px] font-sans text-[10px] leading-5 text-[#918A85]">{blurb}</p>
    </div>
);

/* =========================================================
   MAIN COMPONENT
========================================================= */
const AddProperties = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        area: "",
        city: "",
        country: "Bangladesh",
        propertyType: "",
        rent: "",
        rentType: "Monthly",
        bedrooms: "",
        bathrooms: "",
        propertySize: "",
        sizeUnit: "sqft",
        amenities: "",
        extraFeatures: "",
        images: [""],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const clearMessages = () => {
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        clearMessages();
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        clearMessages();
    };

    const handleImageChange = (index, value) => {
        setFormData((prev) => {
            const images = [...prev.images];
            images[index] = value;
            return { ...prev, images };
        });
        clearMessages();
    };

    const addImageField = () =>
        setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));

    const removeImageField = (index) => {
        if (formData.images.length === 1) return;
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const validateForm = () => {
        for (const [field, message] of REQUIRED_TEXT_FIELDS) {
            if (!formData[field]?.toString().trim()) return message;
        }

        if (!formData.rent || Number(formData.rent) <= 0)
            return "Please enter a valid rent amount.";
        if (!formData.bedrooms || Number(formData.bedrooms) < 0)
            return "Please enter the number of bedrooms.";
        if (!formData.bathrooms || Number(formData.bathrooms) < 0)
            return "Please enter the number of bathrooms.";
        if (!formData.propertySize || Number(formData.propertySize) <= 0)
            return "Please enter the property size.";

        const validImages = formData.images.map((img) => img.trim()).filter(Boolean);
        if (validImages.length === 0) return "Please add at least one property image.";
        if (validImages.some((img) => !/^https?:\/\//.test(img)))
            return "Each image must be a valid image URL.";

        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        clearMessages();

        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            setIsSubmitting(true);

            const toList = (text) =>
                text.split("\n").map((item) => item.trim()).filter(Boolean);

            const user = await getUser();

            /*
             * Status is intentionally NOT taken from the form.
             * New owner properties should start as Pending.
             * ownerInformation should also be created by the
             * backend from the authenticated user.
             */
            const propertyData = {
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
                images: formData.images.map((img) => img.trim()).filter(Boolean),
                extraFeatures: toList(formData.extraFeatures),
                ownerInformation: {
                    ownerId: user?.id,
                    name: user?.name,
                    email: user?.email,
                    phone: user?.phone,
                    photo: user?.image,
                },
                status: "Pending",
            };

            /* Change this endpoint if your backend uses a different route. */
            const response = await createProperty(propertyData);

            if (!response.ok) {
                throw new Error(response.data.message || "Unable to create the property.");
            }

            setSuccessMessage("Your property has been submitted for approval.");

            setTimeout(() => {
                router.push("/dashboard/Owner/properties");
                router.refresh();
            }, 900);
        } catch (error) {
            console.error("Add property error:", error);
            setErrorMessage(error.message || "Something went wrong while adding your property.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-w-0">
            {/* HEADER */}
            <section className="border-b border-[#1A1A1A]/10 pb-7 sm:pb-8">
                <Link
                    href="/dashboard/Owner"
                    className="mb-7 inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#77716D] transition-colors hover:text-[#8A6E68]"
                >
                    <FiArrowLeft />
                    Owner Dashboard
                </Link>

                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mb-4 flex items-center gap-4">
                            <span className="h-px w-8 bg-[#8A6E68]" />
                            <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#A09A95]">
                                New Listing
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl leading-none tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl lg:text-[54px]">
                            Add a property.
                        </h1>

                        <p className="mt-4 max-w-xl font-serif text-base leading-7 text-[#77716D] sm:text-lg">
                            Tell prospective tenants what makes your property worth calling home.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 border-l border-[#8A6E68] pl-4">
                        <div>
                            <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A09A95]">
                                Initial Status
                            </p>
                            <p className="mt-1 font-serif text-lg text-[#1A1A1A]">Pending Review</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="py-8 sm:py-10 lg:py-12">
                {errorMessage && (
                    <div role="alert" className="mb-8 border border-[#8A6E68]/30 bg-[#8A6E68]/5 px-5 py-4">
                        <div className="flex items-start gap-3">
                            <FiInfo className="mt-0.5 shrink-0 text-[#8A6E68]" />
                            <p className="font-sans text-xs leading-5 text-[#694D48]">{errorMessage}</p>
                        </div>
                    </div>
                )}

                {successMessage && (
                    <div role="status" className="mb-8 border border-[#65745D]/30 bg-[#65745D]/5 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <FiCheck className="shrink-0 text-[#65745D]" />
                            <p className="font-sans text-xs leading-5 text-[#4F5C49]">{successMessage}</p>
                        </div>
                    </div>
                )}

                {/* 01 — PROPERTY INFORMATION */}
                <section className="border-b border-[#1A1A1A]/10 pb-10 sm:pb-12">
                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">
                        <SectionHeading number="01" title="Property" blurb="The essential details of your listing." />

                        <div className="space-y-6">
                            <TextInput
                                label="Property Title"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Elegant Gulshan Lake Residence"
                            />

                            <TextAreaField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the property, neighborhood, atmosphere, and anything that makes it special..."
                                rows={6}
                                helper="Give tenants enough information to understand the property before booking."
                            />
                        </div>
                    </div>
                </section>

                {/* 02 — LOCATION */}
                <section className="border-b border-[#1A1A1A]/10 py-10 sm:py-12">
                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">
                        <SectionHeading number="02" title="Location" blurb="Where your property is located." />

                        <div className="grid gap-6 sm:grid-cols-2">
                            <TextInput
                                label="Area"
                                name="area"
                                required
                                icon={FiMapPin}
                                value={formData.area}
                                onChange={handleChange}
                                placeholder="Gulshan-2"
                            />
                            <TextInput
                                label="City"
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Dhaka"
                            />
                            <TextInput
                                label="Country"
                                name="country"
                                required
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Bangladesh"
                            />
                        </div>
                    </div>
                </section>

                {/* 03 — PROPERTY DETAILS */}
                <section className="border-b border-[#1A1A1A]/10 py-10 sm:py-12">
                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">
                        <SectionHeading number="03" title="Details" blurb="Pricing, type, size and room information." />

                        <div className="grid gap-6 sm:grid-cols-2">
                            <SelectField
                                label="Property Type"
                                name="propertyType"
                                required
                                value={formData.propertyType}
                                onChange={handleSelectChange}
                                options={PROPERTY_TYPES}
                            />

                            <TextInput
                                label="Rent"
                                name="rent"
                                type="number"
                                required
                                value={formData.rent}
                                onChange={handleChange}
                                placeholder="85000"
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
                                required
                                value={formData.bedrooms}
                                onChange={handleChange}
                                placeholder="3"
                            />

                            <TextInput
                                label="Bathrooms"
                                name="bathrooms"
                                type="number"
                                required
                                value={formData.bathrooms}
                                onChange={handleChange}
                                placeholder="3"
                            />

                            <TextInput
                                label="Property Size"
                                name="propertySize"
                                type="number"
                                required
                                value={formData.propertySize}
                                onChange={handleChange}
                                placeholder="1850"
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

                {/* 04 — FEATURES */}
                <section className="border-b border-[#1A1A1A]/10 py-10 sm:py-12">

                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">

                        <div>
                            <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#8A6E68]">
                                04
                            </p>

                            <h2 className="mt-2 font-serif text-2xl text-[#1A1A1A]">
                                Features
                            </h2>

                            <p className="mt-2 max-w-[160px] font-sans text-[10px] leading-5 text-[#918A85]">
                                Tell tenants what makes the property special.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">

                            {/* Amenities */}
                            <div>
                                <Label
                                    htmlFor="amenities"
                                    className="mb-2 block font-sans text-[9px] uppercase tracking-[0.2em] text-[#514C49]"
                                >
                                    Amenities
                                </Label>

                                <TextArea
                                    id="amenities"
                                    name="amenities"
                                    value={formData.amenities}
                                    onChange={handleChange}
                                    placeholder={`High-speed WiFi
Air Conditioning
Generator Backup
Elevator
Parking`}
                                    rows={8}
                                    className="w-full rounded-none border border-[#1A1A1A]/15 bg-[#FDFCF9] px-4 py-3 font-serif text-base leading-7 shadow-none transition focus-within:border-[#8A6E68]"
                                />

                                <p className="mt-2 font-sans text-[10px] text-[#918A85]">
                                    Enter one amenity per line.
                                </p>
                            </div>

                            {/* Extra Features */}
                            <div>
                                <Label
                                    htmlFor="extraFeatures"
                                    className="mb-2 block font-sans text-[9px] uppercase tracking-[0.2em] text-[#514C49]"
                                >
                                    Extra Features
                                </Label>

                                <TextArea
                                    id="extraFeatures"
                                    name="extraFeatures"
                                    value={formData.extraFeatures}
                                    onChange={handleChange}
                                    placeholder={`Lake-side neighborhood
24/7 security
Dedicated parking
Large windows
Modern kitchen`}
                                    rows={8}
                                    className="w-full rounded-none border border-[#1A1A1A]/15 bg-[#FDFCF9] px-4 py-3 font-serif text-base leading-7 shadow-none transition focus-within:border-[#8A6E68]"
                                />

                                <p className="mt-2 font-sans text-[10px] text-[#918A85]">
                                    Enter one feature per line.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 05 — IMAGES */}
                <section className="border-b border-[#1A1A1A]/10 py-10 sm:py-12">
                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">
                        <SectionHeading number="05" title="Images" blurb="Add high-quality images of your property." />

                        <div>
                            <div className="space-y-3">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#1A1A1A]/10 bg-[#EEE9E4]">
                                            <FiImage className="text-sm text-[#8A6E68]" />
                                        </div>

                                        <Input
                                            type="url"
                                            value={image}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                            placeholder="https://i.ibb.co/your-image.jpg"
                                            className="h-13 min-w-0 flex-1 rounded-none border border-[#1A1A1A]/15 bg-[#FDFCF9] px-4 font-serif text-sm shadow-none transition focus-within:border-[#8A6E68]"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeImageField(index)}
                                            disabled={formData.images.length === 1}
                                            aria-label={`Remove image ${index + 1}`}
                                            className="flex h-11 w-11 shrink-0 items-center justify-center text-[#9B938D] transition hover:text-[#8A6E68] disabled:cursor-not-allowed disabled:opacity-30"
                                        >
                                            <FiTrash2 className="text-sm" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* //Add Another Image Button clickable cursor */}
                            <button
                                type="button"
                                onClick={addImageField}
                                className="group mt-5 inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.18em] text-[#77716D] transition hover:text-[#1a0f04]"
                            >
                                <FiPlus className="text-xs" />
                                Add Another Image
                            </button>

                            <p className="mt-4 font-sans text-[10px] leading-5 text-[#918A85]">
                                Use direct image URLs such as ImgBB links. The first image can be used as the
                                property's primary image.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 06 — REVIEW */}
                <section className="py-10 sm:py-12">
                    <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">
                        <SectionHeading number="06" title="Review" blurb="Your listing will be reviewed before going live." />

                        <div>
                            <div className="border border-[#1A1A1A]/10 bg-[#EEE9E4] p-5 sm:p-6">
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#8A6E68]">
                                            Listing Status
                                        </p>
                                        <p className="mt-2 font-serif text-2xl text-[#1A1A1A]">Pending</p>
                                        <p className="mt-2 max-w-xl font-sans text-[10px] leading-5 text-[#77716D]">
                                            New properties are submitted for admin approval before they appear
                                            publicly on RENTORA.
                                        </p>
                                    </div>

                                    <span className="inline-flex w-fit items-center gap-2 border border-[#8A6E68]/25 bg-white/40 px-3 py-2 font-sans text-[8px] uppercase tracking-[0.18em] text-[#8A6E68]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#8A6E68]" />
                                        Awaiting Review
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 flex gap-4 border-t border-[#1A1A1A]/10 pt-5">
                                <FiInfo className="mt-0.5 shrink-0 text-sm text-[#8A6E68]" />
                                <p className="font-sans text-[10px] leading-5 text-[#817A75]">
                                    Your owner information will be attached automatically from your authenticated
                                    RENTORA account. You do not need to enter it manually.
                                </p>
                            </div>

                            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <Link href="/dashboard/Owner/properties" className="w-full sm:w-auto">
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
                                    {isSubmitting ? "Submitting..." : "Submit Property"}
                                    {!isSubmitting && <FiArrowUpRight className="text-sm" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </main>
    );
};

export default AddProperties;
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    Button,
    Input,
    Label,
    Radio,
    RadioGroup,
    TextField,
} from "@heroui/react";

import {
    FiArrowLeft,
    FiArrowUpRight,
    FiEye,
    FiEyeOff,
    FiImage,
    FiLock,
    FiMail,
    FiUser,
} from "react-icons/fi";

import { FcGoogle } from "react-icons/fc";

import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        image: "",
        role: "Tenant",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        if (errorMessage) {
            setErrorMessage("");
        }
    };

    const handleRoleChange = (value) => {
        setFormData((previousData) => ({
            ...previousData,
            role: value,
        }));

        if (errorMessage) {
            setErrorMessage("");
        }
    };

    const validateForm = () => {
        const name = formData.name.trim();
        const email = formData.email.trim();
        const image = formData.image.trim();

        if (!name) {
            return "Please enter your full name.";
        }

        if (!email) {
            return "Please enter your email address.";
        }

        if (!image) {
            return "Please add your profile photo URL.";
        }

        if (!formData.role) {
            return "Please select an account type.";
        }

        if (formData.role !== "Tenant" && formData.role !== "Owner") {
            return "Invalid account type.";
        }

        if (formData.password.length < 8) {
            return "Password must contain at least 8 characters.";
        }

        if (formData.password !== formData.confirmPassword) {
            return "Passwords do not match.";
        }

        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            setIsSubmitting(true);
            const { data, error } = await authClient.signUp.email({
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                image: formData.image.trim(),
                callbackURL: "/",
            });
            if (error) {
                console.error("Better Auth signup error:", error);
                setErrorMessage(
                    error.message ||
                        "Unable to create your account. Please try again."
                );
                return;
            }
            if (!data?.user) {
                setErrorMessage(
                    "Account creation was unsuccessful. Please try again."
                );

                return;
            }
            const roleResponse = await fetch("/api/users/set-role", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: formData.role,
                }),
            });

            const roleResult = await roleResponse.json();

            if (!roleResponse.ok) {
                console.error(
                    "Role assignment error:",
                    roleResult
                );

                setErrorMessage(
                    roleResult.message ||
                        "Your account was created, but the account type could not be saved."
                );

                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Registration error:", error);

            setErrorMessage(
                "Something went wrong while creating your account."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleRegister = async () => {
        setErrorMessage("");

        try {
            setIsGoogleLoading(true);

            /*
             * The project requirement says Google users must
             * automatically receive the Tenant role.
             */
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            console.error("Google signup error:", error);

            setErrorMessage(
                "Unable to continue with Google. Please try again."
            );

            setIsGoogleLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid min-h-screen lg:grid-cols-2">

                    {/* =====================================================
                        LEFT EDITORIAL SECTION
                    ===================================================== */}
                    <section className="relative hidden min-h-screen overflow-hidden border-r border-black/10 py-10 lg:flex lg:flex-col lg:justify-between lg:pr-14 xl:pr-20">

                        {/* Decorative letter */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-20 -left-16 select-none font-serif text-[28rem] leading-none text-[#EDEBE8]"
                        >
                            R
                        </div>

                        {/* Top */}
                        <div className="relative z-10">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.25em] text-[#77716D] transition hover:text-[#8A6E68]"
                            >
                                <FiArrowLeft />
                                Back to home
                            </Link>
                        </div>

                        {/* Main Editorial Content */}
                        <div className="relative z-10 py-10 xl:py-16">

                            <div className="mb-7 flex items-center gap-4">
                                <span className="h-px w-12 bg-[#8A6E68]" />

                                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#8A6E68]">
                                    Begin your journey
                                </span>
                            </div>

                            <h1 className="max-w-2xl font-serif text-6xl leading-[0.94] tracking-[-0.02em] text-[#1A1A1A] xl:text-7xl">
                                Find a place
                                <br />
                                to call your own.
                            </h1>

                            <p className="mt-8 max-w-lg font-serif text-lg leading-8 text-[#6A6561]">
                                Whether you are searching for your next home
                                or sharing a space with someone new, RENTORA
                                brings property and people together.
                            </p>

                            <div className="mt-12 max-w-md border-t border-black/10 pt-6">
                                <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#8A6E68]">
                                    RENTORA
                                </p>

                                <p className="mt-2 font-serif text-2xl">
                                    Property & Living
                                </p>
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="relative z-10 flex items-center justify-between border-t border-black/10 pt-5">
                            <p className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#8A8581]">
                                A more thoughtful way to rent
                            </p>

                            <span className="font-serif text-lg tracking-[0.2em]">
                                01
                            </span>
                        </div>
                    </section>

                    {/* =====================================================
                        REGISTER SECTION
                    ===================================================== */}
                    <section className="flex min-h-screen items-center justify-center py-10 lg:py-16 lg:pl-14 xl:pl-20">

                        <div className="w-full max-w-xl">

                            {/* Mobile Logo */}
                            <div className="mb-10 lg:hidden">
                                <Link
                                    href="/"
                                    className="inline-block"
                                >
                                    <span className="block font-serif text-3xl tracking-[0.23em]">
                                        RENTORA
                                    </span>

                                    <span className="mt-1 block font-sans text-[7px] uppercase tracking-[0.45em] text-[#8A6E68]">
                                        Property & Living
                                    </span>
                                </Link>
                            </div>

                            {/* Page Heading */}
                            <div>
                                <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#8A6E68]">
                                    Create an account
                                </p>

                                <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                                    Welcome to RENTORA.
                                </h2>

                                <p className="mt-5 max-w-lg font-serif text-base leading-7 text-[#6A6561]">
                                    Create your account to discover
                                    properties, save your favorites, and
                                    manage your rental journey.
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="my-8 flex items-center gap-4">
                                <span className="h-px flex-1 bg-black/10" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#99918D]">
                                    Register
                                </span>

                                <span className="h-px flex-1 bg-black/10" />
                            </div>

                            {/* Error */}
                            {errorMessage && (
                                <div
                                    role="alert"
                                    className="mb-6 border border-[#8A6E68]/30 bg-[#8A6E68]/5 px-4 py-3"
                                >
                                    <p className="font-sans text-xs leading-5 text-[#694D48]">
                                        {errorMessage}
                                    </p>
                                </div>
                            )}

                            {/* =================================================
                                FORM
                            ================================================= */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >

                                {/* Full Name */}
                                <TextField
                                    name="name"
                                    type="text"
                                    isRequired
                                    className="w-full"
                                >
                                    <Label className="mb-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#514C49]">
                                        Full Name
                                    </Label>

                                    <div className="relative">
                                        <FiUser
                                            aria-hidden="true"
                                            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-[#8A6E68]"
                                        />

                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            autoComplete="name"
                                            className="h-13 w-full rounded-none border border-black/15 bg-transparent pl-11 pr-4 font-serif text-base shadow-none transition focus-within:border-[#8A6E68]"
                                        />
                                    </div>
                                </TextField>

                                {/* Email */}
                                <TextField
                                    name="email"
                                    type="email"
                                    isRequired
                                    className="w-full"
                                >
                                    <Label className="mb-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#514C49]">
                                        Email Address
                                    </Label>

                                    <div className="relative">
                                        <FiMail
                                            aria-hidden="true"
                                            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-[#8A6E68]"
                                        />

                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            className="h-13 w-full rounded-none border border-black/15 bg-transparent pl-11 pr-4 font-serif text-base shadow-none transition focus-within:border-[#8A6E68]"
                                        />
                                    </div>
                                </TextField>

                                {/* Profile Image */}
                                <TextField
                                    name="image"
                                    type="url"
                                    isRequired
                                    className="w-full"
                                >
                                    <Label className="mb-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#514C49]">
                                        Profile Photo URL
                                    </Label>

                                    <div className="relative">
                                        <FiImage
                                            aria-hidden="true"
                                            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-[#8A6E68]"
                                        />

                                        <Input
                                            id="image"
                                            name="image"
                                            type="url"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="https://example.com/photo.jpg"
                                            autoComplete="url"
                                            className="h-13 w-full rounded-none border border-black/15 bg-transparent pl-11 pr-4 font-serif text-base shadow-none transition focus-within:border-[#8A6E68]"
                                        />
                                    </div>

                                    <p className="mt-2 font-sans text-[10px] leading-5 text-[#8A8581]">
                                        Add a direct image URL. You can also
                                        use an ImgBB image link.
                                    </p>
                                </TextField>

                                {/* =================================================
                                    ACCOUNT TYPE
                                ================================================= */}
                                <RadioGroup
                                    value={formData.role}
                                    onChange={handleRoleChange}
                                    name="role"
                                    className="w-full"
                                >
                                    <Label className="mb-3 font-sans text-[9px] uppercase tracking-[0.2em] text-[#514C49]">
                                        Account Type
                                    </Label>

                                    <div className="grid gap-3 sm:grid-cols-2">

                                        {/* Tenant */}
                                        <Radio
                                            value="Tenant"
                                            className="group"
                                        >
                                            <Radio.Content className="flex w-full">
                                                <Radio.Control className="mt-1">
                                                    <Radio.Indicator>
                                                        <span className="h-2 w-2 rounded-full bg-[#8A6E68]" />
                                                    </Radio.Indicator>
                                                </Radio.Control>

                                                <div className="ml-3">
                                                    <p className="font-serif text-lg text-[#1A1A1A]">
                                                        Tenant
                                                    </p>

                                                    <p className="mt-1 font-sans text-[10px] leading-5 text-[#817B76]">
                                                        Discover and book
                                                        properties
                                                    </p>
                                                </div>
                                            </Radio.Content>
                                        </Radio>

                                        {/* Owner */}
                                        <Radio
                                            value="Owner"
                                            className="group"
                                        >
                                            <Radio.Content className="flex w-full">
                                                <Radio.Control className="mt-1">
                                                    <Radio.Indicator>
                                                        <span className="h-2 w-2 rounded-full bg-[#8A6E68]" />
                                                    </Radio.Indicator>
                                                </Radio.Control>

                                                <div className="ml-3">
                                                    <p className="font-serif text-lg text-[#1A1A1A]">
                                                        Owner
                                                    </p>

                                                    <p className="mt-1 font-sans text-[10px] leading-5 text-[#817B76]">
                                                        List and manage
                                                        properties
                                                    </p>
                                                </div>
                                            </Radio.Content>
                                        </Radio>

                                    </div>
                                </RadioGroup>

                                {/* Password */}
                                <TextField
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    isRequired
                                    className="w-full"
                                >
                                    <Label className="mb-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#514C49]">
                                        Password
                                    </Label>

                                    <div className="relative">
                                        <FiLock
                                            aria-hidden="true"
                                            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-[#8A6E68]"
                                        />

                                        <Input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="At least 8 characters"
                                            autoComplete="new-password"
                                            className="h-13 w-full rounded-none border border-black/15 bg-transparent px-11 font-serif text-base shadow-none transition focus-within:border-[#8A6E68]"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-[#6F6965] transition hover:text-[#8A6E68]"
                                        >
                                            {showPassword ? (
                                                <FiEyeOff />
                                            ) : (
                                                <FiEye />
                                            )}
                                        </button>
                                    </div>

                                    <p className="mt-2 font-sans text-[10px] text-[#8A8581]">
                                        Minimum 8 characters.
                                    </p>
                                </TextField>

                                {/* Confirm Password */}
                                <TextField
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    isRequired
                                    className="w-full"
                                >
                                    <Label className="mb-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#514C49]">
                                        Confirm Password
                                    </Label>

                                    <div className="relative">
                                        <FiLock
                                            aria-hidden="true"
                                            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-[#8A6E68]"
                                        />

                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                formData.confirmPassword
                                            }
                                            onChange={handleChange}
                                            placeholder="Repeat your password"
                                            autoComplete="new-password"
                                            className="h-13 w-full rounded-none border border-black/15 bg-transparent px-11 font-serif text-base shadow-none transition focus-within:border-[#8A6E68]"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            aria-label={
                                                showConfirmPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-[#6F6965] transition hover:text-[#8A6E68]"
                                        >
                                            {showConfirmPassword ? (
                                                <FiEyeOff />
                                            ) : (
                                                <FiEye />
                                            )}
                                        </button>
                                    </div>
                                </TextField>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    variant="primary"
                                    isDisabled={
                                        isSubmitting ||
                                        isGoogleLoading
                                    }
                                    className="h-13 w-full rounded-none bg-[#1A1A1A] font-sans text-[10px] uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-[#8A6E68]"
                                >
                                    {isSubmitting
                                        ? "Creating Account..."
                                        : "Create Account"}

                                    {!isSubmitting && (
                                        <FiArrowUpRight className="text-sm" />
                                    )}
                                </Button>
                            </form>

                            {/* =================================================
                                SOCIAL SIGNUP
                            ================================================= */}
                            <div className="my-8 flex items-center gap-4">
                                <span className="h-px flex-1 bg-black/10" />

                                <span className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#99918D]">
                                    Or continue with
                                </span>

                                <span className="h-px flex-1 bg-black/10" />
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                isDisabled={
                                    isSubmitting ||
                                    isGoogleLoading
                                }
                                onPress={handleGoogleRegister}
                                className="h-13 w-full rounded-none border-black/15 bg-transparent font-sans text-[10px] uppercase tracking-[0.18em] text-[#1A1A1A] transition duration-300 hover:border-[#8A6E68] hover:bg-[#8A6E68]/5"
                            >
                                <FcGoogle className="text-lg" />

                                {isGoogleLoading
                                    ? "Connecting..."
                                    : "Continue with Google"}
                            </Button>

                            {/* =================================================
                                SIGN IN
                            ================================================= */}
                            <div className="mt-8 border-t border-black/10 pt-7 text-center">
                                <p className="font-sans text-xs text-[#77716D]">
                                    Already have an account?
                                </p>

                                <Link
                                    href="/login"
                                    className="group mt-2 inline-flex items-center gap-1 font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] transition hover:text-[#8A6E68]"
                                >
                                    Sign in to RENTORA

                                    <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>
                            </div>

                            {/* Mobile Back */}
                            <div className="mt-10 flex justify-center lg:hidden">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em] text-[#77716D] transition hover:text-[#8A6E68]"
                                >
                                    <FiArrowLeft />
                                    Back to home
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;
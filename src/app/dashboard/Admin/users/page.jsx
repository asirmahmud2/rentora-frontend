import { AllUsers } from "@/app/Server/Actions/CountData";
import React from "react";
import Image from "next/image";

import {
FiUsers,
FiShield,
FiUser,
FiHome,
} from "react-icons/fi";

import ChangeRoleButton from "./ChangeRoleButton";

const AllUser = async () => {
const users = await AllUsers();


const allUsers = Array.isArray(users) ? users : [];

const tenantCount = allUsers.filter(
    (user) => user.role === "Tenant"
).length;

const ownerCount = allUsers.filter(
    (user) => user.role === "Owner"
).length;

const adminCount = allUsers.filter(
    (user) => user.role === "Admin"
).length;

const formatDate = (date) => {
    if (!date) {
        return "—";
    }

    return new Date(date).toLocaleDateString("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const getInitials = (name = "") => {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
};

return (
    <main className="min-h-screen bg-[#FDFCF9] text-[#1A1A1A]">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

            {/* PAGE HEADER */}
            <section className="border-b border-[#1A1A1A]/10 pb-10">
                <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

                    <div>
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-8 bg-[#8A6E68]" />

                            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#9B9690]">
                                Administration / Users
                            </span>
                        </div>

                        <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.035em] text-[#171717] sm:text-6xl lg:text-7xl">
                            Everyone on
                            <span className="italic text-[#8A6E68]">
                                {" "}RENTORA.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl font-sans text-sm leading-7 text-[#6F6A65]">
                            View registered users and manage their platform
                            roles from one central administration page.
                        </p>
                    </div>

                    {/* Total Users */}
                    <div className="border-l border-[#1A1A1A]/10 pl-6 lg:min-w-[190px]">
                        <div className="flex items-center gap-3">
                            <FiUsers className="text-sm text-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                Total Users
                            </span>
                        </div>

                        <p className="mt-3 font-serif text-5xl leading-none text-[#171717]">
                            {allUsers.length}
                        </p>
                    </div>
                </div>
            </section>

            {/* ROLE SUMMARY */}
            <section className="border-b border-[#1A1A1A]/10 py-8">
                <div className="grid grid-cols-3">

                    {/* Tenant */}
                    <div className="border-r border-[#1A1A1A]/10 px-4 py-2 sm:px-7 first:pl-0">
                        <div className="flex items-center gap-3">
                            <FiUser className="text-xs text-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                Tenants
                            </span>
                        </div>

                        <p className="mt-3 font-serif text-3xl text-[#171717] sm:text-4xl">
                            {tenantCount}
                        </p>
                    </div>

                    {/* Owner */}
                    <div className="border-r border-[#1A1A1A]/10 px-4 py-2 sm:px-7">
                        <div className="flex items-center gap-3">
                            <FiHome className="text-xs text-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                Owners
                            </span>
                        </div>

                        <p className="mt-3 font-serif text-3xl text-[#171717] sm:text-4xl">
                            {ownerCount}
                        </p>
                    </div>

                    {/* Admin */}
                    <div className="px-4 py-2 sm:px-7 sm:last:pr-0">
                        <div className="flex items-center gap-3">
                            <FiShield className="text-xs text-[#8A6E68]" />

                            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#9B9690]">
                                Admins
                            </span>
                        </div>

                        <p className="mt-3 font-serif text-3xl text-[#171717] sm:text-4xl">
                            {adminCount}
                        </p>
                    </div>
                </div>
            </section>

            {/* USERS TABLE */}
            <section className="py-10 lg:py-14">

                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-4 flex items-center gap-4">
                            <span className="font-sans text-[9px] tracking-[0.2em] text-[#8A6E68]">
                                01
                            </span>

                            <span className="h-px w-7 bg-[#1A1A1A]/10" />

                            <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#9B9690]">
                                User Directory
                            </span>
                        </div>

                        <h2 className="font-serif text-4xl tracking-[-0.02em] text-[#171717] sm:text-5xl">
                            All
                            <span className="italic text-[#8A6E68]">
                                {" "}users.
                            </span>
                        </h2>
                    </div>

                    <p className="font-sans text-xs text-[#97908B]">
                        {allUsers.length}{" "}
                        {allUsers.length === 1
                            ? "account"
                            : "accounts"}
                    </p>
                </div>

                {allUsers.length > 0 ? (
                    <>
                        {/* DESKTOP TABLE */}
                        <div className="hidden overflow-hidden border border-[#1A1A1A]/10 bg-white md:block">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[850px] border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#1A1A1A]/10 bg-[#F8F5F1]">
                                            <th className="px-6 py-4 text-left font-sans text-[8px] uppercase tracking-[0.2em] text-[#9A948F]">
                                                User
                                            </th>

                                            <th className="px-6 py-4 text-left font-sans text-[8px] uppercase tracking-[0.2em] text-[#9A948F]">
                                                Email
                                            </th>

                                            <th className="px-6 py-4 text-left font-sans text-[8px] uppercase tracking-[0.2em] text-[#9A948F]">
                                                Role
                                            </th>

                                            <th className="px-6 py-4 text-left font-sans text-[8px] uppercase tracking-[0.2em] text-[#9A948F]">
                                                Joined
                                            </th>

                                            <th className="px-6 py-4 text-right font-sans text-[8px] uppercase tracking-[0.2em] text-[#9A948F]">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {allUsers.map((user, index) => (
                                            <tr
                                                key={
                                                    user.id ||
                                                    user._id ||
                                                    index
                                                }
                                                className="group border-b border-[#1A1A1A]/8 last:border-b-0 transition-colors duration-300 hover:bg-[#FCFAF7]"
                                            >
                                                {/* User */}
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#EEE9E4]">
                                                            {user.image ? (
                                                                <Image
                                                                    src={user.image}
                                                                    alt={
                                                                        user.name ||
                                                                        "User"
                                                                    }
                                                                    fill
                                                                    sizes="44px"
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center font-serif text-sm text-[#8A6E68]">
                                                                    {getInitials(
                                                                        user.name
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="font-serif text-lg leading-none text-[#1A1A1A] transition-transform duration-300 group-hover:translate-x-1">
                                                                {user.name ||
                                                                    "Unnamed User"}
                                                            </p>

                                                            <p className="mt-1 font-sans text-[9px] uppercase tracking-[0.14em] text-[#A09A95]">
                                                                User{" "}
                                                                {String(
                                                                    index + 1
                                                                ).padStart(
                                                                    2,
                                                                    "0"
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Email */}
                                                <td className="px-6 py-5">
                                                    <span className="font-sans text-xs text-[#625D58]">
                                                        {user.email || "—"}
                                                    </span>
                                                </td>

                                                {/* Role */}
                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`inline-flex items-center gap-2 px-3 py-2 font-sans text-[8px] uppercase tracking-[0.17em] ${
                                                            user.role ===
                                                            "Admin"
                                                                ? "bg-[#1A1A1A] text-white"
                                                                : user.role ===
                                                                    "Owner"
                                                                  ? "bg-[#EEE9E4] text-[#6D5D58]"
                                                                  : "border border-[#1A1A1A]/10 bg-white text-[#6F6A65]"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`h-1.5 w-1.5 rounded-full ${
                                                                user.role ===
                                                                "Admin"
                                                                    ? "bg-[#D8C4A9]"
                                                                    : user.role ===
                                                                        "Owner"
                                                                      ? "bg-[#8A6E68]"
                                                                      : "bg-[#A9A39E]"
                                                            }`}
                                                        />

                                                        {user.role ||
                                                            "Tenant"}
                                                    </span>
                                                </td>

                                                {/* Joined */}
                                                <td className="px-6 py-5">
                                                    <span className="font-sans text-xs text-[#77716C]">
                                                        {formatDate(
                                                            user.createdAt
                                                        )}
                                                    </span>
                                                </td>

                                                {/* Action */}
                                                <td className="px-6 py-5">
                                                    <ChangeRoleButton
                                                        user={user}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* MOBILE USER CARDS */}
                        <div className="space-y-4 md:hidden">
                            {allUsers.map((user, index) => (
                                <article
                                    key={
                                        user.id ||
                                        user._id ||
                                        index
                                    }
                                    className="border border-[#1A1A1A]/10 bg-white p-5"
                                >
                                    {/* Top */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex min-w-0 items-center gap-4">
                                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#EEE9E4]">
                                                {user.image ? (
                                                    <Image
                                                        src={user.image}
                                                        alt={
                                                            user.name ||
                                                            "User"
                                                        }
                                                        fill
                                                        sizes="48px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center font-serif text-sm text-[#8A6E68]">
                                                        {getInitials(
                                                            user.name
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="truncate font-serif text-xl text-[#1A1A1A]">
                                                    {user.name ||
                                                        "Unnamed User"}
                                                </h3>

                                                <p className="mt-1 truncate font-sans text-[10px] text-[#87817C]">
                                                    {user.email || "—"}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="shrink-0 font-sans text-[9px] tracking-[0.15em] text-[#8A6E68]">
                                            {String(index + 1).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#1A1A1A]/8 pt-5">
                                        <div>
                                            <p className="font-sans text-[8px] uppercase tracking-[0.17em] text-[#A09A95]">
                                                Role
                                            </p>

                                            <div className="mt-2">
                                                <span
                                                    className={`inline-flex items-center gap-2 px-3 py-2 font-sans text-[8px] uppercase tracking-[0.15em] ${
                                                        user.role ===
                                                        "Admin"
                                                            ? "bg-[#1A1A1A] text-white"
                                                            : user.role ===
                                                                "Owner"
                                                              ? "bg-[#EEE9E4] text-[#6D5D58]"
                                                              : "border border-[#1A1A1A]/10 text-[#6F6A65]"
                                                    }`}
                                                >
                                                    {user.role ||
                                                        "Tenant"}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="font-sans text-[8px] uppercase tracking-[0.17em] text-[#A09A95]">
                                                Joined
                                            </p>

                                            <p className="mt-2 font-sans text-xs text-[#5F5A55]">
                                                {formatDate(
                                                    user.createdAt
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="mt-5">
                                        <ChangeRoleButton
                                            user={user}
                                        />
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                ) : (
                    /* EMPTY STATE */
                    <div className="relative overflow-hidden border border-[#1A1A1A]/10 bg-white px-6 py-20 sm:px-10 lg:px-20 lg:py-28">
                        <span className="pointer-events-none absolute -right-6 -top-12 select-none font-serif text-[240px] leading-none text-[#EEEAE6] sm:text-[300px]">
                            U
                        </span>

                        <div className="relative max-w-2xl">
                            <div className="mb-6 flex items-center gap-4">
                                <span className="font-sans text-[10px] tracking-[0.18em] text-[#8A6E68]">
                                    01
                                </span>

                                <span className="h-px w-8 bg-[#1A1A1A]/10" />
                            </div>

                            <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl">
                                No users
                                <span className="italic text-[#8A6E68]">
                                    {" "}found.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-lg font-sans text-sm leading-7 text-[#716C67]">
                                Registered accounts will appear here when
                                users join the RENTORA platform.
                            </p>
                        </div>
                    </div>
                )}
            </section>

            {/* FOOTER NOTE */}
            <section className="border-t border-[#1A1A1A]/10 pt-8">
                <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#A09A95]">
                        RENTORA / User Management
                    </p>

                    <p className="font-serif text-sm italic text-[#85807B]">
                        Manage access with intention.
                    </p>
                </div>
            </section>
        </div>
    </main>
);

};

export default AllUser;

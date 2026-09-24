import React from 'react';

const layout = () => {
    const userRole = "Tenant";
    const tenantLinks = [
        {
            name: "Dashboard",
            href: "/dashboard/tenant",
        },
        {
            name: "My Bookings",
            href: "/dashboard/tenant/bookings",
        },
        {
            name: "Favorites",
            href: "/dashboard/tenant/favorites",
        },
        {
            name: "Profile",
            href: "/dashboard/profile",
        },
    ];

    const ownerLinks = [
        {
            name: "Dashboard",
            href: "/dashboard/owner",
        },
        {
            name: "Add Property",
            href: "/dashboard/owner/add-property",
        },
        {
            name: "My Properties",
            href: "/dashboard/owner/properties",
        },
        {
            name: "Booking Requests",
            href: "/dashboard/owner/booking-requests",
        },
        {
            name: "Profile",
            href: "/dashboard/profile",
        },
    ];

    const adminLinks = [
        {
            name: "Dashboard",
            href: "/dashboard/admin",
        },
        {
            name: "All Users",
            href: "/dashboard/admin/users",
        },
        {
            name: "All Properties",
            href: "/dashboard/admin/properties",
        },
        {
            name: "All Bookings",
            href: "/dashboard/admin/bookings",
        },
        {
            name: "Transactions",
            href: "/dashboard/admin/transactions",
        },
        {
            name: "Profile",
            href: "/dashboard/profile",
        },
    ];

    const getRoleLinks = () => {
        if (userRole === "Owner") {
            return ownerLinks;
        }

        if (userRole === "Admin") {
            return adminLinks;
        }
        if (userRole === "Tenant") {
            return tenantLinks;
        }
        return tenantLinks;
    };

    const roleLinks = getRoleLinks();
    return (
        <div>

        </div>
    );
};

export default layout;
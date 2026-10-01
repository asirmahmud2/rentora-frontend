import { CheckUserRole } from '@/lib/getUser';
import React from 'react';

const AdminLayout = async ({ children }) => {
    await CheckUserRole("Admin");
    return children;
};

export default AdminLayout;
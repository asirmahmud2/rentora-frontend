import { CheckUserRole } from '@/lib/getUser';
import React from 'react';

const TenantLayout = async({ children }) => {
    await CheckUserRole("Tenant");
    return children;
};

export default TenantLayout;
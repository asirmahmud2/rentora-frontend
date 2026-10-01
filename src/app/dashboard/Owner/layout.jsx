import { CheckUserRole } from '@/lib/getUser';
import React from 'react';

const OwnerLayout = async({ children }) => {
    await CheckUserRole("Owner");
    return  children;
};

export default OwnerLayout;
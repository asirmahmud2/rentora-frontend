import React from 'react';
import EditProperty from './EditProperty';
import { getProperty } from '@/app/Server/api/mutation';

const EditPropertyPage = async ({ params }) => {
    const { id } = await params;
    const property = await getProperty(id);
    return (
        <div>
            <EditProperty id={id} property={property} />
        </div>
    );
};

export default EditPropertyPage;
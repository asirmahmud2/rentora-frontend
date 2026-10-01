import React from 'react';
import { getProperty } from '@/app/Server/api/mutation';
import EditProperty from './EditProperty';

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
import { getUser } from '@/lib/getUser';
import React from 'react';

const Page = async () => {
    const user = await getUser();

    console.log(user);

    return (
        <div>
            This is the dashboard page.

            {user ? (
                <p>
                    You are logged in as {user.email} with role {user.role}.
                </p>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    );
};

export default Page;
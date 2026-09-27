import DashboardSideBar from "@/Component/Dashboard/DashBoardSideBar";
import React from "react";


const DashboardLayout = ({ children }) => {
    return (
        <main className="min-h-screen bg-[#F4F2ED] text-[#1A1A1A]">
            <div className="container mx-auto px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                    <DashboardSideBar />

                    <section className="min-w-0 flex-1">
                        {children}
                    </section>
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout;
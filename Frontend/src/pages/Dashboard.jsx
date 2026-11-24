import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import CommandPalette from '../components/core/Dashboard/CommandPalette';
import ProductTour from '../components/core/Dashboard/ProductTour';
import { pageTitles } from '../data/dashboard-links';

const Dashboard = () => {
    const { pathname } = useLocation();
    const title = pageTitles[pathname] || (pathname.includes('edit-course') ? "Edit Course" : "Dashboard");

    return (
        <div className="dash flex min-h-screen bg-richblack-900">
            <Sidebar />
            <div className="min-w-0 flex-1">
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-richblack-900/85 px-5 backdrop-blur-xl md:px-8">
                    <div className="flex items-center gap-2 text-sm text-richblack-200">
                        <span>Workspace</span><span className="text-richblack-500">/</span><span className="text-richblack-5">{title}</span>
                    </div>
                    <button onClick={() => window.dispatchEvent(new Event('edetechy:palette'))}
                        className="hidden items-center gap-3 rounded-xl border border-white/10 px-4 py-2 text-sm text-richblack-200 transition-colors hover:border-yellow-50/40 hover:text-richblack-5 sm:flex">
                        Search <kbd className="rounded-md bg-richblack-700 px-1.5 py-0.5 text-[11px] text-richblack-100">⌘ K</kbd>
                    </button>
                </header>
                <main data-tour="content" className="mx-auto w-11/12 max-w-maxContent py-10">
                    <Outlet />
                </main>
            </div>
            <CommandPalette />
            <ProductTour />
        </div>
    )
}

export default Dashboard

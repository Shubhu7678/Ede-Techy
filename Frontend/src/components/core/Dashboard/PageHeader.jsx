import React from 'react'

// Shared page heading for dashboard pages.
const PageHeader = ({ eyebrow = "Dashboard", title, subtitle, action }) => (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h1 className="section-title text-4xl md:text-5xl text-richblack-5">{title}</h1>
            {subtitle && <p className="mt-3 max-w-xl text-[15px] font-light text-richblack-100">{subtitle}</p>}
        </div>
        {action}
    </div>
);

export default PageHeader;

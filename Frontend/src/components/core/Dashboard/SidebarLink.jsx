import React from 'react'
import * as Icons from 'react-icons/lu'
import { matchPath, NavLink, useLocation } from 'react-router-dom';

// One row of the sidebar: outline icon, label, optional count badge, gold bar on the right when active.
const SidebarLink = ({ link, iconName, badge, end = false }) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const active = !!link.path && !!matchPath({ path: link.path, end }, location.pathname);

    return (
        <NavLink to={link.path} title={link.name} data-tour={link.slug ? `nav-${link.slug}` : undefined}
            className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] transition-colors duration-200
            ${active ? "bg-richblack-800 text-richblack-5" : "text-richblack-100 hover:bg-white/[0.04] hover:text-richblack-5"}`}
        >
            {Icon && <Icon className={`h-[20px] w-[20px] shrink-0 ${active ? "text-richblack-5" : "text-richblack-200 group-hover:text-richblack-5"}`} />}
            <span className="hidden flex-1 truncate md:inline">{link.name}</span>
            {badge > 0 && (
                <span className="hidden min-w-[26px] rounded-full bg-richblack-700 px-2 py-0.5 text-center text-xs font-medium text-richblack-5 md:inline">{badge}</span>
            )}
            {active && <span className="absolute right-2 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-yellow-50" />}
        </NavLink>
    )
}

export default SidebarLink

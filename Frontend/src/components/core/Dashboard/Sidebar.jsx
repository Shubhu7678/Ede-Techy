import React, { useRef, useState } from 'react';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarLinks } from '../../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import { Link, useNavigate } from 'react-router-dom';
import { GiMedusaHead } from "react-icons/gi";
import { LuSearch, LuSettings, LuHelpCircle, LuHome, LuMessageCircle, LuChevronsUpDown, LuLogOut } from "react-icons/lu";
import ConfirmationModal from '../../common/ConfirmationModal';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const Label = ({ children }) => (
    <p className="mb-2 mt-1 hidden px-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-richblack-300 md:block">{children}</p>
);

const Sidebar = () => {

    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [menu, setMenu] = useState(false);
    const menuRef = useRef(null);
    useOnClickOutside(menuRef, () => setMenu(false));

    const handleLogout = () => {
        setMenu(false);
        setConfirmationModal({
            text1: "Log out?",
            text2: "You will be signed out of your account.",
            btn1Text: "Log out",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(logout(navigate)),
            btn2Handler: () => setConfirmationModal(null)
        })
    }

    const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();

    return (
        <aside className="sticky top-0 z-30 flex h-screen w-[72px] shrink-0 flex-col border-r border-white/10 bg-black px-3 pb-4 pt-5 md:w-[272px] md:px-4">
            {/* logo */}
            <Link to="/" className="mb-5 flex items-center gap-3 px-1.5" title="EdeTechy home">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-25 to-yellow-200 text-2xl text-richblack-900">
                    <GiMedusaHead />
                </span>
                <span className="hidden font-display text-[1.7rem] font-semibold leading-none text-richblack-5 md:inline">
                    Ede<span className="gold-text italic">Techy</span>
                </span>
            </Link>

            {/* quick search */}
            <button data-tour="search" onClick={() => window.dispatchEvent(new Event('edetechy:palette'))}
                className="mb-5 flex items-center gap-3 rounded-xl border border-white/10 px-3.5 py-2.5 text-[15px] text-richblack-200 transition-colors hover:border-yellow-50/40 hover:text-richblack-5" title="Quick search">
                <LuSearch className="h-[18px] w-[18px] shrink-0" />
                <span className="hidden flex-1 text-left md:inline">Quick search</span>
                <kbd className="hidden rounded-md bg-richblack-700 px-1.5 py-0.5 text-[11px] text-richblack-100 md:inline">⌘ K</kbd>
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar" data-lenis-prevent>
                <nav data-tour="nav" className="flex flex-col gap-1">
                    <Label>Workspace</Label>
                    {sidebarLinks.map((data, index) => {
                        if (index === 0 || user?.accountType === data.type) {
                            return <SidebarLink key={data.id} link={data} iconName={data.icon} badge={data.slug === 'cart' ? totalItems : 0} />;
                        }
                        return null;
                    })}
                </nav>

                <nav className="mt-7 flex flex-col gap-1">
                    <Label>Shortcuts</Label>
                    <SidebarLink link={{ name: "Back to website", path: "/" }} iconName="LuHome" end />
                    <SidebarLink link={{ name: "Contact support", path: "/contact" }} iconName="LuMessageCircle" />
                </nav>
            </div>

            <div className="mt-3 border-t border-white/10 pt-3">
                <div className="flex flex-col gap-1">
                    <SidebarLink link={{ name: "Settings", slug: "settings", path: "/dashboard/settings" }} iconName="LuSettings" />
                    <button data-tour="help" onClick={() => window.dispatchEvent(new Event('edetechy:tour'))} title="Take a tour"
                        className="group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] text-richblack-100 transition-colors hover:bg-white/[0.04] hover:text-richblack-5">
                        <LuHelpCircle className="h-[20px] w-[20px] shrink-0 text-richblack-200 group-hover:text-richblack-5" />
                        <span className="hidden md:inline">Take a tour</span>
                    </button>
                </div>

                {/* account */}
                <div ref={menuRef} className="relative mt-3">
                    {menu && (
                        <div className="absolute inset-x-0 bottom-full mb-2 overflow-hidden rounded-xl border border-white/10 bg-richblack-800 shadow-2xl shadow-black/70">
                            <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-sm text-richblack-100 transition-colors hover:bg-pink-200/10 hover:text-pink-100">
                                <LuLogOut className="text-lg" /> <span className="hidden md:inline">Log out</span>
                            </button>
                        </div>
                    )}
                    <button data-tour="account" onClick={() => setMenu((m) => !m)}
                        className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-white/[0.04]">
                        {user?.image ? (
                            <img src={user.image} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-white/15" />
                        ) : (
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-richblack-700 text-sm font-semibold text-yellow-25">{initials}</span>
                        )}
                        <span className="hidden min-w-0 flex-1 md:block">
                            <span className="block truncate text-[15px] font-medium text-richblack-5">{user?.firstName} {user?.lastName}</span>
                            <span className="block truncate text-xs text-richblack-300">{user?.accountType} workspace</span>
                        </span>
                        <LuChevronsUpDown className="hidden shrink-0 text-richblack-300 md:block" />
                    </button>
                </div>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </aside>
    )
}

export default Sidebar

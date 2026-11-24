import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as Icons from 'react-icons/lu'
import { sidebarLinks } from '../../../data/dashboard-links'

// ⌘K / Ctrl+K quick search: jump to any dashboard page or site page.
const CommandPalette = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [index, setIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);

    const items = useMemo(() => {
        const mine = sidebarLinks
            .filter((l, i) => i === 0 || l.type === user?.accountType)
            .map((l) => ({ name: l.name, path: l.path, icon: l.icon, group: "Workspace" }));
        return [
            ...mine,
            { name: "Settings", path: "/dashboard/settings", icon: "LuSettings", group: "Workspace" },
            { name: "Home", path: "/", icon: "LuHome", group: "Website" },
            { name: "About us", path: "/about", icon: "LuInfo", group: "Website" },
            { name: "Contact us", path: "/contact", icon: "LuMessageCircle", group: "Website" },
        ];
    }, [user]);

    const results = items.filter((i) => i.name.toLowerCase().includes(query.trim().toLowerCase()));

    useEffect(() => {
        const key = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); }
            if (e.key === 'Escape') setOpen(false);
        };
        const show = () => setOpen(true);
        window.addEventListener('keydown', key);
        window.addEventListener('edetechy:palette', show);
        return () => { window.removeEventListener('keydown', key); window.removeEventListener('edetechy:palette', show); };
    }, []);

    useEffect(() => {
        if (open) { setQuery(""); setIndex(0); setTimeout(() => inputRef.current?.focus(), 30); }
    }, [open]);

    const go = (item) => { if (!item) return; setOpen(false); navigate(item.path); };

    const onKeyDown = (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => Math.min(i + 1, results.length - 1)); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
        if (e.key === 'Enter') go(results[index]);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-start justify-center bg-black/70 px-4 pt-[14vh] backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-richblack-800 shadow-2xl shadow-black" onMouseDown={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                    <Icons.LuSearch className="text-lg text-richblack-200" />
                    <input ref={inputRef} value={query} onChange={(e) => { setQuery(e.target.value); setIndex(0); }} onKeyDown={onKeyDown}
                        placeholder="Search pages..." className="raw w-full bg-transparent text-[15px] text-richblack-5 outline-none placeholder:text-richblack-300" />
                    <kbd className="rounded-md bg-richblack-700 px-1.5 py-0.5 text-[11px] text-richblack-100">Esc</kbd>
                </div>
                <div className="max-h-[320px] overflow-y-auto p-2" data-lenis-prevent>
                    {results.length === 0 && <p className="px-4 py-8 text-center text-sm text-richblack-200">No results for "{query}"</p>}
                    {results.map((r, i) => {
                        const Icon = Icons[r.icon];
                        return (
                            <button key={r.path + r.name} onMouseEnter={() => setIndex(i)} onClick={() => go(r)}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] transition-colors ${i === index ? "bg-white/[0.06] text-richblack-5" : "text-richblack-100"}`}>
                                {Icon && <Icon className="text-lg text-richblack-200" />}
                                <span className="flex-1">{r.name}</span>
                                <span className="text-xs text-richblack-300">{r.group}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;

import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LuX, LuArrowRight, LuArrowLeft } from "react-icons/lu"
import { ACCOUNT_TYPE } from '../../../utils/constants'

const COMMON_END = [
    { target: '[data-tour="settings"]', title: "Settings", body: "Update your photo, personal details and password any time." },
    { target: '[data-tour="account"]', title: "Your account", body: "See who you're signed in as and log out from here." },
    { target: '[data-tour="help"]', title: "Replay this tour", body: "Lost? Click \"Take a tour\" whenever you want a refresher." },
];

const STEPS = {
    [ACCOUNT_TYPE.STUDENT]: [
        { target: '[data-tour="nav"]', title: "Your workspace menu", body: "Everything you need lives here: your profile, the courses you've enrolled in, and your cart." },
        { target: '[data-tour="search"]', title: "Quick search", body: "Press ⌘K (or Ctrl+K) anywhere to jump straight to a page." },
        { target: '[data-tour="nav-enrolled-courses"]', title: "Enrolled courses", body: "Pick up where you left off. Each course shows your progress, and one click opens the next lesson." },
        { target: '[data-tour="nav-cart"]', title: "Your cart", body: "Courses you add from the catalog wait here. The badge shows how many you have." },
        { target: '[data-tour="content"]', title: "Your page", body: "The selected page opens here. Click any item in the menu to switch." },
        ...COMMON_END,
    ],
    [ACCOUNT_TYPE.INSTRUCTOR]: [
        { target: '[data-tour="nav"]', title: "Your workspace menu", body: "Manage your teaching from one place: stats, courses, and a guided course builder." },
        { target: '[data-tour="search"]', title: "Quick search", body: "Press ⌘K (or Ctrl+K) anywhere to jump straight to a page." },
        { target: '[data-tour="nav-instructor"]', title: "Dashboard", body: "Charts and totals for your students and income at a glance." },
        { target: '[data-tour="nav-my-courses"]', title: "My courses", body: "See every course you've created, edit it, or delete it." },
        { target: '[data-tour="nav-add-course"]', title: "Add a course", body: "A 3-step builder: course info, then sections and lectures, then publish." },
        { target: '[data-tour="content"]', title: "Your page", body: "The selected page opens here. Click any item in the menu to switch." },
        ...COMMON_END,
    ],
};

const POP_W = 340;

// Spotlight walkthrough. Auto-starts once per user; replay with the "Take a tour" button.
const ProductTour = () => {
    const { user } = useSelector((state) => state.profile);
    const [active, setActive] = useState(false);
    const [i, setI] = useState(0);
    const [rect, setRect] = useState(null);
    const [steps, setSteps] = useState([]);

    const storageKey = user ? `edetechy-tour-v1-${user._id}` : null;

    const begin = useCallback(() => {
        const all = STEPS[user?.accountType] || STEPS[ACCOUNT_TYPE.STUDENT];
        const found = all.filter((s) => document.querySelector(s.target));
        if (!found.length) return;
        setSteps(found); setI(0); setActive(true);
    }, [user]);

    const finish = useCallback(() => {
        setActive(false);
        try { storageKey && localStorage.setItem(storageKey, "done"); } catch (e) { /* storage unavailable */ }
    }, [storageKey]);

    // first-visit auto start + manual replay
    useEffect(() => {
        const replay = () => begin();
        window.addEventListener('edetechy:tour', replay);
        let timer;
        try {
            if (storageKey && !localStorage.getItem(storageKey)) timer = setTimeout(begin, 900);
        } catch (e) { /* storage unavailable */ }
        return () => { window.removeEventListener('edetechy:tour', replay); clearTimeout(timer); };
    }, [begin, storageKey]);

    const measure = useCallback(() => {
        const el = steps[i] && document.querySelector(steps[i].target);
        if (!el) return;
        const r = el.getBoundingClientRect();
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }, [steps, i]);

    useLayoutEffect(() => {
        if (!active) return;
        const el = document.querySelector(steps[i]?.target);
        el?.scrollIntoView?.({ block: 'nearest', behavior: 'instant' });
        measure();
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure, true);
        return () => { window.removeEventListener('resize', measure); window.removeEventListener('scroll', measure, true); };
    }, [active, i, steps, measure]);

    useEffect(() => {
        if (!active) return;
        const key = (e) => {
            if (e.key === 'Escape') finish();
            if (e.key === 'ArrowRight') setI((n) => Math.min(n + 1, steps.length - 1));
            if (e.key === 'ArrowLeft') setI((n) => Math.max(n - 1, 0));
        };
        window.addEventListener('keydown', key);
        return () => window.removeEventListener('keydown', key);
    }, [active, steps.length, finish]);

    if (!active || !rect || !steps[i]) return null;

    const step = steps[i];
    const pad = 6;
    const vw = window.innerWidth, vh = window.innerHeight;
    const popW = Math.min(POP_W, vw - 24);

    // place the card to the right of the target, else below, else centred
    let left = rect.left + rect.width + pad + 16, top = rect.top;
    if (left + popW > vw - 12) { left = Math.min(Math.max(rect.left, 12), vw - popW - 12); top = rect.top + rect.height + pad + 14; }
    if (top + 230 > vh) top = Math.max(12, vh - 250);

    const last = i === steps.length - 1;

    return (
        <div className="fixed inset-0 z-[400]">
            {/* click-catcher */}
            <div className="absolute inset-0" onClick={finish} />
            {/* spotlight */}
            <div className="pointer-events-none absolute rounded-2xl border-2 border-yellow-50/80 transition-all duration-300"
                style={{
                    top: rect.top - pad, left: rect.left - pad, width: rect.width + pad * 2, height: rect.height + pad * 2,
                    boxShadow: "0 0 0 9999px rgba(0,0,0,0.78), 0 0 40px rgba(232,196,104,0.35)",
                }} />
            {/* card */}
            <div role="dialog" aria-label={step.title} className="absolute rounded-2xl border border-white/12 bg-richblack-800 p-6 shadow-2xl shadow-black transition-all duration-300"
                style={{ top, left, width: popW }}>
                <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-yellow-50">Step {i + 1} of {steps.length}</p>
                    <button onClick={finish} aria-label="Close tour" className="text-richblack-200 transition-colors hover:text-richblack-5"><LuX /></button>
                </div>
                <h3 className="mt-4 text-[1.35rem] font-semibold leading-tight text-richblack-5">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-richblack-100">{step.body}</p>

                <div className="mt-5 flex gap-1.5">
                    {steps.map((_, n) => (
                        <span key={n} className={`h-1.5 rounded-full transition-all duration-300 ${n === i ? "w-6 bg-yellow-50" : "w-1.5 bg-richblack-500"}`} />
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <button onClick={finish} className="text-sm text-richblack-200 transition-colors hover:text-richblack-5">Skip tour</button>
                    <div className="flex items-center gap-2">
                        {i > 0 && (
                            <button onClick={() => setI(i - 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-richblack-100 transition-colors hover:border-yellow-50/50 hover:text-richblack-5" aria-label="Previous step">
                                <LuArrowLeft />
                            </button>
                        )}
                        <button onClick={() => (last ? finish() : setI(i + 1))}
                            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-richblack-900 transition-transform hover:scale-[1.03]">
                            {last ? "Done" : "Next"} {!last && <LuArrowRight />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTour;

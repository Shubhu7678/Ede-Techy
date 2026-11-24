import { useEffect, useRef } from "react";
import gsap from "gsap";

// Small gold dot + trailing ring. Desktop / fine pointers only.
const GoldCursor = () => {
    const dot = useRef(null);
    const ring = useRef(null);

    useEffect(() => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

        const dx = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3" });
        const dy = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3" });
        const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
        const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

        const move = (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); };
        const over = (e) => {
            const hot = e.target.closest("a, button, [role='button'], input, textarea, select, label");
            gsap.to(ring.current, { scale: hot ? 1.8 : 1, opacity: hot ? 0.9 : 0.5, duration: 0.3 });
        };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", over);
        gsap.set([dot.current, ring.current], { opacity: 1, xPercent: -50, yPercent: -50 });
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", over);
        };
    }, []);

    return (
        <>
            <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-50 opacity-0 md:block" style={{ opacity: 0 }} />
            <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-50 opacity-0 md:block" style={{ opacity: 0 }} />
        </>
    );
};

export default GoldCursor;

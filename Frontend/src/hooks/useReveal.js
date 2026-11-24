import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fades + lifts every [data-reveal] inside the ref as it enters the viewport.
export default function useReveal(ref) {
    useLayoutEffect(() => {
        if (!ref.current) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;

        const ctx = gsap.context(() => {
            gsap.set("[data-reveal]", { opacity: 0, y: 48 });
            ScrollTrigger.batch("[data-reveal]", {
                start: "top 88%",
                once: true,
                onEnter: (els) =>
                    gsap.to(els, {
                        opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.12, overwrite: true,
                    }),
            });
        }, ref);

        return () => ctx.revert();
    }, [ref]);
}

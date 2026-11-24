import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { count: 5, suffix: "K", label: "Active students" },
  { count: 10, suffix: "+", label: "Mentors" },
  { count: 200, suffix: "+", label: "Courses" },
  { count: 50, suffix: "+", label: "Awards" },
]

const StatsComponent = () => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".about-stat").forEach((el) => {
        const target = Number(el.dataset.value);
        if (reduce) { el.textContent = target; return; }
        const o = { v: 0 };
        gsap.to(o, {
          v: target, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => { el.textContent = Math.round(o.v); },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="my-28 border-y hairline bg-gradient-to-b from-richblack-800/60 to-richblack-900 py-16">
      <div className="w-11/12 max-w-maxContent mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-12">
        {stats.map((s, i) => (
          <div className={`text-center ${i !== 0 ? "lg:border-l hairline" : ""}`} key={i}>
            <p className="font-display text-6xl md:text-7xl font-semibold gold-text">
              <span className="about-stat" data-value={s.count}>0</span>{s.suffix}
            </p>
            <p className="mt-3 text-[11px] tracking-[0.24em] uppercase text-richblack-200">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsComponent;

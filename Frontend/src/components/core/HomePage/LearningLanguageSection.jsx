import React from 'react'
import { FaHtml5, FaFire, FaCrown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiOutlineSparkles, HiOutlineClock } from "react-icons/hi2";
import HighlightText from './HighlightText'
import CTAButton from './CTAButton';

// outer div carries the GSAP reveal; inner div owns the hover transform (they'd otherwise fight)
const Shell = ({ eyebrow, title, children }) => (
  <div data-reveal className="h-full">
  <div
    className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-50/40 hover:shadow-[0_40px_80px_-40px_rgba(232,196,104,0.45)]"
  >
    <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-yellow-50/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
    <p className="eyebrow">{eyebrow}</p>
    <h3 className="mt-2 mb-6 font-display text-3xl font-semibold text-richblack-5">{title}</h3>
    {children}
  </div>
  </div>
);

/* ---------- 1. progress ---------- */
const ProgressCard = () => {
  const pct = 72, r = 42, c = 2 * Math.PI * r;
  return (
    <Shell eyebrow="Know your progress" title="Every step, measured">
      <div className="flex items-center gap-5">
        <div className="relative h-28 w-28 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(232,196,104,0.12)" strokeWidth="7" />
            <circle cx="50" cy="50" r={r} fill="none" stroke="url(#g)" strokeWidth="7" strokeLinecap="round"
              strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F6DD94" /><stop offset="100%" stopColor="#BC973F" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-semibold gold-text leading-none">{pct}%</span>
            <span className="text-[10px] tracking-widest uppercase text-richblack-200 mt-1">Done</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-richblack-5 font-medium"><FaHtml5 className="text-yellow-50" /> HTML</div>
          <p className="text-sm text-richblack-200 mt-1">Current league</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-yellow-50/30 bg-yellow-50/10 px-3 py-1 text-xs text-yellow-25">
            <FaFire /> 12 day streak
          </span>
        </div>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border hairline bg-white/[0.02] p-4">
          <HiOutlineSparkles className="text-xl text-yellow-50" />
          <p className="mt-3 font-display text-4xl font-semibold text-richblack-5 leading-none">420</p>
          <p className="mt-1 text-xs text-richblack-200">Spin earned</p>
        </div>
        <div className="rounded-2xl border hairline bg-white/[0.02] p-4">
          <HiOutlineClock className="text-xl text-yellow-50" />
          <p className="mt-3 font-display text-4xl font-semibold text-richblack-5 leading-none">1,254</p>
          <p className="mt-1 text-xs text-richblack-200">Minutes in app</p>
        </div>
      </div>
    </Shell>
  );
};

/* ---------- 2. leaderboard ---------- */
const people = [
  { name: "Wade Warren", pts: 2480 },
  { name: "Jane Cooper", pts: 2215 },
  { name: "Eleanor Pena", pts: 1960 },
  { name: "Ralph Edwards", pts: 1744 },
];
const initials = (n) => n.split(" ").map((p) => p[0]).join("");

const CompareCard = () => (
  <Shell eyebrow="Compare with others" title="Climb the leaderboard">
    <div className="flex flex-col gap-2.5">
      {people.map((p, i) => (
        <div key={p.name}
          className={`flex items-center gap-4 rounded-2xl px-4 py-3 border transition-colors duration-300
          ${i === 0 ? "bg-yellow-50/10 border-yellow-50/30" : "bg-white/[0.02] hairline hover:bg-white/[0.04]"}`}>
          <span className="w-5 text-center font-display text-xl text-richblack-200">
            {i === 0 ? <FaCrown className="text-yellow-50 text-base mx-auto" /> : i + 1}
          </span>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-yellow-25 to-yellow-200 font-display text-lg font-semibold text-richblack-900">
            {initials(p.name)}
          </div>
          <span className="flex-1 truncate text-richblack-5 font-medium">{p.name}</span>
          <span className="text-sm text-yellow-25 tabular-nums">{p.pts.toLocaleString()}</span>
        </div>
      ))}
    </div>
  </Shell>
);

/* ---------- 3. calendar ---------- */
const CalendarCard = () => {
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth(), today = now.getDate();
  const first = (new Date(year, month, 1).getDay() + 6) % 7; // Monday first
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const scheduled = [today + 1, today + 3, today + 4, today + 8].filter((d) => d <= days);

  return (
    <Shell eyebrow="Plan your lessons" title="Learn on your schedule">
      <div className="rounded-2xl border hairline bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-richblack-5 mb-3">
          <FaChevronLeft className="text-xs text-richblack-200" />
          <span className="font-medium text-sm">{now.toLocaleString("en-US", { month: "long", year: "numeric" })}</span>
          <FaChevronRight className="text-xs text-richblack-200" />
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-[11px] text-richblack-300 mb-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-[13px]">
          {cells.map((d, i) => (
            <span key={i}
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full tabular-nums
              ${d === null ? "" :
                d === today ? "bg-gradient-to-b from-yellow-25 to-yellow-100 font-semibold text-richblack-900" :
                scheduled.includes(d) ? "border border-yellow-50/50 bg-yellow-50/10 text-yellow-25" :
                "text-richblack-100"}`}>
              {d}
            </span>
          ))}
        </div>
      </div>
    </Shell>
  );
};

const LearningLanguageSection = () => {
  return (
    <div className="w-full">
      <div className="mt-32 mb-24 flex flex-col gap-5 items-center">
        <p data-reveal className="eyebrow">Built for momentum</p>
        <div data-reveal className="section-title text-5xl md:text-7xl text-center max-w-4xl">
          Your swiss knife for <HighlightText text={"learning any language"} />
        </div>
        <div data-reveal className="text-lg font-light text-center mt-1 text-richblack-100 w-[90%] md:w-[58%] leading-relaxed">
          Learn multiple languages with ease — realistic voice-over, progress tracking, custom schedules and more, all in one place.
        </div>

        <div className="mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
          <ProgressCard />
          <CompareCard />
          <CalendarCard />
        </div>

        <div data-reveal className="mt-8">
          <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection

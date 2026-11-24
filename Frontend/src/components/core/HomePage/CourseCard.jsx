import React from 'react'
import { FaHtml5, FaCss3Alt, FaJava, FaPython, FaCode, FaMobileAlt, FaArrowRight } from "react-icons/fa";
import { SiFlask, SiDjango, SiFastapi, SiNextdotjs, SiNuxtdotjs, SiSanity, SiSass } from "react-icons/si";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { LuBookOpen } from "react-icons/lu";

// pick an icon from the course heading
const iconFor = (heading = "") => {
    const h = heading.toLowerCase();
    if (h.includes("responsive")) return FaMobileAlt;
    if (h.includes("scss")) return SiSass;
    if (h.includes("html")) return FaHtml5;
    if (h.includes("css")) return FaCss3Alt;
    if (h.includes("java")) return FaJava;
    if (h.includes("python")) return FaPython;
    if (h.includes("flask")) return SiFlask;
    if (h.includes("django")) return SiDjango;
    if (h.includes("fast")) return SiFastapi;
    if (h.includes("next")) return SiNextdotjs;
    if (h.includes("nuxt")) return SiNuxtdotjs;
    if (h.includes("sanity")) return SiSanity;
    return FaCode;
};

const CourseCard = ({ course, currentCard, setCurrentCard, index = 0 }) => {
    const active = currentCard === course.heading;
    const Icon = iconFor(course.heading);

    return (
        <div
            onMouseEnter={() => setCurrentCard(course.heading)}
            onClick={() => setCurrentCard(course.heading)}
            style={{ animationDelay: `${index * 90}ms` }}
            className={`card-in group relative flex w-full flex-col overflow-hidden rounded-3xl p-8 cursor-pointer transition-all duration-500 min-h-[340px]
            ${active
                ? "bg-gradient-to-br from-[#F6DD94] via-[#E8C468] to-[#BC973F] text-richblack-900 -translate-y-2 shadow-[0_40px_80px_-30px_rgba(232,196,104,0.6)]"
                : "glass text-richblack-25 hover:border-yellow-50/40"}`}
        >
            {/* watermark icon */}
            <Icon className={`pointer-events-none absolute -right-6 -bottom-6 text-[11rem] transition-all duration-700 ${active ? "text-black/10 rotate-6 scale-110" : "text-yellow-50/[0.04]"}`} />

            <div className="relative flex items-start justify-between">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-colors duration-500
                    ${active ? "bg-richblack-900 text-yellow-50" : "bg-yellow-50/10 text-yellow-50 border border-yellow-50/20"}`}>
                    <Icon />
                </div>
                <span className={`font-display text-5xl font-semibold leading-none ${active ? "text-black/25" : "text-richblack-600"}`}>
                    {String(index + 1).padStart(2, "0")}
                </span>
            </div>

            <h3 className="relative mt-8 font-display text-[2rem] font-semibold leading-tight">{course.heading}</h3>
            <p className={`relative mt-3 text-[15px] leading-relaxed font-light ${active ? "text-richblack-800" : "text-richblack-100"}`}>
                {course.description}
            </p>

            <div className={`relative mt-auto pt-6 flex items-center justify-between border-t ${active ? "border-black/15" : "hairline"}`}>
                <div className="flex items-center gap-5 text-[13px] font-medium">
                    <span className="flex items-center gap-2"><MdOutlineSignalCellularAlt className="text-base" />{course.level}</span>
                    <span className="flex items-center gap-2"><LuBookOpen className="text-base" />{course.lessionNumber}</span>
                </div>
                <span className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500
                    ${active ? "bg-richblack-900 text-yellow-50 rotate-0" : "border border-yellow-50/30 text-yellow-50 -rotate-45 group-hover:rotate-0"}`}>
                    <FaArrowRight className="text-sm" />
                </span>
            </div>
        </div>
    )
}

export default CourseCard

import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from '../HomePage/CTAButton'
import { LuLayers, LuBrainCircuit, LuAward, LuClipboardCheck, LuBriefcase } from "react-icons/lu";

const cards = [
  { icon: LuLayers, heading: "Curriculum Based on Industry Needs", description: "Save time and money. Our curriculum is built to be easier to understand and in line with what the industry actually hires for." },
  { icon: LuBrainCircuit, heading: "Our Learning Methods", description: "Hands-on projects, live sessions and bite-sized lessons designed so the knowledge actually sticks." },
  { icon: LuAward, heading: "Certification", description: "Earn recognised certificates on completion to showcase your skills to employers." },
  { icon: LuClipboardCheck, heading: `Rating "Auto-grading"`, description: "Instant, objective feedback on assignments so you always know exactly where you stand." },
  { icon: LuBriefcase, heading: "Ready to Work", description: "Portfolio-grade projects and mentor guidance that take you from learner to job-ready." },
]

const LearningGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-10">
      {/* intro tile */}
      <div data-reveal className="lg:col-span-2 lg:row-span-2">
        <div className="relative flex h-full flex-col justify-center gap-6 overflow-hidden rounded-3xl border border-yellow-50/25 bg-gradient-to-br from-yellow-50/[0.12] via-transparent to-transparent p-10 lg:p-12">
          <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-yellow-50/15 blur-3xl" />
          <p className="eyebrow relative">Why EdeTechy</p>
          <h2 className="section-title relative text-5xl md:text-6xl">
            World-class learning for <HighlightText text={"anyone, anywhere"} />
          </h2>
          <p className="relative text-[17px] font-light leading-relaxed text-richblack-100">
            EdeTechy partners with leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.
          </p>
          <div className="relative w-fit">
            <CTAButton active={true} linkto={'/'}>Learn More</CTAButton>
          </div>
        </div>
      </div>

      {cards.map((c, i) => (
        <div key={i} data-reveal>
          <div className="group glass h-full rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-50/40 hover:shadow-[0_40px_80px_-40px_rgba(232,196,104,0.4)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-50/25 bg-yellow-50/10 text-xl text-yellow-50 transition-colors duration-500 group-hover:bg-yellow-50 group-hover:text-richblack-900">
              <c.icon />
            </div>
            <h3 className="mt-6 font-display text-[1.7rem] font-semibold leading-tight text-richblack-5">{c.heading}</h3>
            <p className="mt-3 text-[15px] font-light leading-relaxed text-richblack-100">{c.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LearningGrid

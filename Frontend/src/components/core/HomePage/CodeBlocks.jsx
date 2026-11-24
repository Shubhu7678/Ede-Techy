import React from 'react'
import CTAButton from './CTAButton';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, codeColor }) => {
  return (
    <div className={`flex ${position} my-24 justify-between items-center gap-14`}>

      {/* copy */}
      <div className="w-[100%] lg:w-[48%] flex flex-col gap-7" data-reveal>
        {heading}
        <div className="text-center md:text-start text-richblack-100 leading-relaxed text-[17px] font-light">
          {subheading}
        </div>
        <div className="flex justify-center md:justify-start w-full gap-3 lg:gap-5">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex flex-row gap-2 items-center">{ctabtn1.text}<FaArrowRight /></div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            <div className="flex flex-row gap-2 items-center">{ctabtn2.text}<FaArrowRight /></div>
          </CTAButton>
        </div>
      </div>

      {/* editor window */}
      <div className="w-[95%] lg:w-[44%] relative" data-reveal>
        <div className="absolute -inset-6 rounded-[2rem] bg-yellow-50/10 blur-3xl" />
        <div className="relative glass rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
          <div className="flex items-center gap-2 px-4 py-3 border-b hairline bg-white/[0.02]">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-50/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-50/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-50/20" />
            <span className="ml-3 text-[11px] tracking-widest text-richblack-200 font-mono">index.html</span>
          </div>
          <div className="flex flex-row p-4 text-[13px] leading-6">
            <div className="w-[10%] flex flex-col font-mono text-center text-richblack-400 select-none">
              {Array.from({ length: 11 }, (_, i) => <p key={i}>{i + 1}</p>)}
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-mono ${codeColor} pr-2 min-h-[264px]`}>
              <TypeAnimation
                sequence={[codeblock, 3000, ""]}
                repeat={Infinity}
                omitDeletionAnimation={true}
                speed={60}
                style={{ whiteSpace: 'pre-line', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks

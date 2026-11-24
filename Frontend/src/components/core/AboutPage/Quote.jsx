import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className="flex justify-center mt-28 mb-28" data-reveal>
      <div className="relative max-w-5xl text-center">
        <span className="absolute -top-14 left-1/2 -translate-x-1/2 font-display text-[9rem] leading-none text-yellow-50/20 select-none">“</span>
        <p className="section-title text-4xl md:text-6xl !leading-[1.15]">
          We are passionate about revolutionizing the way we learn. Our innovative platform
          <HighlightText text={"combines technology,"} />
          <span className="italic text-yellow-25"> expertise</span>, and community to create an
          <span className="italic text-yellow-25"> unparalleled educational experience.</span>
        </p>
      </div>
    </div>
  )
}

export default Quote

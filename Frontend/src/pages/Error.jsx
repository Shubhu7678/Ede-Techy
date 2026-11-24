import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

const Error = () => {
  return (
    <div className="grain relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden px-4 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_40%,rgba(232,196,104,0.14),transparent_70%)]" />
      <div className="relative">
        <p className="font-display text-[8rem] font-semibold leading-none gold-text md:text-[12rem]">404</p>
        <h1 className="section-title mt-4 text-4xl md:text-5xl text-richblack-5">This page wandered off</h1>
        <p className="mx-auto mt-5 max-w-md font-light leading-relaxed text-richblack-100">
          The page you're looking for doesn't exist or has moved. Let's get you back on track.
        </p>
        <Link to="/" className="btn-gold mt-9 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold">
          Back to home <FaArrowRight />
        </Link>
      </div>
    </div>
  )
}

export default Error

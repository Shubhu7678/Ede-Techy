import React from 'react'
import { NavLink } from 'react-router-dom'

const CTAButton = ({ children, active, linkto }) => {
  return (
    <NavLink to={linkto}>
      <div className={`text-center text-[13px] tracking-wide px-7 py-3.5 rounded-full font-semibold
          ${active ? "btn-gold" : "btn-ghost"}`}>
        {children}
      </div>
    </NavLink>
  )
}

export default CTAButton

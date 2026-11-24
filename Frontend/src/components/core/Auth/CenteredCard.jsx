import { useRef } from "react"
import useReveal from "../../../hooks/useReveal"

// Shared shell for the single-purpose auth pages (forgot / reset / verify).
function CenteredCard({ eyebrow, title, subtitle, children, footer }) {
  const root = useRef(null)
  useReveal(root)

  return (
    <div ref={root} className="grain relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_0%,rgba(232,196,104,0.12),transparent_70%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] w-11/12 max-w-[500px] flex-col justify-center py-12">
        <div data-reveal className="text-center">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="section-title text-[2.6rem] md:text-5xl text-richblack-5">{title}</h1>
          {subtitle && <p className="mt-4 text-[1.02rem] font-light leading-relaxed text-richblack-100">{subtitle}</p>}
        </div>
        <div data-reveal className="mt-8 rounded-3xl border border-white/10 bg-richblack-800/80 p-6 md:p-8">
          {children}
        </div>
        {footer && <div data-reveal className="mt-6 text-center">{footer}</div>}
      </div>
    </div>
  )
}

export default CenteredCard

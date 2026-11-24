import { useRef } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import HighlightText from "../HomePage/HighlightText"
import useReveal from "../../../hooks/useReveal"

function Template({ title, highlight, description1, description2, formType }) {
  const root = useRef(null)
  useReveal(root)

  return (
    <div ref={root} className="grain relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_0%,rgba(232,196,104,0.12),transparent_70%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] w-11/12 max-w-[520px] flex-col justify-center py-12">
        <div data-reveal className="text-center">
          <h1 className="section-title text-[2.6rem] md:text-5xl text-richblack-5">
            {title}
            {highlight && <HighlightText text={highlight} />}
          </h1>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-richblack-100 font-light">
            {description1} <span className="font-display italic text-yellow-25 text-xl">{description2}</span>
          </p>
        </div>

        <div data-reveal className="mt-8 rounded-3xl border border-white/10 bg-richblack-800/80 p-6 md:p-8">
          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  )
}

export default Template

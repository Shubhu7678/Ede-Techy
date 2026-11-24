import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login, demoLogin } from "../../../services/operations/authAPI"
import { labelCls, fieldCls } from "./authStyles"

function LoginForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const { email, password } = formData;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-5">
        <div>
          <label htmlFor="email" className={labelCls}>Email Address <sup className="text-pink-200">*</sup></label>
          <input id="email" required type="text" name="email" placeholder="Enter email address"
            value={email} onChange={handleOnChange} className={fieldCls} />
        </div>

        <div>
          <label htmlFor="password" className={labelCls}>Password <sup className="text-pink-200">*</sup></label>
          <div className="relative">
            <input id="password" required type={showPassword ? "text" : "password"} name="password" placeholder="Enter password"
              value={password} onChange={handleOnChange} className={`${fieldCls} pr-12`} />
            <button type="button" onClick={() => setShowPassword((p) => !p)} aria-label="Toggle password visibility"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-richblack-200 transition-colors hover:text-yellow-50">
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <Link to="/forgot-password" className="mt-2 ml-auto block w-max text-xs text-yellow-25 transition-colors hover:text-yellow-5">
            Forgot password?
          </Link>
        </div>

        <button type="submit" disabled={loading} className="btn-gold mt-1 w-full rounded-full py-3.5 font-semibold tracking-wide disabled:opacity-60">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* demo accounts */}
      <div className="my-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-richblack-300">
        <span className="h-px flex-1 bg-white/10" /> or try a demo <span className="h-px flex-1 bg-white/10" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" disabled={loading} onClick={() => dispatch(demoLogin("Student", navigate))}
          className="btn-ghost flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium disabled:opacity-60">
          <FaUserGraduate className="text-yellow-50" /> Demo Student
        </button>
        <button type="button" disabled={loading} onClick={() => dispatch(demoLogin("Instructor", navigate))}
          className="btn-ghost flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium disabled:opacity-60">
          <FaChalkboardTeacher className="text-yellow-50" /> Demo Instructor
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-richblack-200">
        New here? <Link to="/signup" className="font-medium text-yellow-50 hover:text-yellow-25">Create an account</Link>
      </p>
    </div>
  )
}

export default LoginForm

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getResetPasswordToken } from '../services/operations/authAPI';
import { FaArrowLeft } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import CenteredCard from '../components/core/Auth/CenteredCard';
import { labelCls, fieldCls } from '../components/core/Auth/authStyles';

const ForgotPassword = () => {

    const { loading } = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getResetPasswordToken(email, setEmailSent, setEmail));
    }

    return (
        <CenteredCard
            eyebrow="Account recovery"
            title={!emailSent ? "Reset your password" : "Check your email"}
            subtitle={!emailSent
                ? "Have no fear — we'll send you a link to reset your password. If you don't receive it, check your spam folder."
                : `We've sent a reset link to ${email}.`}
            footer={
                <NavLink to="/login" className="group inline-flex items-center gap-2 text-sm text-richblack-100 transition-colors hover:text-yellow-25">
                    <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" /> Back to login
                </NavLink>
            }
        >
            {emailSent && (
                <div className="mb-6 flex flex-col items-center gap-3 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-yellow-50/30 bg-yellow-50/10 text-3xl text-yellow-50">
                        <MdMarkEmailRead />
                    </div>
                    <p className="text-sm font-light text-richblack-100">Didn't get it? You can send the link again.</p>
                </div>
            )}
            <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
                {!emailSent && (
                    <div>
                        <label htmlFor="email" className={labelCls}>Email Address <sup className="text-pink-200">*</sup></label>
                        <input id="email" className={fieldCls} required type="email" name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
                    </div>
                )}
                <button type="submit" disabled={loading} className="btn-gold w-full rounded-full py-3.5 font-semibold tracking-wide disabled:opacity-60">
                    {loading ? "Sending..." : !emailSent ? "Send reset link" : "Resend email"}
                </button>
            </form>
        </CenteredCard>
    )
}

export default ForgotPassword

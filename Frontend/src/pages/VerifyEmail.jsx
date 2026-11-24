import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { MdSettingsBackupRestore } from "react-icons/md";
import OtpInput from 'react-otp-input';
import { sendOtp, signUp } from '../services/operations/authAPI';
import CenteredCard from '../components/core/Auth/CenteredCard';

const VerifyEmail = () => {

    const { loading, signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!signupData) {
            navigate('/');
        }
    }, []);

    if (!signupData) return null;
    const { firstName, lastName, email, password, confirmPassword, accountType } = signupData;

    const resendOtp = () => dispatch(sendOtp(email, navigate));

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate));
    }

    return (
        <CenteredCard
            eyebrow="One last step"
            title="Verify your email"
            subtitle="A 6-digit verification code has been sent to your email. Enter it below."
            footer={
                <div className="flex items-center justify-between text-sm">
                    <NavLink to="/login" className="group inline-flex items-center gap-2 text-richblack-100 transition-colors hover:text-yellow-25">
                        <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" /> Back to login
                    </NavLink>
                    <button onClick={resendOtp} className="inline-flex items-center gap-1.5 text-yellow-25 transition-colors hover:text-yellow-5">
                        <MdSettingsBackupRestore /> Resend code
                    </button>
                </div>
            }
        >
            <form onSubmit={handleOnSubmit} className="flex flex-col gap-6">
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    containerStyle={{ justifyContent: "space-between", gap: "8px" }}
                    renderInput={(props) => (
                        <input {...props}
                            className="!h-14 !w-full min-w-0 rounded-xl border border-white/10 bg-richblack-900/60 text-center text-xl font-semibold text-richblack-5 outline-none transition-colors focus:border-yellow-50/70"
                            style={{}} />
                    )}
                />
                <button type="submit" disabled={loading || otp.length < 6} className="btn-gold w-full rounded-full py-3.5 font-semibold tracking-wide disabled:opacity-60">
                    {loading ? "Verifying..." : "Verify email"}
                </button>
            </form>
        </CenteredCard>
    )
}

export default VerifyEmail

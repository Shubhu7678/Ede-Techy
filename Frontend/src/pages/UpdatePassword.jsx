import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from "react-icons/fa6";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { resetPassword } from '../services/operations/authAPI';
import CenteredCard from '../components/core/Auth/CenteredCard';
import { labelCls, fieldCls } from '../components/core/Auth/authStyles';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const token = location.pathname.split('/').at(-1);
    const { loading } = useSelector((state) => state.auth);
    const [show, setShow] = useState({ password: false, confirmPassword: false });
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });

    const { password, confirmPassword } = formData;
    const handleOnChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        dispatch(resetPassword(password, confirmPassword, token));
    }

    const field = (name, label, placeholder) => (
        <div>
            <label htmlFor={name} className={labelCls}>{label} <sup className="text-pink-200">*</sup></label>
            <div className="relative">
                <input id={name} type={show[name] ? "text" : "password"} required name={name} value={formData[name]}
                    onChange={handleOnChange} placeholder={placeholder} className={`${fieldCls} pr-12`} />
                <button type="button" aria-label="Toggle password visibility"
                    onClick={() => setShow((s) => ({ ...s, [name]: !s[name] }))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-richblack-200 transition-colors hover:text-yellow-50">
                    {show[name] ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
            </div>
        </div>
    );

    return (
        <CenteredCard
            eyebrow="Almost there"
            title="Choose a new password"
            subtitle="Enter your new password below and you're all set."
            footer={
                <NavLink to="/login" className="group inline-flex items-center gap-2 text-sm text-richblack-100 transition-colors hover:text-yellow-25">
                    <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" /> Back to login
                </NavLink>
            }
        >
            <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
                {field("password", "New Password", "Enter new password")}
                {field("confirmPassword", "Confirm Password", "Confirm new password")}
                <button type="submit" disabled={loading} className="btn-gold mt-1 w-full rounded-full py-3.5 font-semibold tracking-wide disabled:opacity-60">
                    {loading ? "Updating..." : "Reset password"}
                </button>
            </form>
        </CenteredCard>
    )
}

export default UpdatePassword

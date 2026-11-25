import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { updateNewPassword } from '../../../../services/operations/settingAPI';
import { setLoading } from '../../../../slices/profileSlice';
import { labelCls, fieldCls } from '../../Auth/authStyles';

const UpdatePassword = () => {

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState({ oldPassword: false, newPassword: false });
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const next = watch('newPassword') || '';
  const score = [next.length >= 8, /[A-Z]/.test(next) && /[a-z]/.test(next), /\d/.test(next), /[^A-Za-z0-9]/.test(next)].filter(Boolean).length;
  const strength = next ? ['Weak', 'Fair', 'Good', 'Strong'][Math.max(score - 1, 0)] : '';

  const submit = async (data) => {
    setBusy(true);
    dispatch(setLoading(true));
    const result = await updateNewPassword(data, token);
    dispatch(setLoading(false));
    setBusy(false);
    if (result !== null) reset({ oldPassword: "", newPassword: "" });
  }

  const field = (name, label, placeholder) => (
    <div>
      <label htmlFor={name} className={labelCls}>{label}</label>
      <div className="relative">
        <input id={name} type={show[name] ? "text" : "password"} placeholder={placeholder} className={`${fieldCls} pr-12`}
          {...register(name, { required: true })} />
        <button type="button" aria-label="Toggle password visibility" onClick={() => setShow((s) => ({ ...s, [name]: !s[name] }))}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-richblack-200 transition-colors hover:text-yellow-50">
          {show[name] ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      {errors[name] && <span className="mt-1.5 block text-xs text-pink-200">This field is required</span>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {field("oldPassword", "Current password", "Enter current password")}
        <div>
          {field("newPassword", "New password", "Enter new password")}
          {next && (
            <div className="mt-3">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((n) => <span key={n} className={`h-1 flex-1 rounded-full transition-colors ${score >= n ? "bg-richblack-5" : "bg-white/10"}`} />)}
              </div>
              <p className="mt-1.5 text-xs text-richblack-200">{strength} · use 8+ characters with upper and lower case, a number and a symbol</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-7 flex justify-end border-t border-white/10 pt-6">
        <button type="submit" disabled={busy} className="btn-gold rounded-full px-7 py-2.5 text-sm font-semibold disabled:opacity-60">
          {busy ? "Updating..." : "Update password"}
        </button>
      </div>
    </form>
  )
}

export default UpdatePassword

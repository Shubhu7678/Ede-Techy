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
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
    <form onSubmit={handleSubmit(submit)} className="rounded-3xl border border-white/10 bg-richblack-800/80 p-6 md:p-8">
      <p className="font-display text-2xl font-semibold">Password</p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {field("oldPassword", "Current password", "Enter current password")}
        {field("newPassword", "New password", "Enter new password")}
      </div>
      <div className="mt-7 flex justify-end">
        <button type="submit" disabled={busy} className="btn-gold rounded-full px-7 py-2.5 text-sm font-semibold disabled:opacity-60">
          {busy ? "Updating..." : "Update password"}
        </button>
      </div>
    </form>
  )
}

export default UpdatePassword

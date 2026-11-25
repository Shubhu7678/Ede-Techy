import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../../services/operations/settingAPI';
import { useNavigate } from 'react-router-dom';
import { labelCls, fieldCls } from '../../Auth/authStyles';

const toDateInput = (v) => {
  if (!v) return '';
  const d = new Date(v);
  return isNaN(d) ? '' : d.toISOString().slice(0, 10);
};

const Err = ({ e, msg }) => e ? <span className="mt-1.5 block text-xs text-pink-200">{msg}</span> : null;
const Group = ({ title, children }) => (
  <div>
    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-richblack-300">{title}</p>
    {children}
  </div>
);

const EditProfile = () => {

  const { token } = useSelector((state) => state.auth);
  const { user, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, watch, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      dateOfBirth: toDateInput(user?.additionalDetails?.dateOfBirth),
      gender: user?.additionalDetails?.gender ?? '',
      contact: user?.additionalDetails?.contact ?? '',
      about: user?.additionalDetails?.about ?? '',
    },
  });

  const aboutLen = (watch('about') || '').length;
  const profileSubmit = (data) => dispatch(updateProfile(token, data, navigate));

  return (
    <form onSubmit={handleSubmit(profileSubmit)} className="flex flex-col gap-8">
      <Group title="Basic information">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelCls}>First name</label>
            <input id="firstName" type="text" placeholder="Your first name" className={fieldCls} {...register('firstName', { required: true })} />
            <Err e={errors.firstName} msg="First name is required" />
          </div>
          <div>
            <label htmlFor="lastName" className={labelCls}>Last name</label>
            <input id="lastName" type="text" placeholder="Your last name" className={fieldCls} {...register('lastName', { required: true })} />
            <Err e={errors.lastName} msg="Last name is required" />
          </div>
          <div>
            <label htmlFor="dob" className={labelCls}>Date of birth</label>
            <input id="dob" type="date" className={fieldCls} {...register('dateOfBirth', { required: true })} />
            <Err e={errors.dateOfBirth} msg="Date of birth is required" />
          </div>
          <div>
            <label htmlFor="gender" className={labelCls}>Gender</label>
            <select id="gender" className={fieldCls} {...register('gender', { required: true })}>
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
            <Err e={errors.gender} msg="Please choose an option" />
          </div>
        </div>
      </Group>

      <Group title="Contact">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelCls}>Email</label>
            <input id="email" type="text" disabled readOnly value={user?.email ?? ''} className={`${fieldCls} cursor-not-allowed opacity-60`} />
            <p className="mt-1.5 text-xs text-richblack-300">Your email can't be changed.</p>
          </div>
          <div>
            <label htmlFor="contact" className={labelCls}>Contact number</label>
            <input id="contact" type="number" placeholder="10-digit mobile number" className={fieldCls}
              {...register('contact', {
                required: { value: true, message: "Contact number is required" },
                maxLength: { value: 10, message: "Invalid contact number" },
                minLength: { value: 9, message: "Invalid contact number" },
              })} />
            <Err e={errors.contact} msg={errors.contact?.message} />
          </div>
        </div>
      </Group>

      <Group title="About you">
        <label htmlFor="about" className="sr-only">About</label>
        <textarea id="about" rows={4} maxLength={300} placeholder="Tell us a little about yourself" className={`${fieldCls} resize-y`} {...register('about', { required: true })} />
        <div className="flex justify-between">
          <Err e={errors.about} msg="Please write something about yourself" />
          <span className="ml-auto mt-1.5 text-xs text-richblack-300">{aboutLen}/300</span>
        </div>
      </Group>

      {/* appears only when something changed, and stays in view while you scroll */}
      <div className={`sticky bottom-4 z-10 flex flex-wrap items-center gap-3 rounded-2xl border border-white/15 bg-richblack-900/95 px-5 py-3.5 shadow-2xl shadow-black/60 backdrop-blur transition-all duration-300 ${isDirty ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
        <span className="mr-auto text-sm text-richblack-100">You have unsaved changes</span>
        <button type="button" onClick={() => reset()} className="btn-ghost rounded-full px-5 py-2 text-sm font-medium">Discard</button>
        <button type="submit" disabled={loading} className="btn-gold rounded-full px-6 py-2 text-sm font-semibold disabled:opacity-60">
          {loading ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  )
}

export default EditProfile

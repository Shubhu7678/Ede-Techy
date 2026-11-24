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

const EditProfile = () => {

  const { token } = useSelector((state) => state.auth);
  const { user, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // pre-filled with what the user already saved
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      dateOfBirth: toDateInput(user?.additionalDetails?.dateOfBirth),
      gender: user?.additionalDetails?.gender ?? '',
      contact: user?.additionalDetails?.contact ?? '',
      about: user?.additionalDetails?.about ?? '',
    },
  });

  const profileSubmit = (data) => dispatch(updateProfile(token, data, navigate));

  return (
    <form onSubmit={handleSubmit(profileSubmit)} className="rounded-3xl border border-white/10 bg-richblack-800/80 p-6 md:p-8">
      <p className="font-display text-2xl font-semibold">Personal details</p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelCls}>First name</label>
          <input id="firstName" type="text" placeholder="Enter your first name" className={fieldCls} {...register('firstName', { required: true })} />
          <Err e={errors.firstName} msg="First name is required" />
        </div>
        <div>
          <label htmlFor="lastName" className={labelCls}>Last name</label>
          <input id="lastName" type="text" placeholder="Enter your last name" className={fieldCls} {...register('lastName', { required: true })} />
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
        <div>
          <label htmlFor="contact" className={labelCls}>Contact number</label>
          <input id="contact" type="number" placeholder="Enter your contact number" className={fieldCls}
            {...register('contact', {
              required: { value: true, message: "Contact number is required" },
              maxLength: { value: 10, message: "Invalid contact number" },
              minLength: { value: 9, message: "Invalid contact number" },
            })} />
          <Err e={errors.contact} msg={errors.contact?.message} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="about" className={labelCls}>About</label>
          <textarea id="about" rows="4" placeholder="Tell us a little about yourself" className={`${fieldCls} resize-y`} {...register('about', { required: true })} />
          <Err e={errors.about} msg="Please write something about yourself" />
        </div>
      </div>
      <div className="mt-7 flex justify-end gap-3">
        <button type="button" onClick={() => navigate('/dashboard/my-profile')} className="btn-ghost rounded-full px-6 py-2.5 text-sm font-medium">Cancel</button>
        <button type="submit" disabled={loading} className="btn-gold rounded-full px-7 py-2.5 text-sm font-semibold disabled:opacity-60">
          {loading ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  )
}

export default EditProfile

import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";

const EditBtn = ({ onClick }) => (
    <button onClick={onClick} className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium">
        Edit <FaRegEdit className="text-yellow-50" />
    </button>
);

const Field = ({ label, value }) => (
    <div>
        <p className="text-xs uppercase tracking-[0.18em] text-richblack-300">{label}</p>
        <p className="mt-1 text-richblack-5">{value}</p>
    </div>
);

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const edit = () => navigate('/dashboard/settings');
    const card = "rounded-3xl border border-white/10 bg-richblack-800/80 p-6 md:p-8";

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 text-richblack-5">
            <div>
                <p className="eyebrow mb-3">Dashboard</p>
                <h1 className="section-title text-5xl">My profile</h1>
            </div>

            <div className={`${card} flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center`}>
                <div className="flex items-center gap-5">
                    {user?.image
                        ? <img className="aspect-square w-20 rounded-full object-cover ring-2 ring-yellow-50/60" src={user.image} alt={`profile-${user?.firstName}`} />
                        : <span className="flex aspect-square w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-25 to-yellow-200 font-display text-3xl font-semibold text-richblack-900 ring-2 ring-yellow-50/60">{`${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase()}</span>}
                    <div>
                        <h2 className="font-display text-3xl font-semibold">{user?.firstName + " " + user?.lastName}</h2>
                        <p className="text-sm font-light text-richblack-200">{user?.email}</p>
                        <span className="mt-2 inline-block rounded-full border border-yellow-50/30 bg-yellow-50/10 px-3 py-0.5 text-xs text-yellow-25">{user?.accountType}</span>
                    </div>
                </div>
                <EditBtn onClick={edit} />
            </div>

            <div className={`${card} flex flex-col gap-3`}>
                <div className="flex items-center justify-between">
                    <p className="font-display text-2xl font-semibold">About</p>
                    <EditBtn onClick={edit} />
                </div>
                <p className="font-light leading-relaxed text-richblack-100">
                    {user?.additionalDetails?.about ? user.additionalDetails.about : "Write something about yourself"}
                </p>
            </div>

            <div className={`${card} flex flex-col gap-6`}>
                <div className="flex items-center justify-between">
                    <p className="font-display text-2xl font-semibold">Personal details</p>
                    <EditBtn onClick={edit} />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="First name" value={user?.firstName} />
                    <Field label="Last name" value={user?.lastName} />
                    <Field label="Email" value={user?.email} />
                    <Field label="Contact" value={user?.additionalDetails?.contact ?? "Add contact number"} />
                    <Field label="Gender" value={user?.additionalDetails?.gender ?? "Add gender"} />
                    <Field label="Date of birth" value={user?.additionalDetails?.dateOfBirth ?? "Add date of birth"} />
                </div>
            </div>
        </div>
    )
}

export default MyProfile

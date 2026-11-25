import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LuMail, LuPhone, LuUser, LuCake, LuPencil, LuCheck, LuPlus, LuGraduationCap, LuLibrary, LuCompass, LuPlusSquare } from "react-icons/lu";
import { ACCOUNT_TYPE } from '../../../utils/constants';

const card = "rounded-3xl border border-white/10 bg-richblack-800/80";

const formatDob = (v) => {
    if (!v) return null;
    const d = new Date(v);
    return isNaN(d) ? String(v) : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

// one row in "Personal details": icon, label, value (or a gentle prompt to add it)
const Detail = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-4 rounded-2xl border hairline bg-white/[0.02] p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-lg text-richblack-100"><Icon /></span>
        <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.18em] text-richblack-300">{label}</p>
            {value
                ? <p className="mt-1 truncate text-[15px] text-richblack-5">{value}</p>
                : <Link to="/dashboard/settings" className="mt-1 inline-flex items-center gap-1 text-sm text-richblack-300 transition-colors hover:text-richblack-5"><LuPlus /> Add {label.toLowerCase()}</Link>}
        </div>
    </div>
);

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const edit = () => navigate('/dashboard/settings');
    const d = user?.additionalDetails || {};
    const isInstructor = user?.accountType === ACCOUNT_TYPE.INSTRUCTOR;

    const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();
    const dob = formatDob(d.dateOfBirth);

    const checklist = [
        ["About you", !!d.about],
        ["Contact number", !!d.contact],
        ["Gender", !!d.gender],
        ["Date of birth", !!d.dateOfBirth],
    ];
    const done = checklist.filter((c) => c[1]).length;
    const pct = Math.round(((done + 1) / (checklist.length + 1)) * 100); // +1: name & email are always there

    const links = isInstructor
        ? [["My courses", "/dashboard/my-courses", LuLibrary], ["Add a course", "/dashboard/add-course", LuPlusSquare]]
        : [["Enrolled courses", "/dashboard/enrolled-courses", LuGraduationCap], ["Browse the catalog", "/", LuCompass]];

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 text-richblack-5">

            {/* header */}
            <div className={`${card} overflow-hidden`}>
                <div className="relative h-32 bg-gradient-to-br from-richblack-700 via-richblack-800 to-richblack-900 md:h-40">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_85%_0%,rgba(232,196,104,0.18),transparent_70%)]" />
                    <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />
                </div>
                <div className="relative px-6 pb-7 md:px-8">
                    <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
                        {user?.image
                            ? <img className="aspect-square w-24 rounded-full object-cover ring-4 ring-richblack-800" src={user.image} alt={`profile-${user?.firstName}`} />
                            : <span className="flex aspect-square w-24 items-center justify-center rounded-full bg-richblack-600 font-display text-4xl font-semibold text-richblack-5 ring-4 ring-richblack-800">{initials}</span>}
                        <button onClick={edit} className="btn-gold flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold">
                            <LuPencil /> Edit profile
                        </button>
                    </div>
                    <h1 className="section-title mt-4 text-4xl md:text-5xl">{user?.firstName} {user?.lastName}</h1>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-richblack-100">
                        <span className="flex items-center gap-2"><LuMail className="text-richblack-300" /> {user?.email}</span>
                        <span className="rounded-full border border-white/20 px-3 py-0.5 text-xs text-richblack-5">{user?.accountType}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
                <div className="flex flex-col gap-6">
                    {/* about */}
                    <div className={`${card} p-6 md:p-8`}>
                        <div className="flex items-center justify-between">
                            <p className="font-display text-2xl font-semibold">About</p>
                            <button onClick={edit} className="text-sm text-richblack-200 underline-offset-4 transition-colors hover:text-richblack-5 hover:underline">Edit</button>
                        </div>
                        {d.about
                            ? <p className="mt-4 whitespace-pre-line font-light leading-relaxed text-richblack-100">{d.about}</p>
                            : <button onClick={edit} className="mt-4 w-full rounded-2xl border border-dashed border-white/20 px-5 py-8 text-center text-sm text-richblack-200 transition-colors hover:border-white/40 hover:text-richblack-5">
                                Tell people a little about yourself. <span className="underline underline-offset-4">Write your bio</span>
                            </button>}
                    </div>

                    {/* personal details */}
                    <div className={`${card} p-6 md:p-8`}>
                        <p className="font-display text-2xl font-semibold">Personal details</p>
                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Detail icon={LuUser} label="First name" value={user?.firstName} />
                            <Detail icon={LuUser} label="Last name" value={user?.lastName} />
                            <Detail icon={LuMail} label="Email" value={user?.email} />
                            <Detail icon={LuPhone} label="Contact number" value={d.contact} />
                            <Detail icon={LuUser} label="Gender" value={d.gender} />
                            <Detail icon={LuCake} label="Date of birth" value={dob} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* completeness */}
                    <div className={`${card} p-6`}>
                        <div className="flex items-center justify-between">
                            <p className="text-xs uppercase tracking-[0.2em] text-richblack-300">Profile strength</p>
                            <p className="text-sm font-medium text-richblack-5">{pct}%</p>
                        </div>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-richblack-5 transition-all duration-700" style={{ width: `${pct}%` }} />
                        </div>
                        <ul className="mt-5 flex flex-col gap-3 text-sm">
                            <li className="flex items-center gap-3 text-richblack-5"><Tick on /> Name and email</li>
                            {checklist.map(([label, ok]) => (
                                <li key={label} className={`flex items-center gap-3 ${ok ? "text-richblack-5" : "text-richblack-300"}`}>
                                    <Tick on={ok} /> {label}
                                </li>
                            ))}
                        </ul>
                        {done < checklist.length && (
                            <button onClick={edit} className="btn-ghost mt-6 w-full rounded-full py-2.5 text-sm font-medium">Complete your profile</button>
                        )}
                    </div>

                    {/* shortcuts */}
                    <div className={`${card} p-3`}>
                        {links.map(([label, to, Icon]) => (
                            <Link key={to} to={to} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-richblack-100 transition-colors hover:bg-white/[0.05] hover:text-richblack-5">
                                <Icon className="text-lg text-richblack-300" /> {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Tick = ({ on }) => (
    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${on ? "bg-richblack-5 text-richblack-900" : "border border-white/20"}`}>{on && <LuCheck />}</span>
);

export default MyProfile

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LuUser, LuShieldCheck } from 'react-icons/lu';
import ChangeProfilePicture from './ChangeProfilePicture';
import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';
import AccountSession from './AccountSession';
import PageHeader from '../PageHeader';

const tabs = [
  { id: 'profile', label: 'Profile', hint: 'Photo and personal details', icon: LuUser },
  { id: 'security', label: 'Security', hint: 'Password and sign-out', icon: LuShieldCheck },
];

const index = () => {
  const [params, setParams] = useSearchParams();
  const active = tabs.some((t) => t.id === params.get('tab')) ? params.get('tab') : 'profile';
  const go = (id) => setParams({ tab: id }, { replace: true });

  return (
    <div className="mx-auto w-full max-w-5xl text-richblack-5">
      <PageHeader title="Settings" subtitle="Manage how you appear on EdeTechy and keep your account secure." />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[230px_minmax(0,1fr)] md:gap-8">
        {/* tabs: vertical list on desktop, scrolling pills on mobile */}
        <nav className="flex gap-2 overflow-x-auto no-scrollbar md:sticky md:top-24 md:h-fit md:flex-col" aria-label="Settings sections">
          {tabs.map((t) => {
            const on = t.id === active;
            return (
              <button key={t.id} type="button" onClick={() => go(t.id)} aria-current={on ? 'page' : undefined}
                className={`group flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors md:w-full ${on ? "bg-richblack-800 text-richblack-5" : "text-richblack-100 hover:bg-white/[0.04] hover:text-richblack-5"}`}>
                <t.icon className={`h-5 w-5 shrink-0 ${on ? "text-richblack-5" : "text-richblack-300 group-hover:text-richblack-5"}`} />
                <span>
                  <span className="block text-[15px] font-medium">{t.label}</span>
                  <span className="mt-0.5 hidden text-xs text-richblack-300 md:block">{t.hint}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="min-w-0">
          {active === 'profile' && (
            <div className="rounded-3xl border border-white/10 bg-richblack-800/80 p-6 md:p-8">
              <ChangeProfilePicture />
              <div className="my-8 h-px bg-white/10" />
              <EditProfile />
            </div>
          )}
          {active === 'security' && (
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-white/10 bg-richblack-800/80 p-6 md:p-8">
                <p className="font-display text-2xl font-semibold">Change password</p>
                <p className="mt-1 text-sm font-light text-richblack-200">Use a strong password you don't use anywhere else.</p>
                <div className="mt-6"><UpdatePassword /></div>
              </div>
              <AccountSession />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default index

import React from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { LuCheck, LuX, LuInfo } from 'react-icons/lu'

// Themed notifications. Every existing toast.success / toast.error / toast.loading call
// keeps working: only the way it's drawn changes.
const STYLES = {
    success: { ring: 'border-white/20 bg-white/10 text-richblack-5', bar: 'bg-richblack-5', label: 'Done' },
    error: { ring: 'border-pink-200/40 bg-pink-200/10 text-pink-100', bar: 'bg-pink-200', label: 'Something went wrong' },
    loading: { ring: 'border-white/15 bg-white/[0.06] text-richblack-5', bar: 'bg-yellow-50', label: 'Working' },
    blank: { ring: 'border-white/20 bg-white/10 text-richblack-5', bar: 'bg-richblack-5', label: 'Notice' },
};

const ToastCard = ({ t }) => {
    const kind = STYLES[t.type] ? t.type : 'blank';
    const s = STYLES[kind];
    const message = typeof t.message === 'function' ? t.message(t) : t.message;
    const timed = kind !== 'loading' && Number.isFinite(t.duration);

    return (
        <div role="status" aria-live="polite"
            className={`relative w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-white/10 bg-richblack-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] ${t.visible ? 'toast-in' : 'toast-out'}`}>
            <div className="flex items-start gap-3.5 px-4 py-3.5">
                <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-base ${s.ring}`}>
                    {kind === 'success' && <LuCheck />}
                    {kind === 'error' && <LuX />}
                    {kind === 'loading' && <span className="spinner !h-4 !w-4 !border-2" />}
                    {kind === 'blank' && <LuInfo />}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-[14.5px] leading-snug text-richblack-5">{message}</p>
                </div>
                {kind !== 'loading' && (
                    <button type="button" onClick={() => toast.dismiss(t.id)} aria-label="Dismiss notification"
                        className="shrink-0 pt-0.5 text-richblack-300 transition-colors hover:text-richblack-5"><LuX /></button>
                )}
            </div>
            {timed && (
                <span className={`toast-bar absolute inset-x-0 bottom-0 h-[2px] origin-left ${s.bar}`} style={{ animationDuration: `${t.duration}ms` }} />
            )}
        </div>
    );
};

const AppToaster = () => (
    <Toaster position="top-center" gutter={12} containerStyle={{ top: 20 }}
        toastOptions={{ duration: 3500, success: { duration: 3000 }, error: { duration: 5000 } }}>
        {(t) => <ToastCard t={t} />}
    </Toaster>
);

export default AppToaster;

import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({ modalData }) => {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl border border-yellow-50/20 bg-richblack-800 p-7 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
                <p className="font-display text-3xl font-semibold text-richblack-5">{modalData.text1}</p>
                <p className="mt-2 text-[15px] font-light text-richblack-100">{modalData.text2}</p>
                <div className="mt-7 flex gap-3">
                    <IconButton
                        text={modalData.btn1Text}
                        customClasses="btn-gold flex-1 rounded-full px-4 py-3 text-sm font-semibold"
                        onclick={modalData.btn1Handler} />
                    <button
                        className="btn-ghost flex-1 rounded-full px-4 py-3 text-sm font-medium"
                        onClick={modalData.btn2Handler}
                    >
                        {modalData.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LuLogOut } from 'react-icons/lu'
import { logout } from '../../../../services/operations/authAPI'
import ConfirmationModal from '../../../common/ConfirmationModal'

const AccountSession = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  const ask = () => setModal({
    text1: "Log out?",
    text2: "You will be signed out of your account.",
    btn1Text: "Log out",
    btn2Text: "Cancel",
    btn1Handler: () => dispatch(logout(navigate)),
    btn2Handler: () => setModal(null),
  });

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-richblack-800/80 p-6 md:p-8">
      <div>
        <p className="font-display text-2xl font-semibold">Signed in</p>
        <p className="mt-1 text-sm font-light text-richblack-200">{user?.email} · {user?.accountType}</p>
      </div>
      <button type="button" onClick={ask} className="btn-ghost flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium">
        <LuLogOut /> Log out
      </button>
      {modal && <ConfirmationModal modalData={modal} />}
    </div>
  )
}

export default AccountSession

import React, { useState, useRef } from 'react';
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';

const ProfileDropdown = () => {

  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) { 

    return null;
  }

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img src={user.image} alt={`profile-${user.firstName}`}
          className="aspect-square w-[34px] rounded-full object-cover ring-1 ring-yellow-50/60"
        />
        <AiOutlineCaretDown className="text-sm text-yellow-50" />
      </div>

      {open && (
        <div
           onClick={(e)=> e.stopPropagation()}
          className="absolute right-0 top-[130%] z-[1000] w-44 divide-y divide-white/10 overflow-hidden rounded-2xl border border-yellow-50/20 bg-richblack-800 text-left shadow-2xl shadow-black/60"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" >
            <div className="flex w-full items-center gap-x-1 gap-x-2 py-3 px-4 text-sm text-richblack-100 transition-colors hover:bg-yellow-50/10 hover:text-yellow-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div onClick={() => {
            dispatch(logout(navigate));
            setOpen(false);
          }}
            className="flex w-full items-center gap-x-1 gap-x-2 py-3 px-4 text-sm text-richblack-100 transition-colors hover:bg-yellow-50/10 hover:text-yellow-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}

export default ProfileDropdown
import React from 'react';
import ChangeProfilePicture from './ChangeProfilePicture';
import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';
import PageHeader from '../PageHeader';

const index = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 text-richblack-5">
      <PageHeader title="Settings" subtitle="Manage your photo, personal details and password." />
      <ChangeProfilePicture />
      <EditProfile />
      <UpdatePassword />
    </div>
  )
}

export default index

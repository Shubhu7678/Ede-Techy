import React, { useEffect, useState } from 'react'
import { LuPlus } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsApi';
import CoursesTable from '../InstructorCourses/CoursesTable';
import PageHeader from '../PageHeader';

const MyCourses = () => {

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      setCourses(result || []);
    }
    fetchCourses();
  }, [])

  return (
    <div className="text-richblack-5">
      <PageHeader
        title="My courses"
        subtitle="Every course you've created, in one place."
        action={
          <button onClick={() => navigate('/dashboard/add-course')} className="btn-gold flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
            <LuPlus /> Add course
          </button>
        }
      />
      {courses === null
        ? <div className="mt-14 flex justify-center"><div className="spinner" /></div>
        : <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

export default MyCourses

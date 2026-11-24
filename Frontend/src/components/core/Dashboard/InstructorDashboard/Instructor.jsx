import React, { useEffect, useState } from 'react'
import { getInstructorData } from '../../../../services/operations/enrolledAPI';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsApi';
import { NavLink } from 'react-router-dom';
import { LuLibrary, LuUsers, LuIndianRupee } from 'react-icons/lu';
import InstructorChart from './InstructorChart';
import PageHeader from '../PageHeader';

const Stat = ({ icon: Icon, label, value }) => (
     <div className="rounded-3xl border border-white/10 bg-richblack-800/80 p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-50/25 bg-yellow-50/10 text-xl text-yellow-50"><Icon /></span>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-richblack-300">{label}</p>
          <p className="mt-1 font-display text-5xl font-semibold gold-text">{value}</p>
     </div>
);

const Instructor = () => {

     const [loading, setLoading] = useState(false);
     const [instructorData, setInstructorData] = useState([]);
     const [courses, setCourses] = useState([]);
     const { token } = useSelector((state) => state.auth);
     const { user } = useSelector((state) => state.profile);

     useEffect(() => {
          const getCourseDataWithStats = async () => {
               setLoading(true);
               const instructorApiData = await getInstructorData(token);
               const result = await fetchInstructorCourses(token);
               if (instructorApiData?.length) setInstructorData(instructorApiData);
               if (result?.length) setCourses(result);
               setLoading(false);
          }
          getCourseDataWithStats();
     }, [])

     const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
     const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

     return (
          <div className="text-richblack-5">
               <PageHeader title={`Hi ${user?.firstName}`} subtitle="Here's how your courses are doing." />
               {
                    loading ? (
                         <div className="mt-14 flex justify-center"><div className="spinner" /></div>
                    ) : courses.length > 0 ? (
                         <div className="flex flex-col gap-6">
                              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                   <Stat icon={LuLibrary} label="Total courses" value={courses.length} />
                                   <Stat icon={LuUsers} label="Total students" value={totalStudents} />
                                   <Stat icon={LuIndianRupee} label="Total income" value={totalAmount} />
                              </div>
                              <InstructorChart courses={instructorData} />
                              <div className="rounded-3xl border border-white/10 bg-richblack-800/80 p-6">
                                   <div className="mb-5 flex items-center justify-between">
                                        <p className="font-display text-2xl font-semibold">Your courses</p>
                                        <NavLink to='/dashboard/my-courses' className="text-sm text-yellow-25 hover:text-yellow-5">View all →</NavLink>
                                   </div>
                                   <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                        {courses.slice(0, 3).map((course, index) => (
                                             <div key={index} className="flex flex-col gap-2">
                                                  <img className="aspect-video w-full rounded-2xl object-cover" src={course?.thumbnail} alt="" />
                                                  <p className="mt-1 font-medium text-richblack-5">{course?.courseName}</p>
                                                  <p className="text-sm text-richblack-200">{course?.studentsEnrolled?.length + " students"} · ₹ {course?.price}</p>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>
                    ) : (
                         <div className="rounded-3xl border border-dashed border-white/15 px-6 py-20 text-center">
                              <p className="font-display text-3xl text-richblack-5">You haven't created a course yet</p>
                              <p className="mt-2 text-sm font-light text-richblack-200">Start with a title, a thumbnail and a few lectures.</p>
                              <NavLink to='/dashboard/add-course' className="btn-gold mt-7 inline-block rounded-full px-7 py-3 text-sm font-semibold">Create a course</NavLink>
                         </div>
                    )
               }
          </div>
     )
}

export default Instructor

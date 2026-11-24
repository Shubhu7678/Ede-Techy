import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnrolledCoursesData } from '../../../services/operations/enrolledAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import { setUser } from "../../../slices/profileSlice";
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const getEnrolledCourses = async () => {
            try {
                setLoading(true);
                const response = await getEnrolledCoursesData(token, dispatch);
                // console.log("Enrolled Courses ::",response.courses[0]);
                setLoading(false);
                setEnrolledCourses(response.courses);
            } catch (err) {
                console.log("Error in getting enrolled courses", err);
            }
        }
        getEnrolledCourses();

    }, [])

    return (
        <div className="text-richblack-5">
            <p className="eyebrow mb-3">Dashboard</p>
            <h1 className="section-title text-5xl">Enrolled courses</h1>
            {
                !enrolledCourses ? (
                    <div className="mt-14 flex justify-center"><div className="spinner" /></div>
                ) : !enrolledCourses.length ? (
                    <div className="mt-10 rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center">
                        <p className="font-display text-3xl text-richblack-5">No courses yet</p>
                        <p className="mt-2 text-sm font-light text-richblack-200">You haven't enrolled in any course yet. Explore the catalog to get started.</p>
                    </div>
                ) : (
                    <div className="mt-10 flex flex-col gap-4">
                        {enrolledCourses.map((course, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/subSection/${course?.courseContent[0]?.subSection[0]?._id}`)}
                                className="group flex cursor-pointer flex-col gap-5 rounded-3xl border border-white/10 bg-richblack-800/80 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-yellow-50/40 sm:flex-row sm:items-center"
                            >
                                <img className="h-24 w-full rounded-2xl object-cover sm:w-40" src={course.thumbnail} alt="" />
                                <div className="min-w-0 flex-1">
                                    <p className="font-display text-2xl font-semibold">{course.courseName}</p>
                                    <p className="mt-1 line-clamp-2 text-sm font-light text-richblack-200">{course.courseDescription}</p>
                                </div>
                                <div className="text-sm text-richblack-200 sm:w-24">{course?.totalDuration}</div>
                                <div className="flex w-full flex-col gap-2 sm:w-48">
                                    <p className="text-xs text-richblack-200">Progress: <span className="text-yellow-25">{course?.progressPercentage || 0}%</span></p>
                                    <ProgressBar
                                        completed={course?.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                        bgColor="#E8C468"
                                        baseBgColor="rgba(255,255,255,0.1)"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default EnrolledCourses

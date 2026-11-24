import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { LuClock, LuCheckCircle, LuPencil, LuTrash2 } from "react-icons/lu";
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsApi';
import { useNavigate } from 'react-router-dom';

const CoursesTable = ({ courses, setCourses }) => {

    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    const handleDeleteCourse = async (courseId) => {
        setLoading(true);
        const result = await deleteCourse(courseId, token);
        if (result) {
            const updatedCourses = await fetchInstructorCourses(token);
            setCourses(updatedCourses || []);
        }
        setConfirmationModal(null);
        setLoading(false);
    }

    if (!courses?.length) {
        return (
            <div className="rounded-3xl border border-dashed border-white/15 px-6 py-20 text-center">
                <p className="font-display text-3xl text-richblack-5">No courses yet</p>
                <p className="mt-2 text-sm font-light text-richblack-200">Create your first course and it will show up here.</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                {courses.map((course) => {
                    const published = course?.status === 'Published';
                    return (
                        <div key={course?._id} className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-richblack-800/80 p-5 transition-colors hover:border-yellow-50/30 md:flex-row md:items-center">
                            <img src={course?.thumbnail} alt="" className="aspect-video w-full rounded-2xl object-cover md:h-28 md:w-48" />
                            <div className="min-w-0 flex-1">
                                <p className="font-display text-2xl font-semibold text-richblack-5">{course?.courseName}</p>
                                <p className="mt-1 line-clamp-2 text-sm font-light text-richblack-200">{course?.courseDescription}</p>
                                {course?.status && (
                                    <span className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium
                                        ${published ? "border-yellow-50/30 bg-yellow-50/10 text-yellow-25" : "border-white/15 bg-white/[0.04] text-richblack-100"}`}>
                                        {published ? <LuCheckCircle /> : <LuClock />} {published ? "Published" : "Draft"}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-between gap-6 md:justify-end">
                                <div className="text-right">
                                    <p className="font-display text-3xl font-semibold gold-text">₹ {course?.price}</p>
                                    <p className="text-xs text-richblack-300">2hr 30min</p>
                                </div>
                                <div className="flex gap-2">
                                    <button disabled={loading} onClick={() => navigate(`/dashboard/edit-course/${course?._id}`)} title="Edit"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-richblack-100 transition-colors hover:border-yellow-50/60 hover:text-yellow-50">
                                        <LuPencil />
                                    </button>
                                    <button disabled={loading} title="Delete"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-richblack-100 transition-colors hover:border-pink-200/60 hover:text-pink-100"
                                        onClick={() => setConfirmationModal({
                                            text1: "Delete this course?",
                                            text2: "All the data related to this course will be deleted.",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteCourse(course?._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })}>
                                        <LuTrash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {confirmationModal && (<ConfirmationModal modalData={confirmationModal} />)}
        </>
    )
}

export default CoursesTable

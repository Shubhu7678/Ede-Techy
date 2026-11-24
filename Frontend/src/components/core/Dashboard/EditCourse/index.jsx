import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import RenderSteps from '../AddCourse/RenderSteps';
import PageHeader from '../PageHeader';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsApi';

const EditCourse = () => {

    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(null);
    // console.log(courseId);

    useEffect(() => {

        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            console.log(result);
            if (result) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result));
            }
            setLoading(false);
        }

        populateCourseDetails();

    }, [])

    return (
        <div className="text-richblack-5">
            <PageHeader title="Edit course" subtitle="Update your course details, sections and lectures." />
            {
                loading ? (
                    <div className="mt-14 flex justify-center"><div className="spinner" /></div>
                ) : course ? (<RenderSteps />) : (
                    <div className="rounded-3xl border border-dashed border-white/15 px-6 py-20 text-center">
                        <p className="font-display text-3xl text-richblack-5">Course not found</p>
                        <p className="mt-2 text-sm font-light text-richblack-200">It may have been deleted, or the link is wrong.</p>
                    </div>
                )
            }
        </div>
    )
}

export default EditCourse
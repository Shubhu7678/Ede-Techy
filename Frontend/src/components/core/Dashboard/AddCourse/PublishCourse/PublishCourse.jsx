import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setStep,resetCourseState } from '../../../../../slices/courseSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { updateCourseData } from '../../../../../services/operations/courseDetailsApi';

const PublishCourse = () => {

    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { errors, isSubmitSuccessful },

    } = useForm();

    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(null);
    const navigate = useNavigate();

    const goToCourses = () => { 

        dispatch(resetCourseState());
        navigate('/dashboard/my-courses');

    }

    const handleCoursePublish = async (data) => {

        if (course?.status === 'Published' && getValues('public') === true || 
             course?.status === 'Draft' && getValues('public') === false) {

            goToCourses();
            return;

        }

        const formData = new FormData();
        formData.append('courseId', course._id);
        const status = getValues('public') ? 'Published' : 'Draft';
        formData.append('status', status);

        setLoading(true);
        const result = await updateCourseData(formData, token);
        setLoading(false);
        if (result) { 
            goToCourses();
        }

    }
    const onSubmit = async (data) => {

        handleCoursePublish(data); 
        // console.log(getValues('public'));
    }

    useEffect(() => {

        if (course?.status === 'published') {
            setValue('public', course?.status);
        }
    }, [])

    return (
        <div className="rounded-3xl border border-white/10 bg-richblack-800/80 p-6 text-richblack-5 md:p-8">
            <p className="font-display text-3xl font-semibold">Publish course</p>
            <p className="mt-1 text-sm font-light text-richblack-200">Choose whether students can find and buy your course right now.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <label htmlFor="public" className="flex cursor-pointer items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/30">
                    <input type="checkbox" id="public" className="mt-1 h-5 w-5 accent-white" {...register('public')} />
                    <span>
                        <span className="block font-medium text-richblack-5">Make this course public</span>
                        <span className="mt-1 block text-sm font-light text-richblack-200">Public courses appear in the catalog. Leave it unchecked to keep it as a draft.</span>
                    </span>
                </label>
                <div className="mt-8 flex justify-end gap-3 border-t hairline pt-6">
                    <button disabled={loading} className="btn-ghost rounded-full px-6 py-3 text-sm font-medium" type="button" onClick={() => dispatch(setStep(2))}>Back</button>
                    <button disabled={loading} className="btn-gold rounded-full px-7 py-3 text-sm font-semibold disabled:opacity-60" type="submit">
                        {loading ? "Saving..." : "Save changes"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PublishCourse;
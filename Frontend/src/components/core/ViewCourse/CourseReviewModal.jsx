import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { ImCancelCircle } from "react-icons/im";
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import { createRating } from '../../../services/operations/courseDetailsApi';

const CourseReviewModal = ({ setReviewModal }) => {

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const { handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {

    setValue('courseExperience', '');
    setValue('courseRating', 0);

  }, [])

  const ratingChanged = (newRating) => {

    setValue('courseRating', newRating);

  }

  const onSubmit = async(data) => {

    
    await createRating({
      courseId : courseEntireData._id,
      rating: data.courseRating,
      review: data.courseExperience,
      token,
    })

    setReviewModal(false);
  }


  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm" onMouseDown={() => setReviewModal(false)}>
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-richblack-800 shadow-2xl shadow-black" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b hairline px-6 py-5">
          <p className="font-display text-3xl font-semibold text-richblack-5">Add a review</p>
          <button type="button" onClick={() => setReviewModal(false)} aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-richblack-100 transition-colors hover:border-white/40 hover:text-richblack-5"><ImCancelCircle /></button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3">
            {user?.image
              ? <img className="aspect-square w-12 rounded-full object-cover" src={user.image} alt="" />
              : <span className="flex h-12 w-12 items-center justify-center rounded-full bg-richblack-700 font-semibold text-richblack-5">{`${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`}</span>}
            <div>
              <p className="font-medium text-richblack-5">{user?.firstName + " " + user?.lastName}</p>
              <p className="text-xs text-richblack-300">Posting publicly</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5">
            <div>
              <p className="mb-1 text-[13px] font-medium tracking-wide text-richblack-25">Your rating</p>
              <ReactStars count={5} size={30} onChange={ratingChanged} activeColor="#E8C468" />
            </div>
            <div>
              <label htmlFor="courseExperience" className="mb-2 block text-[13px] font-medium tracking-wide text-richblack-25">Your experience <sup className="text-pink-200">*</sup></label>
              <textarea id="courseExperience" rows={4} className="w-full resize-y px-4 py-3.5 text-[15px]" placeholder="What did you like? What could be better?"
                {...register('courseExperience', { required: true })}></textarea>
              {errors.courseExperience && <span className="mt-1.5 block text-xs text-pink-200">Please add your experience</span>}
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" className="btn-ghost rounded-full px-6 py-2.5 text-sm font-medium" onClick={() => setReviewModal(false)}>Cancel</button>
              <button className="btn-gold rounded-full px-7 py-2.5 text-sm font-semibold" type="submit">Submit review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal

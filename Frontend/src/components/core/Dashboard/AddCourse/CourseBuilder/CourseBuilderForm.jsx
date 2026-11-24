import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdAddCircleOutline } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setEditCourse, setCourse } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection,updateSection } from '../../../../../services/operations/courseDetailsApi';
import NestedView from './NestedView';
import { SAMPLE_SECTIONS } from '../../../../../utils/sampleLecture';

const CourseBuilderForm = () => {

  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  const handleCourseBuilderSubmit = async (data) => {

    let result = [];
    if (editSectionName) {

      const formData = new FormData();
      formData.append('sectionName', data.sectionName);
      formData.append('courseId', course._id);
      formData.append('sectionId', editSectionName);
      result = await updateSection(formData, token); 
     
    }
    else {

      const formData = new FormData();
      formData.append('sectionName', data.sectionName);
      formData.append('courseId', course._id);
      result = await createSection(formData, token);

    }
    if (result) {

      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue('sectionName', '');
    }

  }

   const cancelEdit = () => {

    setEditSectionName(null);
    setValue('sectionName', '');
  }

  const handleChangeEditSectionName = (sectionName, sectionId) => {

    if (editSectionName === sectionId) {

      setEditSectionName(null);
      setValue('sectionName', '');
      return;
    }
    
    
    setValue('sectionName', sectionName);
    setEditSectionName(sectionId);
  }

  const goBack = () => {

    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {

    if (course.courseContent.length === 0) {

      toast.error('Please add atleast one section');
      return;
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {

      toast.error('Please add atleast one lecture in each section');
      return;
    }

    //If everything working properly then go to next step
    dispatch(setStep(3));

  }
 

  return (
    <div className="rounded-3xl border border-white/10 bg-richblack-800/80 p-6 text-richblack-5 md:p-8">
      <p className="font-display text-3xl font-semibold">Course builder</p>
      <p className="mt-1 text-sm font-light text-richblack-200">Organise your course into sections, then add lectures to each one.</p>

      <form onSubmit={handleSubmit(handleCourseBuilderSubmit)} className="mt-6">
        <label htmlFor="sectionName" className="mb-2 block text-[13px] font-medium tracking-wide text-richblack-25">Section name <sup className="text-pink-200">*</sup></label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input type="text" placeholder="e.g. Getting started" id="sectionName"
            className="min-w-0 flex-1 px-4 py-3.5 text-[15px]"
            {...register('sectionName', { required: true })} />
          <div className="flex gap-3">
            <button type="submit" className="btn-gold flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
              <IoMdAddCircleOutline className="text-lg" /> {!editSectionName ? 'Create section' : 'Save name'}
            </button>
            {editSectionName && (
              <button type="button" onClick={cancelEdit} className="btn-ghost rounded-full px-5 py-3 text-sm font-medium">Cancel</button>
            )}
          </div>
        </div>
        {errors.sectionName && <span className="mt-1.5 block text-xs text-pink-200">Section name is required</span>}
        {!editSectionName && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-richblack-300">Quick add:</span>
            {SAMPLE_SECTIONS.filter((n) => !course?.courseContent?.some((s) => s.sectionName === n)).map((n) => (
              <button type="button" key={n} onClick={() => handleCourseBuilderSubmit({ sectionName: n })}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-richblack-100 transition-colors hover:border-white/40 hover:text-richblack-5">
                + {n}
              </button>
            ))}
          </div>
        )}
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="mt-8 flex justify-end gap-3 border-t hairline pt-6">
        <button type="button" className="btn-ghost rounded-full px-6 py-3 text-sm font-medium" onClick={goBack}>Back</button>
        <button type="button" className="btn-gold rounded-full px-7 py-3 text-sm font-semibold" onClick={goToNext}>Next</button>
      </div>
    </div>
  )
}

export default CourseBuilderForm;
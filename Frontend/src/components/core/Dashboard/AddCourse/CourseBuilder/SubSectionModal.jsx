import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { LuX } from "react-icons/lu";
import UploadData from './UploadData';
import { SAMPLE_LECTURES, makeSampleVideo } from '../../../../../utils/sampleLecture';
import {createSubSection,updateSubSection} from '../../../../../services/operations/courseDetailsApi';

const SubSectionModal = ({ modalData, setModalData, view=false, edit=false, add }) => {

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  // freeze the page behind the modal so only the modal body scrolls
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = prev; };
  }, []);

  const [presetVideo, setPresetVideo] = useState({ version: 0, file: null });
  const [sampleBusy, setSampleBusy] = useState(false);
  const [sampleError, setSampleError] = useState('');
  const [sampleIndex, setSampleIndex] = useState(0);

  const fillSample = async () => {
    const sample = SAMPLE_LECTURES[sampleIndex % SAMPLE_LECTURES.length];
    setSampleIndex((i) => i + 1);
    setSampleBusy(true); setSampleError('');
    setValue('lectureTitle', sample.title, { shouldValidate: true });
    setValue('lectureDesc', sample.description, { shouldValidate: true });
    try {
      const file = await makeSampleVideo(sample.title);
      setPresetVideo((p) => ({ version: p.version + 1, file }));
    } catch (e) {
      setSampleError(e.message || "Couldn't create the sample video.");
    }
    setSampleBusy(false);
  };

  useEffect(() => {
    if (view || edit) {

      setValue('lectureTitle', modalData.title);
      setValue('lectureDesc', modalData.description);
      setValue('lectureVideo', modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {

    const currentValues = getValues();
    if (currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {

      return true
    }
    else {

      return false;
    }
  }

  const handleEditSubSection = async (data) => {

    const currentValues = getValues();
    const formData = new FormData();
    

    formData.append('sectionId', modalData.sectionId);
    formData.append('courseId', modalData.courseId);
    formData.append('subSectionId', modalData._id);

    if (currentValues.lectureTitle !== modalData.title) { 

      formData.append('title', currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) { 

      formData.append('description', currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) { 

      formData.append('videoUrl', currentValues.lectureVideo);
    }

    const result = await updateSubSection(formData, token);

    if (result) {

      dispatch(setCourse(result));
    }

    setModalData(null);
  }

  const onSubmit = async (data) => {

    if (view) {

      return;
    }
    if (edit) {

      if (!isFormUpdated()) {

        toast.error("No changes made in form !");
      }
      else {

        handleEditSubSection(data);
      }
      return;
    }

    const formData = new FormData();
    formData.append('title', data.lectureTitle);
    formData.append('description', data.lectureDesc);
    formData.append('videoUrl', data.lectureVideo);
    formData.append('sectionId', modalData.sectionId);
    formData.append('courseId', modalData.courseId);
    
    const result = await createSubSection(formData, token);
    console.log(result);
    if (result) {

      dispatch(setCourse(result));
    }
    setModalData(null);
  }

  const lbl = "mb-2 block text-[13px] font-medium tracking-wide text-richblack-25";
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 flex items-center justify-center overflow-hidden bg-black/75 px-4 py-6 backdrop-blur-sm" onMouseDown={() => setModalData(null)}>
      <div className="flex max-h-full w-full max-w-[620px] flex-col overflow-hidden rounded-3xl border border-white/15 bg-richblack-800 shadow-2xl shadow-black" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex shrink-0 items-center justify-between border-b hairline px-6 py-5">
          <p className="font-display text-3xl font-semibold text-richblack-5">{view && "Viewing"} {add && "Adding"} {edit && "Editing"} lecture</p>
          <button type="button" onClick={() => setModalData(null)} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-richblack-100 transition-colors hover:border-white/40 hover:text-richblack-5"><LuX /></button>
        </div>
        {/* data-lenis-prevent: the wheel scrolls this body, not the page behind */}
        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {add && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-white/20 p-4">
                <div>
                  <p className="text-sm font-medium text-richblack-5">Just testing?</p>
                  <p className="text-xs text-richblack-300">Fills the title and description and adds a 3-4 second sample video.</p>
                </div>
                <button type="button" onClick={fillSample} disabled={sampleBusy} className="btn-ghost rounded-full px-5 py-2 text-sm font-medium disabled:opacity-60">
                  {sampleBusy ? "Preparing video..." : "Use a sample lecture"}
                </button>
                {sampleError && <p className="w-full text-xs text-pink-200">{sampleError}</p>}
              </div>
            )}
            <UploadData
              label={'Video'}
              name={'lectureVideo'}
              errors={errors}
              register={register}
              setValue={setValue}
              video={true}
              presetFile={presetVideo}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />
            <div>
              <label htmlFor="lectureTitle" className={lbl}>Lecture title <sup className="text-pink-200">*</sup></label>
              <input type="text" id="lectureTitle" placeholder="e.g. Variables and data types" className="w-full px-4 py-3.5 text-[15px]"
                {...register('lectureTitle', { required: true })} />
              {errors.lectureTitle && <span className="mt-1.5 block text-xs text-pink-200">Lecture title is required</span>}
            </div>
            <div>
              <label htmlFor="lectureDesc" className={lbl}>Lecture description <sup className="text-pink-200">*</sup></label>
              <textarea id="lectureDesc" rows={3} placeholder="What is covered in this lecture?" className="w-full resize-y px-4 py-3.5 text-[15px]"
                {...register('lectureDesc', { required: true })}></textarea>
              {errors.lectureDesc && <span className="mt-1.5 block text-xs text-pink-200">Lecture description is required</span>}
            </div>
            {!view && (
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setModalData(null)} className="btn-ghost rounded-full px-6 py-2.5 text-sm font-medium">Cancel</button>
                <button type="submit" className="btn-gold rounded-full px-7 py-2.5 text-sm font-semibold">{edit ? "Save changes" : "Save lecture"}</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubSectionModal
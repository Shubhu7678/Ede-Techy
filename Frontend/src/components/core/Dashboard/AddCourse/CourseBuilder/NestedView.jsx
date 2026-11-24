import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import toast from 'react-hot-toast';
import { SAMPLE_LECTURES, makeSampleVideo } from '../../../../../utils/sampleLecture';
import { setCourse } from '../../../../../slices/courseSlice';
import { deleteSectionData,deleteSubSectionData,createSubSection } from '../../../../../services/operations/courseDetailsApi';

const NestedView = ({ handleChangeEditSectionName }) => {

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [sampling, setSampling] = useState(null);
  const [sampleError, setSampleError] = useState('');

  // one click: create a lecture with sample text and a short generated video
  const addSampleLecture = async (section) => {
    const sample = SAMPLE_LECTURES[section.subSection.length % SAMPLE_LECTURES.length];
    setSampling(section._id); setSampleError('');
    try {
      const video = await makeSampleVideo(sample.title);
      const formData = new FormData();
      formData.append('title', sample.title);
      formData.append('description', sample.description);
      formData.append('videoUrl', video);
      formData.append('sectionId', section._id);
      formData.append('courseId', course._id);
      const result = await createSubSection(formData, token);
      if (result) dispatch(setCourse(result));
    } catch (e) {
      setSampleError(e.message || "Couldn't add the sample lecture.");
    }
    setSampling(null);
  };

  const handleDeleteSection = async (sectionId,courseId) => {

    try {

      const result = await deleteSectionData({ sectionId,courseId, token });
      console.log(result);

      if (result) { 

        dispatch(setCourse(result));
      }

      
    } catch (error) { 
      
      console.log("Error occured : ", error);

    }
    
    setConfirmationModal(null);
  }


  const handleDeleteSubSection = async (subSectionId, sectionId,courseId) => {
 
    try {

      const result = await deleteSubSectionData({ subSectionId, sectionId,courseId, token });

      if (result) { 

        dispatch(setCourse(result));
      }

      setConfirmationModal(null);

    } catch (err) { 

      console.log("Error :", err);
    }
  }

  const iconBtn = "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-richblack-100 transition-colors";
  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4">
        {
          course?.courseContent?.map((section, index) => (
            <details key={section._id} className="group overflow-hidden rounded-2xl border hairline bg-white/[0.02]" open>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-white/[0.04]">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-richblack-5">{index + 1}</span>
                  <p className="truncate font-medium text-richblack-5">{section.sectionName}</p>
                  <span className="hidden text-xs text-richblack-300 sm:inline">{section.subSection.length} lecture{section.subSection.length === 1 ? "" : "s"}</span>
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button type="button" title="Rename section" className={`${iconBtn} hover:border-white/40 hover:text-richblack-5`}
                    onClick={() => handleChangeEditSectionName(section.sectionName, section._id)}>
                    <MdEdit />
                  </button>
                  <button type="button" title="Delete section" className={`${iconBtn} hover:border-pink-200/60 hover:text-pink-100`}
                    onClick={() => setConfirmationModal({
                      text1: 'Delete this section?',
                      text2: 'All the lectures in this section will be deleted.',
                      btn1Text: 'Delete',
                      btn2Text: 'Cancel',
                      btn1Handler: () => handleDeleteSection(section._id, course._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })}>
                    <FaTrashAlt className="text-sm" />
                  </button>
                  <MdArrowDropDown className="text-2xl text-richblack-200 transition-transform group-open:rotate-180" />
                </div>
              </summary>
              <div className="border-t hairline px-5 py-3">
                {
                  section.subSection.map((data) => (
                    <div key={data._id} onClick={() => setViewSubSection(data)}
                      className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]">
                      <div className="flex min-w-0 items-center gap-3 text-sm text-richblack-25">
                        <RxDropdownMenu className="shrink-0 text-lg text-richblack-300" />
                        <p className="truncate">{data.title}</p>
                      </div>
                      <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2">
                        <button type="button" title="Edit lecture" className="text-richblack-200 transition-colors hover:text-richblack-5"
                          onClick={() => setEditSubSection({ ...data, sectionId: section._id, courseId: course._id })}>
                          <MdEdit />
                        </button>
                        <button type="button" title="Delete lecture" className="text-richblack-200 transition-colors hover:text-pink-100"
                          onClick={() => setConfirmationModal({
                            text1: 'Delete this lecture?',
                            text2: 'The selected lecture will be deleted.',
                            btn1Text: 'Delete',
                            btn2Text: 'Cancel',
                            btn1Handler: () => handleDeleteSubSection(data._id, section._id, course._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })}>
                          <FaTrashAlt className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))
                }
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <button type="button" className="flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm text-richblack-100 transition-colors hover:border-white/40 hover:text-richblack-5"
                    onClick={() => setAddSubSection({ sectionId: section._id, courseId: course._id })}>
                    <MdOutlineAdd /> Add lecture
                  </button>
                  <button type="button" disabled={sampling === section._id} onClick={() => addSampleLecture(section)}
                    className="rounded-full px-4 py-2 text-sm text-richblack-200 underline-offset-4 transition-colors hover:text-richblack-5 hover:underline disabled:opacity-60">
                    {sampling === section._id ? "Adding sample lecture..." : "Add a sample lecture (3-4 s)"}
                  </button>
                </div>
                {sampleError && sampling === null && <p className="mt-2 text-xs text-pink-200">{sampleError}</p>}
              </div>
            </details>
          ))
        }
      </div>
      {
        addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />)
          : editSubSection ? (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />)
            : viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />)
              : null
      }
      {confirmationModal && (<ConfirmationModal modalData={confirmationModal} />)}
    </div>
  )
}

export default NestedView
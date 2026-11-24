import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

const VideoDetailsSidebar = ({ setReviewModal }) => {

    const [activeStatus, setActiveStatus] = useState('');
    const [videobarActive, setVideobarActive] = useState('');
    const navigate = useNavigate();
    const { sectionId, subSectionId } = useParams();
    const location = useLocation();
    const { courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {

        if (!courseSectionData.length) {

            return;
        }

        const currentSectionData = courseSectionData.findIndex((section) => section._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionData]?.subSection.findIndex((data) => data._id === subSectionId);
        const activeSubSectionId = courseSectionData[currentSectionData]?.subSection[currentSubSectionIndex]._id;

        // console.log("Active :: ", courseSectionData);
        // set current section here  
        setActiveStatus(courseSectionData[currentSectionData]?._id);
        //set current sub section here
        setVideobarActive(activeSubSectionId);

    }, [courseSectionData, courseEntireData, sectionId, subSectionId]);

    const done = completedLectures?.completedVideos?.length || 0;
    const pct = totalNoOfLectures ? Math.round((done / totalNoOfLectures) * 100) : 0;

    return (
        <aside className="sticky top-0 flex h-screen w-[300px] shrink-0 flex-col border-r border-white/10 bg-black">
            <div className="flex flex-col gap-5 border-b border-white/10 px-5 pb-5 pt-5">
                <div className="flex items-center justify-between">
                    <button onClick={() => navigate('/dashboard/enrolled-courses')}
                        className="flex items-center gap-2 text-sm text-richblack-100 transition-colors hover:text-richblack-5">
                        <IoChevronBackCircleOutline className="text-2xl" /> My courses
                    </button>
                    <button onClick={() => setReviewModal(true)} className="btn-ghost rounded-full px-4 py-1.5 text-xs font-medium">
                        Add review
                    </button>
                </div>
                <div>
                    <p className="font-display text-2xl font-semibold leading-tight text-richblack-5">{courseEntireData?.courseName}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-richblack-200">
                        <span>{done} of {totalNoOfLectures} lectures</span><span>{pct}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-richblack-5 transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4" data-lenis-prevent>
                {courseSectionData.map((section, index) => {
                    const open = activeStatus === section._id;
                    return (
                        <div key={index} className="mb-2">
                            <button type="button" onClick={() => setActiveStatus(open ? '' : section._id)}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/[0.04]">
                                <span className="text-[15px] font-medium text-richblack-5">{section.sectionName}</span>
                                <MdOutlineArrowDropDownCircle className={`text-xl text-richblack-300 transition-transform ${open ? "rotate-180" : ""}`} />
                            </button>
                            {open && (
                                <div className="mt-1 flex flex-col gap-0.5">
                                    {section?.subSection?.map((data, i) => {
                                        const active = videobarActive === data._id;
                                        const completed = completedLectures?.completedVideos?.includes(data._id);
                                        return (
                                            <button key={i} type="button"
                                                onClick={() => {
                                                    navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/subSection/${data?._id}`)
                                                    setVideobarActive(data._id)
                                                }}
                                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${active ? "bg-richblack-800 text-richblack-5" : "text-richblack-100 hover:bg-white/[0.04]"}`}>
                                                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] ${completed ? "border-richblack-5 bg-richblack-5 text-richblack-900" : "border-white/25"}`}>{completed && "✓"}</span>
                                                <span className="truncate">{data.title}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </aside>
    )
}

export default VideoDetailsSidebar
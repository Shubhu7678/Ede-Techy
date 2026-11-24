import React, { useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoVideocamOutline } from "react-icons/io5";

const CourseContent = ({ course, sections, lectures }) => {

    const [openCourses, setOpenCourses] = useState({});

    const toggleCourse = (index) => {
        setOpenCourses((prev) => ({ ...prev, [index]: !prev[index] }));
    }

    return (
        <div>
            <p className="font-display text-3xl font-semibold text-richblack-5">Course content</p>
            <div className="mt-2 flex flex-wrap gap-x-4 text-sm text-richblack-200">
                <p>{sections + " section(s)"}</p>
                <p>{lectures + " lecture(s)"}</p>
                <p>10+ hrs total length</p>
            </div>
            <div className="mb-12 mt-5 flex flex-col gap-3">
                {
                    course?.courseContent?.map((section, index) => (
                        <div key={index} className="overflow-hidden rounded-2xl border hairline bg-white/[0.02]">
                            <button type="button" onClick={() => toggleCourse(index)}
                                className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-yellow-50/[0.06]">
                                <div className="flex items-center gap-2">
                                    <RiArrowDropDownLine className={`text-3xl text-yellow-50 transition-transform duration-300 ${openCourses[index] ? "rotate-180" : ""}`} />
                                    <p className="font-medium text-richblack-5">{section?.sectionName}</p>
                                </div>
                                <p className="text-sm text-yellow-25">{section?.subSection?.length + " lecture(s)"}</p>
                            </button>
                            {openCourses[index] && section?.subSection?.map((lecture, i) => (
                                <div className="flex items-center gap-3 border-t hairline px-5 py-3.5 text-sm text-richblack-100" key={i}>
                                    <IoVideocamOutline className="text-base text-yellow-50" />
                                    <p>{lecture?.title}</p>
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CourseContent

import React from 'react'
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformationForm';
import { FaCheck } from "react-icons/fa";
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse/PublishCourse';

const RenderSteps = () => {

    const { step } = useSelector((state) => state.course);

    const steps = [
        { id: 1, title: "Course information", hint: "Describe your course" },
        { id: 2, title: "Course builder", hint: "Add sections and lectures" },
        { id: 3, title: "Publish", hint: "Go live to students" },
    ];
    const pct = Math.round((step / steps.length) * 100);

    return (
        <>
            {/* progress header: connectors fill as you move forward */}
            <div className="mb-6 overflow-hidden rounded-3xl border border-white/10 bg-richblack-800/80">
                <div className="flex items-center justify-between px-6 pt-5 text-xs">
                    <span className="uppercase tracking-[0.2em] text-richblack-300">Step {step} of {steps.length}</span>
                    <span className="text-richblack-100">{pct}% complete</span>
                </div>
                <div className="mx-6 mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-richblack-5 transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
                </div>

                <div className="flex items-start px-6 pb-6 pt-6">
                    {steps.map((item, index) => {
                        const done = step > item.id, current = step === item.id;
                        return (
                            <React.Fragment key={item.id}>
                                <div className="flex w-[110px] shrink-0 flex-col items-center gap-3 text-center sm:w-[150px]">
                                    <span className="relative flex h-11 w-11 items-center justify-center">
                                        {current && <span className="absolute inset-0 animate-ping rounded-full bg-richblack-5/20" />}
                                        <span className={`relative flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold transition-all duration-500
                                            ${done ? "scale-100 bg-richblack-5 text-richblack-900"
                                                : current ? "border-2 border-richblack-5 bg-richblack-900 text-richblack-5 shadow-[0_0_0_6px_rgba(244,241,234,0.08)]"
                                                    : "border border-white/15 text-richblack-300"}`}>
                                            {done ? <FaCheck className="text-sm" /> : item.id}
                                        </span>
                                    </span>
                                    <span>
                                        <span className={`block text-sm font-medium transition-colors ${item.id <= step ? "text-richblack-5" : "text-richblack-300"}`}>{item.title}</span>
                                        <span className="mt-0.5 hidden text-xs text-richblack-300 sm:block">{item.hint}</span>
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="relative mt-[21px] h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
                                        <span className="absolute inset-y-0 left-0 rounded-full bg-richblack-5 transition-all duration-700 ease-out"
                                            style={{ width: done ? "100%" : "0%" }} />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {step === 1 && (<CourseInformationForm />)}
            {step === 2 && (<CourseBuilderForm />)}
            {step === 3 && (<PublishCourse />)}
        </>
    )
}

export default RenderSteps

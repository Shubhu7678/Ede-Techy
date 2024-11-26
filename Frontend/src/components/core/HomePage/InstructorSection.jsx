import React from 'react'
import InstructorImage from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import CTAButton from './CTAButton';
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
    return (
        <div className="mt-16">
            <div className="flex flex-col md:flex-row gap-20 items-center">
                <div className="w-[90%] md:w-[50%]" >
                    <img src={InstructorImage} className="shadow-white" alt="" />
                </div>
                <div className="w-[90%] md:w-[50%]  flex flex-col items-center md:items-start  gap-7 " >
                    <div className="text-4xl w-full md:w-[50%] font-semibold text-center md:text-start" >Become an <HighlightText text={"Instructor"} /></div>
                    <p className="text-[16px]  font-medium text-richblack-200 text-center md:text-start" >Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                    <div className="w-fit " >
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex flex-row items-center gap-2">
                                <p>Start teaching today</p>
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection;
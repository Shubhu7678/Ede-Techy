import React from 'react'
import InstructorImage from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import CTAButton from './CTAButton';
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
    return (
        <div className="mt-28 w-full">
            <div className="flex flex-col md:flex-row gap-20 items-center">
                <div data-reveal className="w-[90%] md:w-[50%] relative" >
                    <div className="absolute -inset-6 rounded-3xl bg-yellow-50/10 blur-3xl" />
                    <img src={InstructorImage} className="relative rounded-2xl" alt="" />
                </div>
                <div data-reveal className="w-[90%] md:w-[50%]  flex flex-col items-center md:items-start  gap-7 " >
                    <p className="eyebrow">Teach with us</p>
                    <div className="section-title text-5xl md:text-6xl w-full md:w-[70%] text-center md:text-start" >Become an <HighlightText text={"Instructor"} /></div>
                    <p className="text-[17px] font-light text-richblack-100 leading-relaxed text-center md:text-start" >Instructors from around the world teach millions of students on EdeTechy. We provide the tools and skills to teach what you love.</p>
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
import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import TimelineImage from '../../../assets/Images/TimelineImage.png';

const timeline = [
    {

        Logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success company",
    },
    {

        Logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority",
    },
    {

        Logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills",
    },
    {

        Logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution",
    },
]

const TimelineSection = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row gap-16 items-center" >
                <div className="w-[90%] md:w-[38%] flex flex-col gap-4 relative">
                    <div className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-yellow-50/60 via-yellow-50/20 to-transparent" />
                    {timeline.map((value, key) => (
                        <div key={key} data-reveal className="relative flex flex-row items-center gap-7 py-4">
                            <div className="relative z-10 w-[56px] h-[56px] shrink-0 bg-richblack-900 rounded-full flex justify-center items-center border border-yellow-50/50 shadow-[0_0_30px_-4px_rgba(232,196,104,0.5)]" >
                                <img className="w-6" src={value.Logo} alt="" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="font-display font-semibold text-2xl text-richblack-5" >{value.heading}</div>
                                <div className="text-[15px] text-richblack-200 font-light" >{value.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-[95%] md:w-[52%] relative mb-16" data-reveal>
                    <div className="absolute -inset-4 rounded-3xl bg-yellow-50/10 blur-3xl" />
                    <img className="relative rounded-2xl h-fit object-cover border hairline" src={TimelineImage} alt="" />
                    <div className="absolute left-[50%] -translate-x-1/2 -bottom-10 w-[88%] md:w-[72%] flex flex-row glass !bg-richblack-900/85 rounded-2xl text-richblack-5 uppercase py-6 shadow-2xl shadow-black/60">
                        <div className="w-[50%] flex flex-row gap-4 items-center md:border-r hairline px-7" >
                            <p className="font-display text-4xl md:text-5xl font-semibold gold-text">10</p>
                            <p className="text-richblack-100 text-[11px] tracking-[0.18em]" >Years Experience</p>
                        </div>
                        <div className="md:w-[50%] flex flex-row gap-4 px-7 items-center" >
                            <p className="font-display text-4xl md:text-5xl font-semibold gold-text">250</p>
                            <p className="text-[11px] tracking-[0.18em] text-richblack-100">Types of Courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineSection

import React from 'react'
import CTAButton from './CTAButton';
import HighlightText from './HighlightText';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position , heading, subheading,ctabtn1 , ctabtn2 , codeblock , backgroundGradient , codeColor}) => {
  return (
      <div className={`flex ${position} my-20 justify-between gap-10 `}>
          
          {/* section 1  */}
          <div className="w-[100%] lg:w-[50%] flex flex-col gap-8" >
              {heading}
              <div className="font-bold text-center md:text-start text-richblack-300 " >
                  {subheading}
              </div>
              <div className="flex  justify-center md:justify-start w-full  gap-3 lg:gap-7 ">
                  <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
                      <div className="flex flex-row gap-2 items-center " >
                          {ctabtn1.text}
                          <FaArrowRight/>
                      </div>
                  </CTAButton>
                  <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto} >
                      <div className="flex flex-row gap-2 items-center " >
                          {ctabtn2.text}
                          <FaArrowRight/>
                      </div>
                  </CTAButton>
              </div>
          </div>

          {/* Section 2  */}

          <div className="flex flex-row w-[95%] lg:w-[35%]  border border-blue-200 p-2 rounded-md">
              {/* Hw Bg gradient  */}
              <div className="w-[10%] flex flex-col font-bold font-inter text-center text-richblack-400 " >
                  <p>1</p>
                  <p>2</p>
                  <p>3</p>
                  <p>4</p>
                  <p>5</p>
                  <p>6</p>
                  <p>7</p>
                  <p>8</p>
                  <p>9</p>
                  <p>10</p>
                  <p>11</p>
              </div>
              <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`} >
                  <TypeAnimation
                   
                      sequence={[codeblock, 3000, ""]}
                      repeat={Infinity}
                      omitDeletionAnimation={true}
                      speed={60}
                      style={
                          {
                              whiteSpace: 'pre-line',
                              display: 'block'
                          }
                      }

                  />
              </div>
          </div>
    </div>
  )
}

export default CodeBlocks
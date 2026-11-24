import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const ExploreMore = () => {

  const tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"];

  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCard = (value) => {

    setCurrentTab(value);
    const result = HomePageExplore.filter((item) => (value === item.tag));
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  }

  return (
    <div className="relative w-full my-8">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[70%] -translate-x-1/2 rounded-full bg-yellow-50/[0.07] blur-[110px]" />

      <div className="relative text-center" data-reveal>
        <p className="eyebrow mb-4">Curriculum</p>
        <div className="section-title text-5xl md:text-7xl w-[90%] md:w-full mx-auto">
          Unlock the <HighlightText text={"Power of Code"} />
        </div>
        <p className="text-richblack-100 text-lg font-light mt-5 max-w-xl mx-auto">
          Pick a path, start for free, and build real projects from your very first lesson.
        </p>
      </div>

      {/* tabs (scrollable on mobile) */}
      <div className="relative mt-12 mx-auto w-full md:w-fit max-w-full overflow-x-auto no-scrollbar px-4" data-reveal>
        <div className="glass text-[14px] p-1.5 rounded-full flex flex-row gap-1 w-max mx-auto">
          {tabsName.map((value, index) => (
            <button onClick={() => setMyCard(value)} key={index}
              className={`${value === currentTab
                ? "bg-gradient-to-b from-yellow-25 to-yellow-100 text-richblack-900 font-semibold shadow-[0_8px_24px_-8px_rgba(232,196,104,0.7)]"
                : "text-richblack-100 hover:text-yellow-25"} whitespace-nowrap px-5 py-2.5 transition-all duration-300 rounded-full`}>
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* key remounts the grid so cards animate in on every tab change */}
      <div key={currentTab} className="relative grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mb-8 mx-auto w-[92%] md:w-full">
        {courses.map((course, index) => (
          <CourseCard key={index} index={index} course={course} currentCard={currentCard} setCurrentCard={setCurrentCard} />
        ))}
      </div>
    </div>
  )
}

export default ExploreMore

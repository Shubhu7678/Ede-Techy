import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import CourseCard from './CourseCard';

const CourseSlider = ({ Courses }) => {
  return (
    <div className="w-full">
      {
        Courses?.length ? (
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
            spaceBetween={24}
            className="review-swiper !pb-14"
          >
            {Courses.map((course, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 px-6 py-14 text-center">
            <p className="font-display text-2xl text-richblack-5">No courses found yet</p>
            <p className="mt-1 text-sm font-light text-richblack-200">Check back soon — new courses are added regularly.</p>
          </div>
        )
      }
    </div>
  )
}

export default CourseSlider

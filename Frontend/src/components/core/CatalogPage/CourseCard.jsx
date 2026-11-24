import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../../common/RatingStars';

const CourseCard = ({ course }) => {

    const [avgRatingCount, setAvgRatingCount] = useState(0);

    useEffect(() => {
        setAvgRatingCount(GetAvgRating(course?.ratingAndReviews));
    }, [course])

    const instructor = [course?.instructor?.firstName, course?.instructor?.lastName].filter(Boolean).join(" ");

    return (
        <NavLink to={`/courses/${course._id}`} className="group block h-full">
            <div className="glass h-full overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-50/40 hover:shadow-[0_40px_80px_-40px_rgba(232,196,104,0.45)]">
                <div className="relative aspect-video overflow-hidden">
                    <img className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" src={course.thumbnail} alt={course?.courseName} />
                    <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/70 to-transparent" />
                    <span className="absolute bottom-3 right-3 rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-richblack-900">
                        {"₹ " + course?.price}
                    </span>
                </div>
                <div className="flex flex-col gap-2 p-5">
                    <p className="font-display text-2xl font-semibold leading-tight text-richblack-5">{course?.courseName}</p>
                    {instructor && <p className="text-sm font-light text-richblack-200">by {instructor}</p>}
                    <div className="mt-1 flex items-center gap-2 text-sm">
                        <span className="font-medium text-yellow-50">{avgRatingCount || 0}</span>
                        <RatingStars Review_Count={avgRatingCount} />
                        <span className="text-richblack-300">({course?.ratingAndReviews?.length || 0})</span>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default CourseCard

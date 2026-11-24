import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { apiConnector } from '../../services/apiconnector';
import { reviewRatingEndPoints } from '../../services/apis'

// Shown alongside (or instead of) live reviews so the section is never empty.
const DUMMY_REVIEWS = [
    { name: "Aarav Sharma", course: "Full-Stack Web Development", rating: 5, review: "The projects felt like real client work. I shipped my first MERN app in three weeks and landed an internship right after." },
    { name: "Priya Nair", course: "React Mastery", rating: 5, review: "Instructors explain the why, not just the how. Hooks finally clicked for me, and the feedback on my code was razor sharp." },
    { name: "Rohan Mehta", course: "Python for Data", rating: 4.5, review: "Clean lessons, zero fluff. The pacing let me learn after work without ever feeling lost." },
    { name: "Ananya Iyer", course: "UI Engineering with CSS", rating: 5, review: "My layouts went from 'student project' to portfolio-ready. The animation module alone was worth the price." },
    { name: "Karan Verma", course: "Node.js & APIs", rating: 5, review: "Building and deploying a real REST API with auth taught me more than months of tutorials." },
    { name: "Sneha Kulkarni", course: "Next.js Bootcamp", rating: 4.5, review: "Beautiful platform and genuinely helpful mentors. I got unblocked within hours every single time." },
    { name: "Vikram Singh", course: "Java Foundations", rating: 5, review: "Structured, challenging and rewarding. I cleared my campus interviews confidently thanks to the practice sets." },
    { name: "Meera Joshi", course: "Responsive Web Design", rating: 5, review: "Short lessons, big results. I redesigned my family's shop website in a weekend and it looks stunning." },
];

const Stars = ({ value = 0 }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
            <FaStar key={n} className={`text-sm ${value >= n - 0.25 ? "text-yellow-50" : value >= n - 0.75 ? "text-yellow-50/60" : "text-richblack-600"}`} />
        ))}
    </div>
);

const initials = (name = "") => name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();

const ReviewSlider = () => {

    const { FETCH_ALL_REVIEWS_API } = reviewRatingEndPoints;
    const [live, setLive] = useState([]);

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const response = await apiConnector('GET', FETCH_ALL_REVIEWS_API, {})
                if (response.data.success) setLive(response.data?.data || []);
            } catch (error) {
                console.log("Error occured ::", error)
            }
        }
        fetchAllReviews();
    }, [])

    const liveReviews = live.map((d) => ({
        name: `${d?.user?.firstName ?? ""} ${d?.user?.lastName ?? ""}`.trim() || "Student",
        image: d?.user?.image,
        course: d?.course?.courseName,
        rating: d?.rating || 0,
        review: d?.review || "",
    }));
    // real reviews first, padded with samples until the carousel feels full
    const reviews = liveReviews.length >= 6 ? liveReviews : [...liveReviews, ...DUMMY_REVIEWS];

    return (
        <div className="w-full mb-10">
            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                loop={reviews.length > 3}
                grabCursor
                autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
                breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
                className="review-swiper !pb-14"
            >
                {reviews.map((r, index) => (
                    <SwiperSlide key={index} className="!h-auto">
                        <div className="glass group relative flex h-full min-h-[270px] flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-yellow-50/40">
                            <FaQuoteLeft className="text-3xl text-yellow-50/70" />
                            <p className="mt-5 flex-grow text-[15.5px] font-light leading-relaxed text-richblack-25">
                                {r.review.split(" ").length > 28 ? r.review.split(" ").slice(0, 28).join(" ") + "…" : r.review}
                            </p>
                            <div className="mt-6 flex items-center justify-between gap-4 border-t hairline pt-5">
                                <div className="flex items-center gap-3 min-w-0">
                                    {r.image ? (
                                        <img className="h-11 w-11 rounded-full object-cover ring-1 ring-yellow-50/50" src={r.image} alt={r.name} />
                                    ) : (
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-yellow-25 to-yellow-200 font-display text-lg font-semibold text-richblack-900">
                                            {initials(r.name)}
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <p className="truncate font-medium text-richblack-5">{r.name}</p>
                                        <p className="truncate text-xs text-richblack-200">{r.course}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <Stars value={r.rating} />
                                    <span className="text-[11px] text-yellow-100">{Number(r.rating).toFixed(1)}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ReviewSlider

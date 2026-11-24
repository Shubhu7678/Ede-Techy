import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsApi';
import GetAvgRating from '../utils/avgRating';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import { formatDate } from '../services/formatDate';
import { MdOutlineInfo } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { IoMdArrowDropright } from "react-icons/io";
import { FaShareFromSquare } from "react-icons/fa6";
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { addToCart } from '../slices/cartSlice';
import CourseContent from '../components/core/CourseDetails/CourseContent';
import Footer from '../components/common/Footer';



const CourseDetails = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    const [totalNoOfSections, setTotalNoOfSections] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(() => {

        let lectures = 0;
        let sections = 0;
        courseData?.courseContent?.forEach((section) => {

            lectures += section.subSection.length || 0;
            sections++;
        })

        setTotalNoOfLectures(lectures);
        setTotalNoOfSections(sections);
    }, [courseData])


    useEffect(() => {

        const count = GetAvgRating(courseData?.ratingAndReviews);
        setAvgReviewCount(count);

    }, [courseData])

    useEffect(() => {

        const getCourseDataById = async () => {
            setLoading(true);
            try {
                const result = await getFullDetailsOfCourse(courseId);
                setCourseData(result);
                // console.log(result);

            } catch (error) {

                console.log("Error occured : ", error);
            }
            setLoading(false);
        }
        getCourseDataById();

    }, [courseId])


    const handleBuyCourse = async () => {

        if (user && user?.accountType === 'Instructor') { 
            
            toast.error("Instructor can't buy course at this moment");
            return;
        }
        setLoading(true);
        if (token) {

            buyCourse(token, [courseId], user, navigate, dispatch);
        }
        else {
            setConfirmationModal(
                {
                    text1: "You are not Logged In",
                    text2: "Login to purchase the course",
                    btn1Text: "Login",
                    btn2Text: "Cancel",
                    btn1Handler: () => navigate('/login'),
                    btn2Handler: () => setConfirmationModal(null),
                }
            )
        }
        setLoading(false);
    }


    const handleAddToCart = () => { 
           
        if (user && user?.accountType === 'Instructor') { 

            toast.error("Instructor can't add course to cart");
            return;
        }

        if (token) {

            dispatch(addToCart(courseData));
        }
        else {
            setConfirmationModal(
                {
                    text1: "You are not Logged In",
                    text2: "Please Login to add to cart",
                    btn1Text: "Login",
                    btn2Text: "Cancel",
                    btn1Handler: () => navigate('/login'),
                    btn2Handler: () => setConfirmationModal(null),
                }
            )
        }
         
    }

    const handleShare = () => { 

        copy(window.location.href);
        toast.success("Link copied to clipboard");

    }
    const enrolled = !!(user && courseData?.studentsEnrolled?.includes(user._id));
    const instructorName = [courseData?.instructor?.firstName, courseData?.instructor?.lastName].filter(Boolean).join(" ");

    return (
        <div className="grain text-richblack-5">

            {/* Hero */}
            <div className="relative -mt-[72px] overflow-hidden border-b hairline pt-[72px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_30%_0%,rgba(232,196,104,0.15),transparent_70%)]" />
                <div className="relative mx-auto w-11/12 max-w-maxContent py-16 md:py-24 lg:pr-[400px]">
                    <p className="eyebrow mb-4">Course</p>
                    <h1 className="section-title text-4xl md:text-6xl">{courseData?.courseName}</h1>
                    <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-richblack-100">{courseData?.courseDescription}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-richblack-100">
                        <span className="font-medium text-yellow-50">{avgReviewCount}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span>{`(${courseData?.ratingAndReviews?.length ?? 0} reviews)`}</span>
                        <span className="text-richblack-400">•</span>
                        <span>{`${courseData?.studentsEnrolled?.length ?? 0} students enrolled`}</span>
                    </div>
                    <p className="mt-3 text-sm text-richblack-100">Created by <span className="text-richblack-5">{instructorName}</span></p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-richblack-200">
                        <MdOutlineInfo /> <span>Created {formatDate(courseData?.createdAt)}</span>
                        <TbWorld className="ml-3" /> <span>English</span>
                    </div>
                </div>
            </div>

            <div className="relative mx-auto w-11/12 max-w-maxContent">
                {/* Purchase card */}
                <div className="relative z-10 mt-8 lg:absolute lg:-top-72 lg:right-0 lg:mt-0 lg:w-[360px]">
                    <div className="rounded-3xl border border-yellow-50/25 bg-richblack-800 p-5 shadow-[0_40px_100px_-30px_rgba(232,196,104,0.35)]">
                        <img className="aspect-video w-full rounded-2xl object-cover" src={courseData?.thumbnail} alt="" />
                        <p className="mt-5 font-display text-4xl font-semibold gold-text">{"₹ " + (courseData?.price ?? "")}</p>
                        <div className="mt-5 flex flex-col gap-3">
                            <button
                                onClick={enrolled ? () => navigate('/dashboard/enrolled-courses') : () => handleBuyCourse()}
                                className="btn-gold w-full rounded-full py-3.5 font-semibold"
                            >
                                {enrolled ? "Go to course" : "Buy now"}
                            </button>
                            {user && !enrolled && (
                                <button onClick={handleAddToCart} className="btn-ghost w-full rounded-full py-3.5 font-medium">
                                    Add to cart
                                </button>
                            )}
                        </div>
                        <p className="mt-4 text-center text-xs text-richblack-200">30-day money-back guarantee</p>
                        <div className="mt-5 border-t hairline pt-5">
                            <p className="font-display text-2xl text-richblack-5">This course includes</p>
                            <div className="mt-2 flex flex-col gap-1.5">
                                {courseData?.instructions?.map((instruction, index) => (
                                    <div key={index} className="flex items-center gap-1 text-sm text-yellow-25">
                                        <IoMdArrowDropright />
                                        <p>{instruction}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="mx-auto mt-5 flex items-center gap-2 text-sm text-yellow-50 transition-colors hover:text-yellow-25" onClick={handleShare}>
                            <FaShareFromSquare /> Share
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="py-12 lg:w-[calc(100%-400px)]">
                    <div className="glass rounded-3xl p-7">
                        <p className="font-display text-3xl font-semibold text-richblack-5">What you will learn</p>
                        <div className="mt-3 font-light leading-relaxed text-richblack-100">
                            {courseData?.whatYouWillLearn}
                        </div>
                    </div>
                    <div className="mt-8">
                        <CourseContent course={courseData} sections={totalNoOfSections} lectures={totalNoOfLectures} />
                    </div>
                </div>
            </div>
            <Footer />
            {confirmationModal && (<ConfirmationModal modalData={confirmationModal} />)}
        </div>
    )
}

export default CourseDetails

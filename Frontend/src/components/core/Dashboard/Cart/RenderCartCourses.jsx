import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import GetAvgRating from '../../../../utils/avgRating';

export default function RenderCartCourses() {
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    return (
        <div className="flex flex-1 flex-col gap-4">
            {cart.map((course) => (
                <div key={course._id}
                    className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-richblack-800/80 p-5 sm:flex-row">
                    <img src={course?.thumbnail} alt={course?.courseName} className="aspect-video w-full rounded-2xl object-cover sm:h-28 sm:w-48" />
                    <div className="min-w-0 flex-1">
                        <p className="font-display text-2xl font-semibold text-richblack-5">{course?.courseName}</p>
                        <p className="mt-1 text-sm text-richblack-200">{course?.category?.name}</p>
                        <div className="mt-2 flex items-center gap-2 text-sm">
                            <span className="text-yellow-50">{GetAvgRating(course?.ratingAndReviews)}</span>
                            <ReactStars count={5} value={GetAvgRating(course?.ratingAndReviews)} size={18} edit={false}
                                activeColor="#E8C468" emptyIcon={<FaStar />} fullIcon={<FaStar />} />
                            <span className="text-richblack-300">({course?.ratingAndReviews?.length})</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                        <p className="font-display text-3xl font-semibold gold-text">₹ {course?.price}</p>
                        <button onClick={() => dispatch(removeFromCart(course._id))}
                            className="flex items-center gap-2 rounded-full border border-pink-200/30 px-4 py-2 text-sm text-pink-100 transition-colors hover:bg-pink-200/10">
                            <RiDeleteBin6Line /> Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

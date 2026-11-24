import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function RenderTotalCourses() {
    const { total, cart } = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id)
        buyCourse(token, courses, user, navigate, dispatch)
    }

    return (
        <div className="h-fit w-full rounded-3xl border border-yellow-50/25 bg-richblack-800 p-6 lg:sticky lg:top-24 lg:w-[320px]">
            <p className="text-xs uppercase tracking-[0.2em] text-richblack-300">Order total</p>
            <p className="mt-2 font-display text-5xl font-semibold gold-text">₹ {total}</p>
            <p className="mt-1 text-sm text-richblack-200">{cart.length} {cart.length === 1 ? "course" : "courses"}</p>
            <button onClick={handleBuyCourse} className="btn-gold mt-6 w-full rounded-full py-3.5 font-semibold">
                Checkout
            </button>
            <p className="mt-3 text-center text-xs text-richblack-300">30-day money-back guarantee</p>
        </div>
    )
}

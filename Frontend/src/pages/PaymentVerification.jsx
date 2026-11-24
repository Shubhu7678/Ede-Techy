import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { verifyPayment } from '../services/operations/studentFeaturesAPI';
import { toast } from 'react-hot-toast';
import { resetCart } from '../slices/cartSlice';


const PaymentVerification = () => {

  const { orderId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(null);
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {

    // console.log("Finally on this page...");
    const searchParams = new URLSearchParams(location.search);
    const coursesParam = searchParams.get('courses');
    const courses = coursesParam ? coursesParam.split(',') : [];
    console.log("Courses id's :", courses);

    const verifyPaymentData = async () => {
      setLoading(true);
      // const toastId = toast.loading('Verifying payment');

      await verifyPayment(orderId, courses, user, token, navigate);
      setLoading(false);

      navigate('/dashboard/enrolled-courses');
      dispatch(resetCart());

    }

    verifyPaymentData();

  }, [orderId, navigate, location.search])
  return (
    <>
      {
        loading &&
        (
          <div className="grain flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-4">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-richblack-800/80 p-10 text-center">
              <div className="spinner mx-auto" />
              <h1 className="section-title mt-8 text-4xl text-richblack-5">Verifying payment</h1>
              <p className="mt-3 font-light leading-relaxed text-richblack-100">
                Your payment is being processed. Please don't refresh the page.
              </p>
              <div className="mt-8 flex items-center justify-between gap-4 rounded-xl border hairline bg-white/[0.02] px-4 py-3 text-sm">
                <span className="text-richblack-200">Transaction ID</span>
                <span className="truncate font-mono text-yellow-25">{orderId}</span>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default PaymentVerification

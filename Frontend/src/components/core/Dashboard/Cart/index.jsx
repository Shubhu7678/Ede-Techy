import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LuShoppingCart } from 'react-icons/lu'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalCourses from './RenderTotalCourses';
import PageHeader from '../PageHeader';

const index = () => {

    const { total, totalItems } = useSelector((state) => state.cart);

    return (
        <div className="text-richblack-5">
            <PageHeader title="Cart" subtitle={`${totalItems} ${totalItems === 1 ? "course" : "courses"} in your cart`} />
            {
                total > 0 ? (
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                        <RenderCartCourses />
                        <RenderTotalCourses />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 px-6 py-20 text-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-yellow-50/30 bg-yellow-50/10 text-3xl text-yellow-50"><LuShoppingCart /></span>
                        <p className="mt-6 font-display text-3xl text-richblack-5">Your cart is empty</p>
                        <p className="mt-2 max-w-sm text-sm font-light text-richblack-200">Browse the catalog and add a course to get started.</p>
                        <Link to="/" className="btn-gold mt-7 rounded-full px-7 py-3 text-sm font-semibold">Explore courses</Link>
                    </div>
                )
            }
        </div>
    )
}

export default index

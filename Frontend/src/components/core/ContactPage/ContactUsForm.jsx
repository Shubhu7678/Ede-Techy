import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import countryCode from '../../../data/countrycode';
import toast from 'react-hot-toast';
import { apiConnector } from '../../../services/apiconnector';
import { contactUsEndpoints } from '../../../services/apis';


const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async (data) => {

        console.log(data);

        try {
            setLoading(true);
            const toastId = toast.loading('Please wait...');

            // const response = await apiConnector('POST', contactUsEndpoints.CONTACTUS_API, { ...data });
            const response = { status: 'OK' }
            console.log("Response log : ", response);
            setLoading(false);
            toast.dismiss(toastId);

        } catch (err) {

            console.log("Error : ", err.message);
            setLoading(false);

        }

    }

    useEffect(() => {

        if (isSubmitSuccessful) {

            reset({

                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: '',
            })

        }

    }, [reset, isSubmitSuccessful])

    // shared field styles so every input lines up
    const label = "mb-2 block text-[13px] font-medium tracking-wide text-richblack-25";
    const field = "w-full rounded-xl border border-white/10 bg-richblack-900/60 px-4 py-3.5 text-[15px] text-richblack-5 placeholder:text-richblack-300 outline-none transition-colors focus:border-yellow-50/70";
    const err = "mt-1.5 block text-xs text-pink-200";

    return (

        <form onSubmit={handleSubmit(submitContactForm)} className="w-full flex flex-col gap-y-5">
            <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="w-full">
                    <label htmlFor="firstName" className={label}>First Name <sup className="text-pink-200">*</sup></label>
                    <input id="firstName" type="text" placeholder="Enter first name" className={field}
                        {...register('firstName', { required: true })} />
                    {errors.firstName && <span className={err}>First name is required</span>}
                </div>
                <div className="w-full">
                    <label htmlFor="lastName" className={label}>Last Name <sup className="text-pink-200">*</sup></label>
                    <input id="lastName" type="text" placeholder="Enter last name" className={field}
                        {...register('lastName', { required: true })} />
                    {errors.lastName && <span className={err}>Last name is required</span>}
                </div>
            </div>

            <div>
                <label htmlFor="email" className={label}>Email Address <sup className="text-pink-200">*</sup></label>
                <input id="email" type="text" placeholder="Enter email address" className={field}
                    {...register('email', { required: true })} />
                {errors.email && <span className={err}>Email is required</span>}
            </div>

            <div className="w-full">
                <label htmlFor="phone" className={label}>Phone Number <sup className="text-pink-200">*</sup></label>
                <div className="flex gap-3">
                    <div className="relative w-[34%] sm:w-[28%] shrink-0">
                        <select
                            id="dropdown"
                            className={`${field} appearance-none cursor-pointer pr-9 truncate`}
                            defaultValue="+91"
                            {...register('countrycode', { required: true })}
                        >
                            {countryCode.map((data, index) => (
                                <option key={index} className="bg-richblack-800 text-richblack-5" value={data.code}>
                                    {data.code} {data.country}
                                </option>
                            ))}
                        </select>
                        <svg className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-yellow-50" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input id="phone" className={`${field} min-w-0 flex-1`} placeholder="Enter phone number"
                        {...register('phone', {
                            required: { value: true, message: 'Phone number is required' },
                            maxLength: { value: 10, message: 'Invalid phone number' },
                            minLength: { value: 8, message: 'Invalid phone number' },
                        })}
                    />
                </div>
                {errors.phone && <span className={err}>{errors.phone.message}</span>}
            </div>

            <div className="w-full">
                <label htmlFor="message" className={label}>Message <sup className="text-pink-200">*</sup></label>
                <textarea id="message" placeholder="Enter your message here" rows="6" className={`${field} resize-y`}
                    {...register('message', { required: { value: true, message: "Message is required" } })} />
                {errors.message && <span className={err}>{errors.message.message}</span>}
            </div>

            <button type="submit" className="btn-gold mt-2 w-full rounded-full py-3.5 px-3 font-semibold tracking-wide">
                Send Message
            </button>
        </form >
    )
}

export default ContactUsForm

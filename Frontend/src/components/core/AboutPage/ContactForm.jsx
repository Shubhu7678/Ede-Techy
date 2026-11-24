import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactForm = () => {
    return (
        <div className="mx-auto max-w-2xl" data-reveal>
            <div className="text-center mb-10">
                <p className="eyebrow mb-4">Contact</p>
                <h2 className="section-title text-5xl md:text-6xl">Get in touch</h2>
                <p className="mt-4 text-lg font-light text-richblack-100">We'd love to hear from you. Please fill out this form.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-richblack-800 p-6 md:p-10">
                <ContactUsForm />
            </div>
        </div>
    )
}

export default ContactForm

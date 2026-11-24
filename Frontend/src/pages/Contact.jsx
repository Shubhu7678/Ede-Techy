import React, { useRef } from 'react'
import ChatContact from '../components/core/ContactPage/ChatContact'
import ContactUsForm from '../components/core/ContactPage/ContactUsForm'
import HighlightText from '../components/core/HomePage/HighlightText'
import Footer from '../components/common/Footer'
import useReveal from '../hooks/useReveal'

const Contact = () => {
    const root = useRef(null);
    useReveal(root);

    return (
        <div ref={root} className="grain text-richblack-5">
            <section className="relative overflow-hidden -mt-[72px] pt-[72px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(232,196,104,0.15),transparent_70%)]" />

                <div className="relative w-11/12 mx-auto max-w-maxContent pt-28 md:pt-36 pb-28">
                    <div className="text-center mb-16">
                        <p data-reveal className="eyebrow">Contact</p>
                        <h1 data-reveal className="section-title mt-5 text-5xl md:text-7xl">
                            Got an idea? <HighlightText text={"Let's team up."} />
                        </h1>
                        <p data-reveal className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-richblack-100">
                            Tell us a little about yourself and what you have in mind. We reply within one business day.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                        <ChatContact />
                        <div data-reveal className="w-full lg:w-[62%]">
                            <div className="relative">
                                <div className="relative rounded-3xl border border-white/10 bg-richblack-800 p-6 md:p-10">
                                    <h2 className="section-title text-4xl mb-1">Send us a message</h2>
                                    <p className="text-richblack-200 font-light mb-8">All fields marked <span className="text-yellow-50">*</span> are required.</p>
                                    <ContactUsForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Contact

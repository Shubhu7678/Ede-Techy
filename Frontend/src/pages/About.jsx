import React, { useRef } from 'react'
import { FaEye, FaRocket } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import BannerImage1 from '../assets/Images/aboutus1.webp';
import BannerImage2 from '../assets/Images/aboutus2.webp';
import BannerImage3 from '../assets/Images/aboutus3.webp';
import Quote from '../components/core/AboutPage/Quote';
import FoundingStory from '../assets/Images/FoundingStory.png';
import StatsComponent from '../components/core/AboutPage/StatsComponent';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactForm from '../components/core/AboutPage/ContactForm';
import Footer from '../components/common/Footer';
import useReveal from '../hooks/useReveal';

const gallery = [
    { src: BannerImage1, cls: "md:mt-0" },
    { src: BannerImage2, cls: "md:mt-14" },
    { src: BannerImage3, cls: "md:mt-5" },
];

const About = () => {
    const root = useRef(null);
    useReveal(root);

    return (
        <div ref={root} className="grain text-richblack-5">
            {/* ===== Hero ===== */}
            <section className="relative overflow-hidden -mt-[72px] pt-[72px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(232,196,104,0.16),transparent_70%)]" />
                <div className="relative w-11/12 mx-auto max-w-maxContent flex flex-col items-center text-center pt-28 md:pt-36">
                    <p data-reveal className="eyebrow">About EdeTechy</p>
                    <h1 data-reveal className="section-title mt-5 text-5xl md:text-7xl lg:text-[5.5rem] lg:w-[80%]">
                        Driving innovation in online education for a <HighlightText text={"brighter future"} />
                    </h1>
                    <p data-reveal className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-richblack-100">
                        EdeTechy is at the forefront of online education. We're passionate about creating a brighter future
                        through cutting-edge courses built on emerging technologies, and a vibrant learning community.
                    </p>

                    <div className="mt-20 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
                        {gallery.map((g, i) => (
                            <div key={i} data-reveal className={`${g.cls} ${i > 0 ? "hidden md:block" : ""}`}>
                                <div className="group relative overflow-hidden rounded-3xl border border-yellow-50/20 shadow-[0_30px_70px_-30px_rgba(232,196,104,0.35)]">
                                    <img src={g.src} alt="" className="w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/60 via-transparent to-yellow-50/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Quote ===== */}
            <section className="border-b hairline">
                <div className="w-11/12 mx-auto max-w-maxContent">
                    <Quote />
                </div>
            </section>

            {/* ===== Story / Vision / Mission ===== */}
            <section className="mb-8">
                <div className="w-11/12 mx-auto max-w-maxContent mt-28">
                    <div className="flex flex-col lg:flex-row gap-14 lg:items-center">
                        <div className="flex flex-col lg:w-[50%] gap-6" data-reveal>
                            <p className="eyebrow">Where it began</p>
                            <h2 className="section-title text-5xl md:text-6xl">
                                Our <HighlightText text={"founding story"} />
                            </h2>
                            <p className="text-richblack-100 text-[17px] font-light leading-relaxed">
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It began with a group of educators, technologists and lifelong learners who saw the need for accessible, flexible and high-quality learning in a rapidly evolving digital world.
                            </p>
                            <p className="text-richblack-100 text-[17px] font-light leading-relaxed">
                                As experienced educators ourselves, we saw the limits of traditional systems first-hand. Education should not be confined to a classroom or restricted by geography — so we set out to build a platform that bridges those gaps and empowers people from all walks of life to unlock their potential.
                            </p>
                        </div>
                        <div className="lg:w-[50%] relative" data-reveal>
                            <div className="absolute -inset-6 rounded-[2rem] bg-yellow-50/10 blur-3xl" />
                            <div className="relative rounded-3xl border border-yellow-50/20 glass p-3">
                                <img className="rounded-2xl w-full" src={FoundingStory} alt="Our founding story" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-28">
                        {[
                            { icon: FaEye, tag: "Vision", title: "Where we're headed", body: "With this vision in mind, we set out to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts built a robust, intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience." },
                            { icon: FaRocket, tag: "Mission", title: "What drives us", body: "Our mission goes beyond delivering courses online. We want a vibrant community of learners who connect, collaborate and learn from one another. Knowledge thrives on sharing and dialogue, and we foster it through forums, live sessions and networking opportunities." },
                        ].map((c) => (
                            <div key={c.tag} data-reveal>
                                <div className="group glass h-full rounded-3xl p-9 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-50/40 hover:shadow-[0_40px_80px_-40px_rgba(232,196,104,0.45)]">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-50/25 bg-yellow-50/10 text-xl text-yellow-50">
                                        <c.icon />
                                    </div>
                                    <p className="eyebrow mt-7">{c.tag}</p>
                                    <h3 className="section-title mt-2 text-4xl">{c.title}</h3>
                                    <p className="mt-5 text-[16px] font-light leading-relaxed text-richblack-100">{c.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <StatsComponent />

            <section className="w-11/12 max-w-maxContent mx-auto mt-10">
                <LearningGrid />
            </section>

            <section className="w-11/12 mx-auto my-28">
                <ContactForm />
            </section>

            <Footer />
        </div>
    )
}

export default About

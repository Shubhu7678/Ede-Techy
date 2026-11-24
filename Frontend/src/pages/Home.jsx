import React, { useLayoutEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';
import HeroScene from '../components/core/HomePage/HeroScene';
import useReveal from '../hooks/useReveal';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 50, suffix: "K+", label: "Active learners" },
    { value: 250, suffix: "+", label: "Expert-led courses" },
    { value: 120, suffix: "+", label: "Industry mentors" },
    { value: 98, suffix: "%", label: "Completion satisfaction" },
];

const skills = ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB", "Python", "TypeScript", "Next.js", "Git", "SQL", "DevOps"];

const Home = () => {
    const root = useRef(null);
    useReveal(root);

    useLayoutEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const ctx = gsap.context(() => {
            if (!reduce) {
                // hero entrance
                const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
                tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.9 })
                    .from(".hero-word", { yPercent: 115, duration: 1.3, stagger: 0.09 }, "-=0.5")
                    .from(".hero-fade", { y: 24, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.8")
                    .from(".hero-scroll", { opacity: 0, duration: 1 }, "-=0.4");

                // video grows into view as you scroll
                gsap.fromTo(".showcase-frame",
                    { scale: 0.82, borderRadius: 48 },
                    {
                        scale: 1, borderRadius: 20, ease: "none",
                        scrollTrigger: { trigger: ".showcase", start: "top 85%", end: "top 25%", scrub: true },
                    });
            }

            // count-up stats
            gsap.utils.toArray(".stat-num").forEach((el) => {
                const target = Number(el.dataset.value);
                if (reduce) { el.textContent = target; return; }
                const obj = { v: 0 };
                gsap.to(obj, {
                    v: target, duration: 2.2, ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 92%", once: true },
                    onUpdate: () => { el.textContent = Math.round(obj.v); },
                });
            });
        }, root);
        return () => ctx.revert();
    }, []);

    const headline = [
        ["Master", "the", "craft"],
        ["of", "modern", "code."],
    ];

    return (
        <div ref={root} className="grain">
            {/* ============ HERO ============ */}
            <section className="relative overflow-hidden min-h-[calc(100vh-72px)] flex items-center -mt-[72px] pt-[72px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_45%,rgba(232,196,104,0.13),transparent_70%)]" />
                <HeroScene />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-richblack-900 to-transparent pointer-events-none" />

                <div className="relative z-10 w-11/12 max-w-maxContent mx-auto py-24 lg:py-0">
                    <NavLink to="/signup" className="hero-badge inline-block">
                        <div className="group glass rounded-full pl-5 pr-4 py-2 flex items-center gap-3 text-[12px] tracking-[0.2em] uppercase text-yellow-25 transition-all duration-300 hover:border-yellow-50/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-50" />
                            Become an instructor
                            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </NavLink>

                    <h1 className="section-title mt-8 text-[clamp(3rem,8.2vw,7.2rem)] text-richblack-5 max-w-[11ch] lg:max-w-[9.5ch]">
                        {headline.map((line, i) => (
                            <span key={i} className="block">
                                {line.map((w, j) => (
                                    <span key={j} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.22em]">
                                        <span className={`hero-word inline-block ${w === "modern" ? "gold-text italic" : ""}`}>{w}</span>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <p className="hero-fade mt-8 max-w-[34rem] text-lg font-light leading-relaxed text-richblack-100">
                        Learn at your own pace, from anywhere in the world — with hands-on projects,
                        live quizzes and personal feedback from instructors who ship real software.
                    </p>

                    <div className="hero-fade flex flex-row flex-wrap gap-4 mt-10">
                        <CTAButton active={true} linkto={"/signup"}>
                            <span className="flex items-center gap-2">Start learning <FaArrowRight /></span>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/login"}>Book a demo</CTAButton>
                    </div>
                </div>

                <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-richblack-200">
                    Scroll
                    <span className="h-10 w-px bg-gradient-to-b from-yellow-50 to-transparent" />
                </div>
            </section>

            {/* ============ STATS ============ */}
            <section className="w-11/12 max-w-maxContent mx-auto -mt-2">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 border-y hairline py-12">
                    {stats.map((s, i) => (
                        <div key={i} data-reveal className={`text-center ${i !== 0 ? "lg:border-l hairline" : ""}`}>
                            <p className="font-display text-5xl md:text-6xl font-semibold gold-text">
                                <span className="stat-num" data-value={s.value}>0</span>{s.suffix}
                            </p>
                            <p className="mt-2 text-[11px] tracking-[0.22em] uppercase text-richblack-200">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ MARQUEE ============ */}
            <div className="mt-14 overflow-hidden border-b hairline pb-14" aria-hidden="true">
                <div className="marquee-track flex gap-14 font-display text-4xl md:text-5xl italic text-richblack-600">
                    {[...skills, ...skills].map((s, i) => (
                        <span key={i} className="flex items-center gap-14 whitespace-nowrap">
                            {s}<span className="text-yellow-100 not-italic text-2xl">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ============ SHOWCASE ============ */}
            <section className="showcase w-11/12 max-w-maxContent mx-auto my-28">
                <div className="text-center mb-14" data-reveal>
                    <p className="eyebrow mb-4">The experience</p>
                    <h2 className="section-title text-4xl md:text-6xl">
                        A classroom that feels <HighlightText text={"effortless"} />
                    </h2>
                </div>
                <div className="showcase-frame relative overflow-hidden border border-yellow-50/20 shadow-[0_40px_120px_-30px_rgba(232,196,104,0.35)]">
                    <video muted autoPlay loop playsInline className="w-full block">
                        <source src={Banner} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
                </div>
            </section>

            {/* ============ CODE + EXPLORE ============ */}
            <div className="relative w-11/12 mx-auto text-richblack-5 flex flex-col justify-between max-w-maxContent items-center">
                <CodeBlocks
                    position={`flex-col lg:flex-row`}
                    heading={
                        <div className="section-title text-5xl md:text-6xl text-center md:text-start">
                            Unlock your <HighlightText text={"coding potential"} /> with our online courses
                        </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabtn1={{ active: true, linkto: '/signup', text: "Try it Yourself" }}
                    ctabtn2={{ active: false, linkto: '/login', text: "Learn More" }}
                    codeblock={`<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <title>Coding Era</title>
                        </head>
                        <body>
                          <h2>Unlock Your Coding Potential</h2>
                          <p>With Online Courses</p>
                          <button>Buy Course</button>
                        </body>
                        </html>`}
                    codeColor={`text-yellow-25`}
                />

                <CodeBlocks
                    position={`flex-col lg:flex-row-reverse`}
                    heading={
                        <div className="section-title text-5xl md:text-6xl text-center md:text-start">
                            Start <HighlightText text={"coding in seconds"} />
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctabtn1={{ active: true, linkto: '/signup', text: "Continue Lesson" }}
                    ctabtn2={{ active: false, linkto: '/login', text: "Learn More" }}
                    codeblock={`<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <title>Document</title>
                        </head>
                        <body>
                           <h1>Hello</h1>
                           <p>World</p>
                           <button>Buy Course</button>
                        </body>
                        </html>`}
                    codeColor={`text-yellow-25`}
                />

                <ExploreMore />
            </div>

            {/* ============ SKILLS ============ */}
            <div className="relative mt-24 border-y hairline bg-gradient-to-b from-richblack-800/60 to-richblack-900 text-richblack-5">
                <div className="w-11/12 mx-auto flex flex-col items-center gap-5 justify-between max-w-maxContent">
                    <div className="flex flex-col md:flex-row gap-12 mt-28 mb-14 w-full items-end justify-between">
                        <div data-reveal className="w-[90%] md:w-[52%] section-title text-5xl md:text-6xl">
                            Get the skills you need for a <HighlightText text={"job that is in demand."} />
                        </div>
                        <div data-reveal className="w-[90%] md:w-[36%] flex flex-col gap-7 items-start">
                            <div className="text-[17px] font-light text-richblack-100 leading-relaxed">
                                The modern EdeTechy dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto="/signup">Learn more</CTAButton>
                        </div>
                    </div>
                    <TimelineSection />
                    <LearningLanguageSection />
                </div>
            </div>

            {/* ============ INSTRUCTOR + REVIEWS ============ */}
            <div className="relative w-11/12 mx-auto text-richblack-5 flex flex-col max-w-maxContent items-center gap-5 justify-between pb-24">
                <InstructorSection />
                <div data-reveal className="text-center mt-24 mb-4">
                    <p className="eyebrow mb-4">Testimonials</p>
                    <div className="section-title text-4xl md:text-6xl">
                        Reviews from our <HighlightText text={'students'} />
                    </div>
                </div>
                <ReviewSlider />
            </div>

            <Footer />
        </div>
    )
}

export default Home

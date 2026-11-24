import React from 'react'
import { IoMdChatbubbles } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { MdOutlineAccessTime } from "react-icons/md";

const items = [
    { icon: IoMdChatbubbles, title: "Chat with us", lines: ["Our friendly team is here to help.", "info@EdeTechy.com"], accent: true },
    { icon: BiWorld, title: "Visit us", lines: ["Come and say hello at our office HQ.", "Akshya Nagar 1st Block 1st Cross, Rammurthy Nagar, Bangalore - 560016"] },
    { icon: MdOutlineAccessTime, title: "Support hours", lines: ["Monday – Saturday", "9:00 am – 7:00 pm IST"] },
];

const ChatContact = () => {
    return (
        <div className="lg:w-[38%] flex flex-col gap-5">
            {items.map((it, i) => (
                <div key={i} data-reveal>
                    <div className="group glass flex gap-5 rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-yellow-50/40 hover:shadow-[0_30px_70px_-40px_rgba(232,196,104,0.45)]">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-yellow-50/25 bg-yellow-50/10 text-2xl text-yellow-50 transition-colors duration-500 group-hover:bg-yellow-50 group-hover:text-richblack-900">
                            <it.icon />
                        </div>
                        <div>
                            <h3 className="font-display text-[1.7rem] font-semibold leading-tight text-richblack-5">{it.title}</h3>
                            <p className="mt-2 text-[15px] font-light leading-relaxed text-richblack-100">{it.lines[0]}</p>
                            <p className={`mt-1 text-[15px] leading-relaxed ${it.accent ? "text-yellow-25 font-medium" : "font-light text-richblack-100"}`}>{it.lines[1]}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatContact

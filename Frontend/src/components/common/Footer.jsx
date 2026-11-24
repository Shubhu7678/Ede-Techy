import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="relative bg-richblack-900 border-t hairline overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 -top-40 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-yellow-50/10 blur-3xl" />
      <div className="hidden lg:block md:block ">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-200 leading-6 mx-auto relative py-20">
          <div className="border-b hairline w-[100%] flex flex-col lg:flex-row pb-8">
            {/* Section 1 */}
            <div className=" lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:hairline pl-3 lg:pr-5 gap-3">
              <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
                {/* <img src={Logo} alt="" className="object-contain" /> */}
                <h1 className="text-yellow-50 text-[11px] tracking-[0.24em] uppercase font-medium mb-1">
                  Company
                </h1>
                <div className="flex flex-col gap-2">
                  {["About", "Careers", "Affiliates"].map((ele, i) => {
                    return (
                      <div
                        key={i}
                        className="text-[14px] cursor-pointer hover:text-yellow-25 hover:translate-x-1 transition-all duration-300"
                      >
                        <Link to={ele.toLowerCase()}>{ele}</Link>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-4 text-lg text-richblack-100 [&>svg]:cursor-pointer [&>svg]:transition-colors [&>svg:hover]:text-yellow-50">
                  <FaFacebook />
                  <FaGoogle />
                  <FaTwitter />
                  <FaYoutube />
                </div>
                <div></div>
              </div>

              <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                <h1 className="text-yellow-50 text-[11px] tracking-[0.24em] uppercase font-medium mb-1">
                  Resources
                </h1>

                <div className="flex flex-col gap-2 mt-2">
                  {Resources.map((ele, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-yellow-25 hover:translate-x-1 transition-all duration-300"
                      >
                        <Link to={ele.split(" ").join("-").toLowerCase()}>
                          {ele}
                        </Link>
                      </div>
                    );
                  })}
                </div>

                <h1 className="text-yellow-50 text-[11px] tracking-[0.24em] uppercase font-medium mb-1 mt-7">
                  Support
                </h1>
                <div className="text-[14px] cursor-pointer hover:text-yellow-25 hover:translate-x-1 transition-all duration-300 mt-2">
                  <Link to={"/help-center"}>Help Center</Link>
                </div>
              </div>

              <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                <h1 className="text-yellow-50 text-[11px] tracking-[0.24em] uppercase font-medium mb-1">
                  Plans
                </h1>

                <div className="flex flex-col gap-2 mt-2">
                  {Plans.map((ele, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-yellow-25 hover:translate-x-1 transition-all duration-300"
                      >
                        <Link to={ele.split(" ").join("-").toLowerCase()}>
                          {ele}
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <h1 className="text-yellow-50 text-[11px] tracking-[0.24em] uppercase font-medium mb-1 mt-7">
                  Community
                </h1>

                <div className="flex flex-col gap-2 mt-2">
                  {Community.map((ele, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-yellow-25 hover:translate-x-1 transition-all duration-300"
                      >
                        <Link to={ele.split(" ").join("-").toLowerCase()}>
                          {ele}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
              {FooterLink2.map((ele, i) => {
                return (
                  <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                    <h1 className="text-yellow-50 text-[11px] tracking-[0.24em] uppercase font-medium mb-1">
                      {ele.title}
                    </h1>
                    <div className="flex flex-col gap-2 mt-2">
                      {ele.links.map((link, index) => {
                        return (
                          <div
                            key={index}
                            className="text-[14px] cursor-pointer hover:text-yellow-25 hover:translate-x-1 transition-all duration-300"
                          >
                            <Link to={link.link}>{link.title}</Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-300 mx-auto pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r hairline cursor-pointer hover:text-yellow-25 hover:translate-x-1 transition-all duration-300"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            Crafted by Shubham · © 2026 <span className="font-display italic text-yellow-50">EdeTechy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

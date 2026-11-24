import React, { useState, useEffect } from 'react'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
// import Logo from '../../assets/Logo/Logo-Full-Light.png'; 
import Logo from '../../assets/Logo/Ede-removebg-preview.png';
// import Logo from '../../assets/Logo/Ede-Techy.png'; 
import { GiMedusaHead } from "react-icons/gi";

import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropdown from '../core/Auth/ProfileDropdown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [subLinks, setSubLinks] = useState([]);
    const [menu, setMenu] = useState(false);
    const [catalogItems, setCatalogItems] = useState(false);

    const fetchSubLinks = async () => {

        try {

            const result = await apiConnector('GET', categories.CATEGORIES_API);
            setSubLinks(result?.data?.allCategories);

        } catch (err) {

            console.log("Error in getting categories sublinks : ", err.message);
        }
    }

    useEffect(() => {

        fetchSubLinks();
    }, [])

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    const toggleMenu = () => {
        setMenu(!menu);
    }

    const toggleCatalog = () => {
        setCatalogItems(!catalogItems);
    }

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={`sticky top-0 z-50 flex h-[72px] items-center border-b transition-all duration-500 ${scrolled ? 'bg-richblack-900/75 backdrop-blur-xl border-yellow-50/15' : 'bg-transparent border-transparent'}`} >
            <div className="flex w-11/12 items-center mx-auto justify-between max-w-maxContent" >
                {/* Logo */}
                <NavLink to="/">
                    {/* <img className="text-white bg-richblack-100 rounded-full border border-yellow-50" src={Logo} width={105} height={40} loading='lazy' alt="" /> */}
                    <div className="flex flex-row items-center gap-2">
                        <GiMedusaHead className="text-yellow-50 text-3xl md:text-4xl" />
                        <p className="font-display text-2xl md:text-[1.75rem] font-semibold tracking-wide text-richblack-5">Ede<span className="gold-text italic">Techy</span></p>
                    </div>
                </NavLink>

                {/* Nav */}
                <nav className="hidden md:block">
                    <ul className="flex gap-9 text-[13px] font-medium tracking-[0.12em] uppercase text-richblack-25">
                        {NavbarLinks.map((value, index) => (
                            <li key={index}>
                                {value.title === 'Catalog' ? (

                                    <div className="flex flex-row items-center gap-1 group relative" >
                                        <p className="nav-link cursor-pointer">Catalog</p>
                                        <span className="text-yellow-50"><IoIosArrowDropdownCircle /></span>

                                        {/* pt-4 bridges the gap so the menu doesn't close while the cursor travels to it */}
                                        <div className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                            <div className="relative w-[270px] rounded-2xl border border-yellow-50/20 bg-richblack-800/95 p-2 text-richblack-25 normal-case tracking-normal shadow-2xl shadow-black/60 backdrop-blur-xl">
                                                <div className="absolute -top-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-sm border-l border-t border-yellow-50/20 bg-richblack-800" />
                                                {
                                                    subLinks?.length > 0 ? (
                                                        subLinks.map((value, index) => (
                                                            <NavLink className="flex items-center justify-between rounded-xl px-3 py-3 text-sm transition-colors hover:bg-yellow-50/10 hover:text-yellow-25" to={`/catalog/${encodeURIComponent(value.name)}`} key={index} >
                                                                {value.name}
                                                                <span className="text-yellow-50/0 transition-colors group-hover:text-yellow-50/60">→</span>
                                                            </NavLink>
                                                        ))
                                                    ) : (
                                                        <div className="px-4 py-6 text-center">
                                                            <p className="font-display text-xl text-richblack-5">No categories yet</p>
                                                            <p className="mt-1 text-xs text-richblack-200">New course categories will appear here soon.</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                                    : (
                                        <NavLink to={value?.path}>
                                            <p className={`nav-link ${matchRoute(value?.path) ? 'active text-yellow-25' : 'text-richblack-25'}`} > {value.title}</p>
                                        </NavLink>
                                    )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* login/Signup/Dashboard  */}
                <div className="flex gap-4 items-center text-richblack-25">
                    {
                        user && user.accountType != "Instructor" && (

                            <NavLink to="dashboard/cart" className="hidden md:block relative">
                                <CiShoppingCart className="text-richblack-25 text-2xl" />
                                {
                                    totalItems > 0 &&
                                    (
                                        <span
                                            className="absolute -bottom-2 -right-2 h-5 w-5 flex justify-center items-center text-sm rounded-full text-yellow-50  bg-yellow-50 !text-black font-semibold"
                                        >{totalItems}</span>
                                    )
                                }
                            </NavLink>
                        )
                    }
                    {

                        token === null &&
                        (
                            <NavLink className="hidden md:block" to="/login" >
                                <button className="btn-ghost text-[13px] font-medium px-5 py-2 rounded-full">
                                    Login
                                </button>
                            </NavLink>

                        )
                    }
                    {

                        token === null &&
                        (
                            <NavLink className="hidden md:block" to="/signup" >
                                <button className="btn-gold text-[13px] font-semibold px-5 py-2 rounded-full">
                                    Sign up
                                </button>
                            </NavLink>
                        )
                    }
                    {
                        token !== null &&
                        (
                            <ProfileDropdown />
                        )

                    }
                    <button onClick={toggleMenu} className="md:hidden pr-2">
                        <GiHamburgerMenu className=" text-2xl" />
                    </button>

                </div>
            </div>
            {/* Mobile Menu */}
            {
                menu && (
                    <div className="h-screen w-full absolute top-0 left-0 bg-richblack-900/98 backdrop-blur-xl z-50">
                        <div className="text-richblack-200 text-xl flex justify-end p-4 cursor-pointer" >
                            <button onClick={toggleMenu}>
                                X
                            </button>
                        </div>
                        <div className="flex flex-col gap-4 py-10 items-center justify-center h-full">
                            <ul className="flex flex-col gap-10 h-full font-display text-3xl text-richblack-5 text-center">
                                {NavbarLinks.map((value, index) => (

                                    <li key={index}>
                                        {
                                            value.title === 'Catalog' ? (
                                                <>
                                                    <div onClick={toggleCatalog} className="flex flex-row cursor-pointer items-center gap-1 group relative" >
                                                        <p>Catalog</p>
                                                        <span><IoIosArrowDropdownCircle className="text-richblack-100" /></span>
                                                    </div>
                                                    {/* { */}
                                                    {/* catalogItems && ( */}
                                                    <div
                                                        className={`${catalogItems ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
                                                            } transition-all duration-500 ease-in-out overflow-hidden flex flex-col items-center text-base gap-4 mt-3`}
                                                    >
                                                        {
                                                            subLinks.length > 0 && (
                                                                subLinks.map((value, index) => (
                                                                    <NavLink
                                                                        onClick={toggleMenu}
                                                                        key={index}
                                                                        to={`/catalog/${encodeURIComponent(value.name)}`}
                                                                        className="hover:text-richblack-300 duration-300"
                                                                    >
                                                                        {value.name}
                                                                    </NavLink>
                                                                ))
                                                            )
                                                        }
                                                    </div>
                                                    {/* ) */}
                                                    {/* } */}

                                                </>
                                            ) :
                                                (
                                                    <NavLink onClick={toggleMenu} to={value?.path} className="hover:text-richblack-100 duration-300">
                                                        <p className="" > {value.title}</p>
                                                    </NavLink>
                                                )
                                        }

                                    </li>
                                ))}
                                {
                                    token === null &&
                                    (
                                        <li>
                                            <NavLink onClick={toggleMenu} className="" to="/login" >
                                                <button className="btn-ghost font-sans text-base px-6 py-2 rounded-full">
                                                    Login
                                                </button>
                                            </NavLink>
                                        </li>
                                    )
                                }
                                {
                                    token === null &&
                                    (
                                        <NavLink onClick={toggleMenu} className="" to="/signup" >
                                            <button className="btn-gold font-sans text-base font-semibold px-6 py-2 rounded-full">
                                                Signup
                                            </button>
                                        </NavLink>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Navbar
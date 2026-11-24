import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from "react-hot-toast"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { signUp } from "../../../services/operations/authAPI"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"
import { Link } from "react-router-dom"
import { labelCls, fieldCls } from "./authStyles"

function SignupForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

      // student or instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    // data to pass to Tab component
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ];

    const [formData, setFormData] = useState({

        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { firstName, lastName, email, password, confirmPassword } = formData;

    //handle on change

    const handleOnChange = (e) => { 

        setFormData((previousData) => (

            {
                ...previousData,
                [e.target.name] : e.target.value,

            }
        ))
    }

    //form submit
    const handleSubmit = (data) => { 

        data.preventDefault();
        
        if (password !== confirmPassword) { 

            toast.error('Password and confirm password not matched !');
            return;
        }

        // console.log(formData);

        dispatch(signUp(firstName, lastName, email, password, confirmPassword, accountType, null, navigate));
    }

    const eye = (shown, toggle) => (
        <button type="button" onClick={toggle} aria-label="Toggle password visibility"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-richblack-200 transition-colors hover:text-yellow-50">
            {shown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
    );

    return (
        <div>
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-5">
                <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="w-full">
                        <label htmlFor="firstName" className={labelCls}>First Name <sup className="text-pink-200">*</sup></label>
                        <input id="firstName" required type="text" name="firstName" placeholder="Enter first name"
                            value={firstName} onChange={handleOnChange} className={fieldCls} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="lastName" className={labelCls}>Last Name <sup className="text-pink-200">*</sup></label>
                        <input id="lastName" required type="text" name="lastName" placeholder="Enter last name"
                            value={lastName} onChange={handleOnChange} className={fieldCls} />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className={labelCls}>Email Address <sup className="text-pink-200">*</sup></label>
                    <input id="email" required type="text" name="email" placeholder="Enter email address"
                        value={email} onChange={handleOnChange} className={fieldCls} />
                </div>

                <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="w-full">
                        <label htmlFor="password" className={labelCls}>Create Password <sup className="text-pink-200">*</sup></label>
                        <div className="relative">
                            <input id="password" required type={showPassword ? "text" : "password"} name="password" placeholder="Enter password"
                                value={password} onChange={handleOnChange} className={`${fieldCls} pr-12`} />
                            {eye(showPassword, () => setShowPassword((p) => !p))}
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="confirmPassword" className={labelCls}>Confirm Password <sup className="text-pink-200">*</sup></label>
                        <div className="relative">
                            <input id="confirmPassword" required type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm password"
                                value={confirmPassword} onChange={handleOnChange} className={`${fieldCls} pr-12`} />
                            {eye(showConfirm, () => setShowConfirm((p) => !p))}
                        </div>
                    </div>
                </div>

                <button type="submit" disabled={loading} className="btn-gold mt-1 w-full rounded-full py-3.5 font-semibold tracking-wide disabled:opacity-60">
                    {loading ? "Creating account..." : "Create Account"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-richblack-200">
                Already have an account? <Link to="/login" className="font-medium text-yellow-50 hover:text-yellow-25">Sign in</Link>
            </p>
        </div>
    )
}

export default SignupForm

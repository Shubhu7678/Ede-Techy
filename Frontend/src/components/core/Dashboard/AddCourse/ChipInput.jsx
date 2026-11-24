import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { useSelector } from 'react-redux';

// `preset` ({ version, items }) lets the parent replace the chips (used by templates).
// `suggestions` are one-click chips shown under the input.
const ChipInput = ({ label, name, placeholder, register, errors, setValue, suggestions = [], preset }) => {

    const [chips, setChips] = useState([]);
    const { course, editCourse } = useSelector((state) => state.course);

    const deleteChip = (chipIndex) => setChips(chips.filter((_, index) => index !== chipIndex));
    const addChip = (value) => {
        const v = value.trim();
        if (v && !chips.includes(v)) setChips([...chips, v]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addChip(e.target.value);
            e.target.value = '';
        }
    }

    useEffect(() => { register(name, { required: true }); }, [register, name])
    useEffect(() => { setValue(name, chips, { shouldValidate: chips.length > 0 }); }, [chips, name, setValue]);
    useEffect(() => { if (editCourse) setChips(course?.tag || []); }, [])
    useEffect(() => { if (preset?.version) setChips(preset.items); }, [preset?.version])

    const remaining = suggestions.filter((s) => !chips.includes(s));

    return (
        <div className="w-full">
            <label htmlFor={name} className="mb-2 block text-[13px] font-medium tracking-wide text-richblack-25">
                {label} <sup className="text-pink-200">*</sup>
            </label>
            {chips.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                    {chips.map((chip, index) => (
                        <span key={index} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] py-1 pl-3.5 pr-2 text-sm text-richblack-5">
                            {chip}
                            <button type="button" onClick={() => deleteChip(index)} aria-label={`Remove ${chip}`}
                                className="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-white/15">
                                <MdClose className="text-sm" />
                            </button>
                        </span>
                    ))}
                </div>
            )}
            <input type="text" id={name} placeholder={placeholder}
                className="w-full px-4 py-3.5 text-[15px]" onKeyDown={handleKeyDown} />
            <p className="mt-1.5 text-xs text-richblack-300">Press Enter or comma to add a tag</p>
            {remaining.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-richblack-300">Suggestions:</span>
                    {remaining.map((s) => (
                        <button type="button" key={s} onClick={() => addChip(s)}
                            className="flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-xs text-richblack-100 transition-colors hover:border-white/40 hover:text-richblack-5">
                            <LuPlus /> {s}
                        </button>
                    ))}
                </div>
            )}
            {errors[name] && <span className="mt-2 block text-xs text-pink-200">Add at least one tag</span>}
        </div>
    )
}

export default ChipInput

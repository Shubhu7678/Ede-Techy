import React, { useEffect, useState } from 'react'
import { LuPlus, LuX } from "react-icons/lu";
import { useSelector } from 'react-redux';

// `preset` ({ version, items }) lets the parent replace the list (used by templates).
// `suggestions` are one-click chips under the input.
const RequirementField = ({ label, name, errors, register, setValue, suggestions = [], preset }) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const { course, editCourse } = useSelector((state) => state.course);

    const add = (value) => {
        const v = value.trim();
        if (v && !requirementList.includes(v)) setRequirementList([...requirementList, v]);
    }

    const handleAddRequirement = () => { add(requirement); setRequirement(""); }
    const handleRemoveRequirement = (index) => setRequirementList(requirementList.filter((_, i) => i !== index));

    useEffect(() => {
        register(name, { required: true });
        if (editCourse) setRequirementList(course?.instructions || []);
    }, [])

    useEffect(() => { setValue(name, requirementList, { shouldValidate: requirementList.length > 0 }); }, [requirementList])
    useEffect(() => { if (preset?.version) setRequirementList(preset.items); }, [preset?.version])

    const remaining = suggestions.filter((s) => !requirementList.includes(s));

    return (
        <div>
            <label htmlFor={name} className="mb-2 block text-[13px] font-medium tracking-wide text-richblack-25">
                {label} <sup className="text-pink-200">*</sup>
            </label>
            <div className="flex gap-3">
                <input type="text" id={name} value={requirement} placeholder="e.g. A laptop with internet access"
                    onChange={(e) => setRequirement(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddRequirement(); } }}
                    className="min-w-0 flex-1 px-4 py-3.5 text-[15px]" />
                <button type="button" onClick={handleAddRequirement}
                    className="btn-ghost flex shrink-0 items-center gap-2 rounded-full px-5 text-sm font-medium">
                    <LuPlus /> Add
                </button>
            </div>
            {remaining.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-richblack-300">Suggestions:</span>
                    {remaining.map((s) => (
                        <button type="button" key={s} onClick={() => add(s)}
                            className="flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-xs text-richblack-100 transition-colors hover:border-white/40 hover:text-richblack-5">
                            <LuPlus /> {s}
                        </button>
                    ))}
                </div>
            )}
            {errors[name] && <span className="mt-2 block text-xs text-pink-200">Add at least one requirement</span>}
            {requirementList.length > 0 && (
                <ul className="mt-3 flex flex-col gap-2">
                    {requirementList.map((data, index) => (
                        <li key={index} className="flex items-center justify-between gap-3 rounded-xl border hairline bg-white/[0.02] px-4 py-2.5 text-sm text-richblack-25">
                            <span className="flex items-center gap-3"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-richblack-300" />{data}</span>
                            <button type="button" onClick={() => handleRemoveRequirement(index)} aria-label="Remove requirement"
                                className="text-richblack-300 transition-colors hover:text-pink-100"><LuX /></button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default RequirementField

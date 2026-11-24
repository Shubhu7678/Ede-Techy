import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LuUploadCloud, LuX } from 'react-icons/lu';

// Thumbnail picker: click or drag & drop an image.
const Upload = ({ label, name, register, errors, setValue }) => {
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [dragging, setDragging] = useState(false);
    const { editCourse, course } = useSelector((state) => state.course);

    const takeFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setImage(reader.result);
        setValue(name, file, { shouldValidate: true });
    };

    const clear = () => {
        setImage(null);
        setValue(name, null);
        if (inputRef.current) inputRef.current.value = '';
    };

    useEffect(() => { register(name, { required: true }); }, [register, name]);
    useEffect(() => { if (editCourse) setImage(course?.thumbnail); }, []);

    return (
        <div>
            <label htmlFor={name} className="mb-2 block text-[13px] font-medium tracking-wide text-richblack-25">
                {label} <sup className="text-pink-200">*</sup>
            </label>

            {image ? (
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                    <img className="aspect-video w-full object-cover" src={image} alt="Course thumbnail preview" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button type="button" onClick={clear}
                        className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-richblack-900/80 px-3.5 py-1.5 text-xs font-medium text-richblack-5 backdrop-blur transition-colors hover:text-pink-100">
                        <LuX /> Remove
                    </button>
                </div>
            ) : (
                <div
                    role="button" tabIndex={0}
                    onClick={() => inputRef.current?.click()}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); takeFile(e.dataTransfer.files?.[0]); }}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors
                    ${dragging ? "border-richblack-5 bg-white/[0.06]" : "border-white/15 bg-white/[0.02] hover:border-white/40"}`}
                >
                    <input type="file" className="hidden" ref={inputRef} id={name} accept="image/png,image/jpeg,image/jpg"
                        onChange={(e) => takeFile(e.target.files[0])} tabIndex={-1} />
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-2xl text-richblack-5">
                        <LuUploadCloud />
                    </span>
                    <p className="mt-4 text-[15px] text-richblack-100">
                        Drag and drop an image, or <span className="font-semibold text-richblack-5 underline underline-offset-4">browse</span>
                    </p>
                    <p className="mt-1 text-xs text-richblack-300">16:9 · recommended 1024×576 · PNG or JPG</p>
                </div>
            )}
            {errors[name] && <span className="mt-1.5 block text-xs text-pink-200">A course thumbnail is required</span>}
        </div>
    );
};

export default Upload;

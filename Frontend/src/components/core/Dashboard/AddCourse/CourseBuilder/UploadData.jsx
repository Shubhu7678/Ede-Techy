import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player'
import { LuUploadCloud } from 'react-icons/lu';

const UploadData = ({ label, name, register, errors, setValue, video = false, viewData=false, editData=false, presetFile }) => {
    const handleRef = useRef(null);
    const [image, setImage] = useState(video ? (viewData ? viewData : editData ? editData : null) : null);
    const { editCourse, course } = useSelector((state) => state.course);
    const [selectedFile, setSelectedFile] = useState(null);
    

    const handleAddImage = () => {
        if (handleRef.current) {

            handleRef.current.click();
        }
    };

    const handleOnChange = (e) => {
        const file = e.target.files[0];

        if (file) {

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {

                setImage(reader.result);
            }
            setValue(name, file);
            setSelectedFile(file);
        }
    };

    useEffect(() => {
        // Register the input manually with react-hook-form

        register(name, { required: true });

    }, []);

    // a file handed in by the parent (e.g. the generated sample video)
    useEffect(() => {
        if (!presetFile?.file) return;
        const url = URL.createObjectURL(presetFile.file);
        setImage(url);
        setSelectedFile(presetFile.file);
        return () => URL.revokeObjectURL(url);
    }, [presetFile?.version])

    useEffect(() => {

        setValue(name, selectedFile);

    }, [selectedFile,setValue])

    return (
        <div>
            <label htmlFor={name} className="mb-2 block text-[13px] font-medium tracking-wide text-richblack-25">
                {label} <sup className="text-pink-200">*</sup>
            </label>
            {image ? (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                    {!video
                        ? <img className="aspect-video w-full object-cover" src={image} alt="" />
                        : <div className="aspect-video"><ReactPlayer url={image} width="100%" height="100%" controls={true} /></div>}
                    {!viewData && (
                        <div className="flex justify-end border-t hairline bg-richblack-800 p-2.5">
                            <button type="button" onClick={() => { setImage(null); setSelectedFile(null); }}
                                className="rounded-full px-4 py-1.5 text-xs font-medium text-richblack-100 transition-colors hover:text-pink-100">
                                Remove video
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div role="button" tabIndex={0} onClick={handleAddImage}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleAddImage()}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] px-6 py-10 text-center transition-colors hover:border-white/40">
                    <input type="file" className="hidden" ref={handleRef} id={name} name={name}
                        accept={video ? "video/*" : "image/png,image/jpeg,image/jpg"} onChange={handleOnChange} tabIndex={-1} />
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-2xl text-richblack-5">
                        <LuUploadCloud />
                    </span>
                    <p className="mt-4 text-[15px] text-richblack-100">
                        Click to <span className="font-semibold text-richblack-5 underline underline-offset-4">browse</span> {video ? "a video" : "an image"}
                    </p>
                    <p className="mt-1 text-xs text-richblack-300">{video ? "MP4 or WebM recommended" : "16:9 · 1024×576"}</p>
                </div>
            )}
            {errors[name] && <span className="mt-1.5 block text-xs text-pink-200">{video ? "A video is required" : "An image is required"}</span>}
        </div>
    );
};

export default UploadData;

import React, { useRef, useState } from 'react'
import { LuUpload, LuImage, LuX } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPictureData } from '../../../../services/operations/settingAPI';

// Photo row at the top of the Profile tab (no card of its own; the tab provides it).
const ChangeProfilePicture = () => {

    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const fileInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
    const [dragging, setDragging] = useState(false);
    const dispatch = useDispatch();

    const takeFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        setImageFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (ev) => setPreviewSource(ev.target.result);
    }

    const cancel = () => {
        setImageFile(null); setPreviewSource(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }

    const handleFileUpload = async () => {
        if (!imageFile) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('displayPicture', imageFile);
        try {
            await dispatch(updateDisplayPictureData(formData, token));
            cancel();
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();
    const shown = previewSource || user?.image;

    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); takeFile(e.dataTransfer.files?.[0]); }}
            className={`flex flex-col items-start gap-6 rounded-2xl p-1 transition-colors sm:flex-row sm:items-center ${dragging ? "bg-white/[0.05] ring-1 ring-richblack-5" : ""}`}
        >
            {shown
                ? <img src={shown} alt="" className="aspect-square w-24 shrink-0 rounded-full object-cover ring-4 ring-white/10" />
                : <span className="flex aspect-square w-24 shrink-0 items-center justify-center rounded-full bg-richblack-600 font-display text-4xl font-semibold text-richblack-5 ring-4 ring-white/10">{initials}</span>}

            <div className="min-w-0 flex-1">
                <p className="font-display text-2xl font-semibold text-richblack-5">{user?.firstName} {user?.lastName}</p>
                <p className="mt-1 truncate text-sm text-richblack-200">
                    {imageFile ? <>New photo: <span className="text-richblack-5">{imageFile.name}</span></> : "JPG, PNG or GIF. Drag an image here or choose a file."}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                    <input type="file" className="hidden" ref={fileInputRef} accept="image/png,image/jpeg,image/gif" onChange={(e) => takeFile(e.target.files[0])} />
                    {!imageFile ? (
                        <button type="button" onClick={() => fileInputRef.current.click()} className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium">
                            <LuImage /> Change photo
                        </button>
                    ) : (
                        <>
                            <button type="button" onClick={handleFileUpload} disabled={loading} className="btn-gold flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold disabled:opacity-60">
                                <LuUpload /> {loading ? "Uploading..." : "Save photo"}
                            </button>
                            <button type="button" onClick={cancel} disabled={loading} className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium">
                                <LuX /> Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChangeProfilePicture

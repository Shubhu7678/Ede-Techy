import React, { useRef, useState } from 'react'
import { LuUpload, LuImage } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPictureData } from '../../../../services/operations/settingAPI';

const ChangeProfilePicture = () => {

    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const fileInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (ev) => setPreviewSource(ev.target.result);
    }

    const handleFileUpload = async () => {
        if (!imageFile) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('displayPicture', imageFile);
        try {
            await dispatch(updateDisplayPictureData(formData, token));
            setImageFile(null);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-richblack-800/80 p-6 sm:flex-row sm:items-center md:p-8">
            <div className="flex items-center gap-5">
                {(previewSource || user?.image)
                    ? <img src={previewSource || user?.image} alt="" className="aspect-square w-20 rounded-full object-cover ring-2 ring-yellow-50/60" />
                    : <span className="flex aspect-square w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-25 to-yellow-200 font-display text-3xl font-semibold text-richblack-900 ring-2 ring-yellow-50/60">{`${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase()}</span>}
                <div>
                    <p className="font-display text-2xl font-semibold">Profile picture</p>
                    <p className="mt-1 text-sm font-light text-richblack-200">PNG, JPG or GIF. Square images look best.</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <input type="file" className="hidden" ref={fileInputRef} accept="image/png,image/jpeg,image/gif" onChange={handleFileChange} />
                <button type="button" onClick={() => fileInputRef.current.click()} className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium">
                    <LuImage /> Select
                </button>
                <button type="button" onClick={handleFileUpload} disabled={!imageFile || loading}
                    className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50">
                    <LuUpload /> {loading ? "Uploading..." : "Upload"}
                </button>
            </div>
        </div>
    )
}

export default ChangeProfilePicture

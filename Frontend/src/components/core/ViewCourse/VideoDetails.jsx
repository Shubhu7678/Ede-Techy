import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { setCompletedLectures, updateCompletedLectures } from '../../../slices/viewCourseSlice';
import ReactPlayer from 'react-player'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsApi';

const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const playerRef = useRef();
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const isFirstVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex((section) => {
      return section._id === sectionId;
    })

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => {
      return subSection._id === subSectionId;
    })

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {

      return true;
    }
    else {

      return false;
    }

  }

  const isLastVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex((section) => {
      return section._id === sectionId;
    })

    const subSectionTotalCount = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => {
      return subSection._id === subSectionId;
    })

    if (currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === subSectionTotalCount - 1) {
      return true;
    }
    else {
      return false;
    }
  }

  const goToNextVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex((section) => {
      return section._id === sectionId;
    })

    const subSectionTotalCount = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => {
      return subSection._id === subSectionId;
    })

    if (currentSubSectionIndex !== subSectionTotalCount - 1) {
      // same section next video 
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${nextSubSectionId}`);
    }
    else {

      //  different section first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const differentSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/subSection/${differentSubSectionId}`);
    }
  }

  const goToPrevVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex((section) => {
      return section._id === sectionId;
    })

    const subSectionTotalCount = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => {
      return subSection?._id === subSectionId;
    })

    if (currentSubSectionIndex === 0) {

      const prevSection = courseSectionData[currentSectionIndex - 1]?._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1]?.subSection.length;
      const lastPrevSubSection = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]?._id;
      navigate(`/view-course/${courseId}/section/${prevSection}/subSection/${lastPrevSubSection}`);
    }
    else {

      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${prevSubSectionId}`);
    }

  }

  const handleLectureCompletion = async () => {

    setLoading(true);
    const result = await markLectureAsComplete(courseId, subSectionId, token);
    if (result) {
      dispatch(setCompletedLectures(result));
    }
    setLoading(false);
  }

  useEffect(() => {

    const setVideoSpecificDetails = async () => {

      if (!courseSectionData.length) {

        return;
      }
      if (!courseId || !sectionId || !subSectionId) {
        navigate('/dashboard/enrolled-courses');
      }
      else {

        const filterSection = courseSectionData.filter((section) => {
          return section._id === sectionId;
        })

        const filterSubSection = filterSection[0]?.subSection.filter((subSection) => {

          return subSection._id === subSectionId;
        })

        setVideoData(filterSubSection?.[0]);
        setVideoEnded(false);

      }
    }

    setVideoSpecificDetails();
  }, [courseEntireData, courseSectionData, location.pathname])

  const btnPrimary = "btn-gold rounded-full px-6 py-2.5 text-sm font-semibold disabled:opacity-60";
  const btnGhost = "btn-ghost rounded-full px-6 py-2.5 text-sm font-medium disabled:opacity-60";
  const completed = completedLectures?.completedVideos?.includes(subSectionId);

  return (
    <div className="mx-auto w-11/12 max-w-5xl py-8 text-richblack-5">
      {
        !videoData ? (
          <div className="rounded-3xl border border-dashed border-white/15 px-6 py-20 text-center text-richblack-200">
            There is no video available
          </div>
        ) : (
          <div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
              <div className="aspect-video">
                <ReactPlayer
                  ref={playerRef}
                  width='100%'
                  height='100%'
                  playsinline
                  onEnded={() => setVideoEnded(true)}
                  url={videoData.videoUrl}
                  controls={true}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="section-title text-4xl">{videoData.title}</h1>
                {completed && <span className="mt-2 inline-block rounded-full border border-white/20 px-3 py-0.5 text-xs text-richblack-100">Completed</span>}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {!isFirstVideo() && <button disabled={loading} onClick={goToPrevVideo} className={btnGhost}>Previous</button>}
                {!completed && (
                  <button disabled={loading} onClick={handleLectureCompletion} className={videoEnded ? btnPrimary : btnGhost}>
                    {!loading ? "Mark as completed" : "Saving..."}
                  </button>
                )}
                {!isLastVideo() && <button disabled={loading} onClick={goToNextVideo} className={completed || videoEnded ? btnPrimary : btnGhost}>Next lecture</button>}
              </div>
            </div>

            {videoEnded && (
              <button disabled={loading} className="mt-3 text-sm text-richblack-200 underline-offset-4 transition-colors hover:text-richblack-5 hover:underline"
                onClick={() => { if (playerRef?.current) { playerRef.current.seekTo(0); setVideoEnded(false); } }}>
                Watch again
              </button>
            )}

            <div className="mt-6 rounded-3xl border border-white/10 bg-richblack-800/80 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-richblack-300">About this lecture</p>
              <p className="mt-3 font-light leading-relaxed text-richblack-100">{videoData.description}</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default VideoDetails
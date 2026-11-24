import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories, addCourseDetails, updateCourseData } from '../../../../services/operations/courseDetailsApi';
import { LuIndianRupee, LuArrowRight, LuSave, LuCheck, LuImage, LuX, LuLightbulb } from "react-icons/lu";
import { courseTemplates, tagSuggestions, requirementSuggestions } from "../../../../data/course-templates";
import ChipInput from './ChipInput';
import Upload from './Upload';
import RequirementField from './RequirementField';
import { setStep, setCourse } from '../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../utils/constants';
import { labelCls, fieldCls } from "../../Auth/authStyles";


// Helper components live at module level so React does not remount the fields (and wipe their state) on every render.
const Err = ({ e, msg }) => e ? <span className="mt-1.5 block text-xs text-pink-200">{msg}</span> : null;
const Hint = ({ children }) => <p className="mt-1.5 text-xs text-richblack-300">{children}</p>;
const Section = ({ n, title, hint, children }) => (
    <section className="rounded-3xl border border-white/10 bg-richblack-800/80 p-6 md:p-8">
        <div className="flex items-start gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-richblack-5">{n}</span>
            <div>
                <p className="font-display text-2xl font-semibold leading-none text-richblack-5">{title}</p>
                {hint && <p className="mt-2 text-sm font-light text-richblack-200">{hint}</p>}
            </div>
        </div>
        <div className="mt-6 flex flex-col gap-5">{children}</div>
    </section>
);

// "How students will see it" + completion checklist
const Preview = ({ values, categoryName, onSuggestionsHidden }) => {
    const { title, price, tags, image } = values;
    const [src, setSrc] = useState(null);
    useEffect(() => {
        if (image instanceof File) {
            const url = URL.createObjectURL(image);
            setSrc(url);
            return () => URL.revokeObjectURL(url);
        }
        setSrc(typeof image === 'string' ? image : null);
    }, [image]);

    const checks = [
        ["Title", !!title],
        ["Description", !!values.description],
        ["Price", typeof price === 'number' && !isNaN(price)],
        ["Category", !!values.category],
        ["Tags", !!tags?.length],
        ["Thumbnail", !!image],
        ["Benefits", !!values.benefits],
        ["Requirements", !!values.requirements?.length],
    ];
    const done = checks.filter((c) => c[1]).length;

    return (
        <div className="flex flex-col gap-5">
            <div className="rounded-3xl border border-white/10 bg-richblack-800/80 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-richblack-300">Preview</p>
                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-richblack-900">
                    {src
                        ? <img src={src} alt="" className="aspect-video w-full object-cover" />
                        : <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 bg-white/[0.03] text-richblack-300"><LuImage className="text-3xl" /><span className="text-xs">Thumbnail appears here</span></div>}
                    <div className="p-4">
                        {categoryName && <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-richblack-100">{categoryName}</span>}
                        <p className={`mt-2 font-display text-xl font-semibold leading-snug ${title ? "text-richblack-5" : "text-richblack-400"}`}>{title || "Your course title"}</p>
                        {tags?.length > 0 && <p className="mt-1 truncate text-xs text-richblack-300">{tags.slice(0, 3).join(" · ")}</p>}
                        <p className="mt-3 text-sm font-semibold text-richblack-5">{typeof price === 'number' && !isNaN(price) ? `₹ ${price}` : "₹ —"}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-richblack-800/80 p-5">
                <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.2em] text-richblack-300">Checklist</p>
                    <p className="text-xs text-richblack-100">{done} of {checks.length}</p>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-richblack-5 transition-all duration-500" style={{ width: `${(done / checks.length) * 100}%` }} />
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm">
                    {checks.map(([label, ok]) => (
                        <li key={label} className={`flex items-center gap-2 ${ok ? "text-richblack-5" : "text-richblack-300"}`}>
                            <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${ok ? "bg-richblack-5 text-richblack-900" : "border border-white/20"}`}>{ok && <LuCheck />}</span>
                            {label}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-richblack-800/80 p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-richblack-5"><LuLightbulb className="text-richblack-200" /> Good to know</p>
                <ul className="mt-3 flex flex-col gap-2 text-xs font-light leading-relaxed text-richblack-200">
                    <li>You can edit everything later, and a new course starts as a draft.</li>
                    <li>Next you'll add sections and lectures in the course builder.</li>
                    <li>Thumbnails look best at 1024×576 (16:9).</li>
                </ul>
            </div>
        </div>
    );
};

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const dispatch = useDispatch();
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(null);
    const [courseCategories, setCourseCategories] = useState(null);
    const { token } = useSelector((state) => state.auth);

    // console.log(course);

    const isFormUpdated = () => {

        const currentValues = getValues();
        if (currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        )
            return true;
        else
            return false;
    }

    // handle next button click 
    const onSubmit = async (data) => {

        if (editCourse) {

            if (isFormUpdated) {

                const currentValues = getValues();
                const formData = new FormData();

                formData.append('courseId', course._id);
                if (currentValues.courseTitle !== course.courseName) {

                    formData.append('courseName', data.courseTitle);
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {

                    formData.append('courseDescription', data.courseShortDesc);
                }
                if (currentValues.coursePrice !== course.price) {

                    formData.append('price', data.coursePrice);
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {

                    formData.append('tag', JSON.stringify(data.courseTags));
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {

                    formData.append('whatYouWillLearn', data.courseBenefits);
                }
                if (currentValues.courseCategory !== course.category._id) {

                    formData.append('category', data.courseCategory);
                }
                if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {

                    formData.append('instructions', JSON.stringify(data.courseRequirements));
                }
                if (currentValues.courseImage !== course.thumbnail) {

                    formData.append('thumbnail', data.courseImage);
                }

                setLoading(true);
                const result = await updateCourseData(formData, token);
                setLoading(false);

                if (result) {

                    dispatch(setCourse(result));
                    console.log(result);
                    dispatch(setStep(2));
                }

            }
            else {

                toast.error('No changes made to the form');
            }
            return;
        }

        //Create a new course

        const formData = new FormData();
        formData.append('courseName', data.courseTitle);
        formData.append('courseDescription', data.courseShortDesc);
        formData.append('price', data.coursePrice);
        formData.append('tag', JSON.stringify(data.courseTags));
        formData.append('whatYouWillLearn', data.courseBenefits);
        formData.append('category', data.courseCategory);
        formData.append('instructions', JSON.stringify(data.courseRequirements));
        formData.append('thumbnail', data.courseImage);
        formData.append('status', COURSE_STATUS.DRAFT);

        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if (result) {

            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);

    }

    useEffect(() => {

        const getCategoriesData = async () => {
            setLoading(true);
            try {

                const categories = await fetchCourseCategories();
                if (categories.length > 0) {

                    setCourseCategories(categories);
                }

            } catch (err) {

                console.log("Error :", err);
            }
            setLoading(false);
        }

        getCategoriesData();

    }, [])

    useEffect(() => {
        if (editCourse && !loading) {
            // Only set values if editing a course and categories are loaded
            setValue('courseTitle', course.courseName);
            setValue('courseShortDesc', course.courseDescription);
            setValue('coursePrice', course.price);
            setValue('courseTags', course.tag);
            setValue('courseBenefits', course.whatYouWillLearn);
            // const category = course?.category ? course.category : course.category._id;
            setValue('courseCategory', course.category); 
            // setValue('courseCategory', category);
            setValue('courseImage', course.thumbnail);
            setValue('courseRequirements', course.instructions);
        }
        
        //! Added useEffect on loading because when we set value 
        //! we need to wait for categories to be loaded
    }, [editCourse, loading]);




    // one-click starter content: fills every text field, tags and requirements
    const [preset, setPreset] = useState({ version: 0, tags: [], reqs: [] });
    const [usedTemplate, setUsedTemplate] = useState(null);
    const EX_KEY = 'edetechy-addcourse-examples-hidden';
    const [showExamples, setShowExamples] = useState(() => { try { return localStorage.getItem(EX_KEY) !== '1'; } catch (e) { return true; } });
    const setExamplesVisible = (v) => { setShowExamples(v); try { v ? localStorage.removeItem(EX_KEY) : localStorage.setItem(EX_KEY, '1'); } catch (e) { /* ignore */ } };

    const clearForm = () => {
        ['courseTitle', 'courseShortDesc', 'courseBenefits', 'courseCategory'].forEach((f) => setValue(f, ''));
        setValue('coursePrice', '');
        setPreset((p) => ({ version: p.version + 1, tags: [], reqs: [] }));
        setUsedTemplate(null);
    };

    const watched = {
        title: watch('courseTitle'), description: watch('courseShortDesc'), price: watch('coursePrice'),
        category: watch('courseCategory'), tags: watch('courseTags'), image: watch('courseImage'),
        benefits: watch('courseBenefits'), requirements: watch('courseRequirements'),
    };
    const categoryName = courseCategories?.find((c) => c._id === watched.category)?.name;

    const applyTemplate = (t) => {
        const opts = { shouldValidate: true, shouldDirty: true };
        setValue('courseTitle', t.title, opts);
        setValue('courseShortDesc', t.description, opts);
        setValue('coursePrice', t.price, opts);
        setValue('courseBenefits', t.benefits, opts);
        const match = courseCategories?.find((c) => c.name.toLowerCase() === t.category.toLowerCase());
        if (match) setValue('courseCategory', match._id, opts);
        setPreset((p) => ({ version: p.version + 1, tags: t.tags, reqs: t.requirements }));
        setUsedTemplate(t.label);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
            <div className="flex flex-col gap-6">
                {/* optional shortcut for new instructors */}
                {!editCourse && showExamples && (
                    <div className="rounded-3xl border border-dashed border-white/20 p-5 md:p-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-richblack-5">Not sure where to start?</p>
                                <p className="mt-1 text-sm font-light text-richblack-200">Pick an example to fill the form, then edit it. You'll still add your own thumbnail.</p>
                            </div>
                            <button type="button" onClick={() => setExamplesVisible(false)} aria-label="Hide examples" className="shrink-0 text-richblack-300 transition-colors hover:text-richblack-5"><LuX /></button>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {courseTemplates.map((t) => (
                                <button type="button" key={t.label} onClick={() => applyTemplate(t)}
                                    className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${usedTemplate === t.label
                                        ? "border-richblack-5 bg-richblack-5 font-medium text-richblack-900"
                                        : "border-white/15 text-richblack-100 hover:border-white/40 hover:text-richblack-5"}`}>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {!editCourse && !showExamples && (
                    <button type="button" onClick={() => setExamplesVisible(true)} className="w-fit text-sm text-richblack-200 underline-offset-4 transition-colors hover:text-richblack-5 hover:underline">
                        Need ideas? Use an example
                    </button>
                )}
                {usedTemplate && (
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-richblack-100">
                        <span>Filled in from the <span className="font-medium text-richblack-5">{usedTemplate}</span> example. Review it and make it yours.</span>
                        <button type="button" onClick={clearForm} className="shrink-0 text-richblack-200 underline-offset-4 transition-colors hover:text-richblack-5 hover:underline">Clear</button>
                    </div>
                )}

                <Section n={1} title="The basics" hint="What is your course called, and what is it about?">
                    <div>
                        <label htmlFor="courseTitle" className={labelCls}>Course title <sup className="text-pink-200">*</sup></label>
                        <input type="text" id="courseTitle" maxLength={80} placeholder="e.g. Modern JavaScript from scratch" className={fieldCls}
                            {...register('courseTitle', { required: true })} />
                        <Err e={errors.courseTitle} msg="Please give your course a title" />
                        {!errors.courseTitle && <Hint>Short and specific works best. Say what students will learn.</Hint>}
                    </div>
                    <div>
                        <label htmlFor="courseShortDesc" className={labelCls}>Short description <sup className="text-pink-200">*</sup></label>
                        <textarea id="courseShortDesc" rows={4} maxLength={400} placeholder="In two or three sentences, what will students get out of this course?" className={`${fieldCls} resize-y`}
                            {...register('courseShortDesc', { required: true })} />
                        <div className="flex justify-between">
                            <Err e={errors.courseShortDesc} msg="Please add a short description" />
                            <span className="ml-auto mt-1.5 text-xs text-richblack-300">{(watched.description || '').length}/400</span>
                        </div>
                    </div>
                </Section>

                <Section n={2} title="Price and category" hint="Help students find your course.">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="coursePrice" className={labelCls}>Price (₹) <sup className="text-pink-200">*</sup></label>
                            <div className="relative">
                                <LuIndianRupee className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-richblack-300" />
                                <input type="text" inputMode="numeric" id="coursePrice" placeholder="999" className={`${fieldCls} !pl-11`}
                                    {...register('coursePrice', {
                                        required: 'Enter a price',
                                        setValueAs: (v) => (v === '' || v == null ? '' : Number(v)),
                                        validate: (v) => (typeof v === 'number' && !isNaN(v) && v >= 0) || 'Enter a valid price',
                                    })} />
                            </div>
                            <Err e={errors.coursePrice} msg={errors.coursePrice?.message} />
                            {!errors.coursePrice && <Hint>Enter 0 to make it free.</Hint>}
                        </div>
                        <div>
                            <label htmlFor="courseCategory" className={labelCls}>Category <sup className="text-pink-200">*</sup></label>
                            <select id="courseCategory" defaultValue="" className={fieldCls} {...register('courseCategory', { required: true })}>
                                <option value="" disabled>Choose a category</option>
                                {courseCategories?.map((category, index) => (
                                    <option key={index} value={category?._id}>{category?.name}</option>
                                ))}
                            </select>
                            <Err e={errors.courseCategory} msg="Please choose a category" />
                            {courseCategories && courseCategories.length === 0 && (
                                <Hint>No categories exist yet. An admin needs to create one first.</Hint>
                            )}
                        </div>
                    </div>
                    <ChipInput label="Tags" name="courseTags" placeholder="Type a tag and press Enter" register={register} errors={errors} setValue={setValue} getValues={getValues} suggestions={tagSuggestions} preset={{ version: preset.version, items: preset.tags }} />
                </Section>

                <Section n={3} title="Thumbnail" hint="The first thing students see in the catalog.">
                    <Upload label="Course thumbnail" name="courseImage" register={register} errors={errors} setValue={setValue} />
                </Section>

                <Section n={4} title="What students will get">
                    <div>
                        <label htmlFor="courseBenefits" className={labelCls}>Benefits of the course <sup className="text-pink-200">*</sup></label>
                        <textarea id="courseBenefits" rows={4} placeholder="One benefit per line, e.g. Build a real website from scratch" className={`${fieldCls} resize-y`}
                            {...register('courseBenefits', { required: true })} />
                        <Err e={errors.courseBenefits} msg="Please describe what students will get" />
                    </div>
                    <RequirementField name="courseRequirements" label="Requirements" setValue={setValue} getValues={getValues} errors={errors} register={register} suggestions={requirementSuggestions} preset={{ version: preset.version, items: preset.reqs }} />
                </Section>

                <div className="flex flex-wrap items-center justify-end gap-3 pb-4">
                    <p className="mr-auto hidden text-sm text-richblack-300 sm:block">Next: add sections and lectures</p>
                    {editCourse && (
                        <button type="button" onClick={() => dispatch(setStep(2))} className="btn-ghost flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium">
                            Continue without saving <LuArrowRight />
                        </button>
                    )}
                    <button type="submit" disabled={loading} className="btn-gold flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold disabled:opacity-60">
                        {loading ? "Saving..." : !editCourse ? "Save & continue" : "Save changes"} {!loading && (!editCourse ? <LuArrowRight /> : <LuSave />)}
                    </button>
                </div>
            </div>

            <div className="xl:sticky xl:top-24">
                <Preview values={watched} categoryName={categoryName} />
            </div>
        </form>
    )
}

export default CourseInformationForm

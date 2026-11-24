import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponents';
import toast from 'react-hot-toast';
import CourseSlider from '../components/core/CatalogPage/CourseSlider';
import CourseCard from '../components/core/CatalogPage/CourseCard';
import Footer from '../components/common/Footer';

const Catalog = () => {

    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState('');
    const [active, setActive] = useState(0);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {

        const getAllCategoriesDetails = async () => {

            try {
                const result = await apiConnector('GET', categories.CATEGORIES_API);
                const match = result?.data?.allCategories?.find((category) => category.name === catalogName);
                setCategoryId(match?._id || '');
                setNotFound(!match);
            } catch (err) {
                console.log(err);
                setNotFound(true);
            }
        }

        getAllCategoriesDetails();

    }, [catalogName]);

    useEffect(() => {

        const getAllChoosedCategories = async () => {
            if (!categoryId) {

                return;
            }
            try {
                const result = await getCatalogPageData(categoryId);
                setCatalogPageData(result);

            } catch (err) {

                console.log(err);
            }
        }

        getAllChoosedCategories();

    }, [categoryId]);

    const category = catalogPageData?.selectedCategory;
    const Tab = ({ i, children }) => (
        <button onClick={() => setActive(i)}
            className={`relative px-1 pb-3 text-sm font-medium transition-colors ${active === i ? 'text-yellow-25' : 'text-richblack-200 hover:text-richblack-5'}`}>
            {children}
            <span className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-yellow-50 transition-opacity ${active === i ? 'opacity-100' : 'opacity-0'}`} />
        </button>
    );

    if (notFound) {
        return (
            <div className="grain flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-4 text-center text-richblack-5">
                <p className="eyebrow mb-4">Catalog</p>
                <h1 className="section-title text-5xl md:text-6xl">Category not found</h1>
                <p className="mt-4 max-w-md font-light text-richblack-100">We couldn't find "{catalogName}". It may not exist yet — try another category from the menu.</p>
            </div>
        );
    }

    return (
        <div className="grain text-richblack-5">

            {/* Hero */}
            <div className="relative -mt-[72px] overflow-hidden border-b hairline pt-[72px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(232,196,104,0.15),transparent_70%)]" />
                <div className="relative mx-auto w-11/12 max-w-maxContent py-20 md:py-28">
                    <p className="text-sm text-richblack-200">
                        Home / Catalog / <span className="text-yellow-50">{category?.name}</span>
                    </p>
                    <h1 className="section-title mt-4 text-5xl md:text-7xl">{category?.name}</h1>
                    <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-richblack-100">{category?.description}</p>
                </div>
            </div>

            <div className="my-16 w-full">
                <div className="mx-auto w-11/12 max-w-maxContent">
                    <h2 className="section-title text-4xl md:text-5xl">Courses to get you <span className="gold-text italic">started</span></h2>
                    <div className="mt-6 flex gap-6 border-b hairline">
                        <Tab i={0}>Most Popular</Tab>
                        <Tab i={1}>New</Tab>
                    </div>
                    <div className="mt-8">
                        <CourseSlider Courses={category?.courses} />
                    </div>
                </div>

                <div className="mx-auto mt-16 w-11/12 max-w-maxContent">
                    <h2 className="section-title text-4xl md:text-5xl">Top courses in <span className="gold-text italic">{category?.name}</span></h2>
                    <div className="mt-8">
                        <CourseSlider Courses={catalogPageData?.differentCategory?.courses} />
                    </div>
                </div>

                <div className="mx-auto mt-16 w-11/12 max-w-maxContent">
                    <h2 className="section-title text-4xl md:text-5xl">Frequently bought</h2>
                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {
                            catalogPageData?.mostSellingCourses?.map((course, index) => (
                                <CourseCard course={course} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Catalog

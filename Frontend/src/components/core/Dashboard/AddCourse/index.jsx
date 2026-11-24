import React from 'react';
import RenderSteps from './RenderSteps';
import PageHeader from '../PageHeader';

const index = () => {
    return (
        <div className="text-richblack-5">
            <PageHeader title="Add course" subtitle="Three quick steps: describe it, build it, publish it. You can change everything later." />
            <RenderSteps />
        </div>
    )
}

export default index

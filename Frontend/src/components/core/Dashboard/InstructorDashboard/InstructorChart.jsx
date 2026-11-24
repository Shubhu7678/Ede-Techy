import React, { useMemo, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

// gold-to-neutral palette so the chart matches the theme
const PALETTE = ['#E8C468', '#BC973F', '#F6DD94', '#7F6226', '#C7C3B8', '#615F5B', '#FFF3C9', '#503C15'];

const InstructorChart = ({ courses }) => {

    const [currentChart, setCurrentChart] = useState('students');
    const colors = useMemo(() => courses.map((_, i) => PALETTE[i % PALETTE.length]), [courses]);

    const data = (key) => ({
        labels: courses.map((course) => course.courseName),
        datasets: [{ data: courses.map((course) => course[key]), backgroundColor: colors, borderColor: '#161615', borderWidth: 3 }],
    });

    const options = {
        cutout: '68%',
        plugins: { legend: { position: 'bottom', labels: { color: '#C7C3B8', boxWidth: 10, usePointStyle: true, padding: 16 } } },
    };

    const Tab = ({ id, children }) => (
        <button onClick={() => setCurrentChart(id)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${currentChart === id ? 'bg-yellow-50 font-semibold text-richblack-900' : 'text-richblack-100 hover:text-yellow-25'}`}>
            {children}
        </button>
    );

    return (
        <div className="w-full rounded-3xl border border-white/10 bg-richblack-800/80 p-6">
            <div className="flex items-center justify-between">
                <p className="font-display text-2xl font-semibold">Visualize</p>
                <div className="flex rounded-full border border-white/10 bg-richblack-900/60 p-1">
                    <Tab id="students">Students</Tab>
                    <Tab id="income">Income</Tab>
                </div>
            </div>
            <div className="mx-auto mt-4 max-w-sm">
                <Doughnut data={currentChart === 'students' ? data('totalStudentsEnrolled') : data('totalAmountGenerated')} options={options} />
            </div>
        </div>
    )
}

export default InstructorChart

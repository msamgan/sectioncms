import React from 'react'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Chart({ labels, dataSet, title, dataLabel }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    }

    const data = {
        labels,
        datasets: [
            {
                label: dataLabel,
                data: dataSet,
                borderColor: 'RGB(102, 108, 255)',
                backgroundColor: 'RGB(102, 108, 255)',
            },
        ],
    }

    return <Line options={options} data={data} />
}

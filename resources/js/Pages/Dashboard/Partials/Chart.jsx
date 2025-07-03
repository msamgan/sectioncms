import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function Chart({ labels, dataSet, title, dataLabel }) {
    // Detect dark mode
    const isDarkMode = document.documentElement.classList.contains('dark');

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    boxWidth: 6,
                    font: {
                        size: 13,
                        family: "'Poppins', sans-serif",
                    },
                    color: isDarkMode ? '#e2e8f0' : '#1a202c',
                },
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 16,
                    weight: 'bold',
                    family: "'Poppins', sans-serif",
                },
                padding: {
                    top: 10,
                    bottom: 20,
                },
                color: isDarkMode ? '#e2e8f0' : '#1a202c',
            },
            tooltip: {
                backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                titleColor: isDarkMode ? '#e2e8f0' : '#1a202c',
                bodyColor: isDarkMode ? '#cbd5e1' : '#4a5568',
                borderColor: isDarkMode ? '#475569' : '#e2e8f0',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                titleFont: {
                    size: 14,
                    weight: 'bold',
                    family: "'Poppins', sans-serif",
                },
                bodyFont: {
                    size: 13,
                    family: "'Poppins', sans-serif",
                },
                callbacks: {
                    label: function (context) {
                        return `${dataLabel}: ${context.parsed.y}`
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    font: {
                        size: 12,
                        family: "'Poppins', sans-serif",
                    },
                    color: isDarkMode ? '#94a3b8' : '#718096',
                },
            },
            y: {
                grid: {
                    color: isDarkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(226, 232, 240, 0.5)',
                    drawBorder: false,
                },
                ticks: {
                    font: {
                        size: 12,
                        family: "'Poppins', sans-serif",
                    },
                    color: isDarkMode ? '#94a3b8' : '#718096',
                    padding: 10,
                },
                beginAtZero: true,
            },
        },
        elements: {
            line: {
                tension: 0.4, // Smoother curve
            },
            point: {
                radius: 4,
                hoverRadius: 6,
                borderWidth: 2,
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
            },
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'index',
            intersect: false,
        },
    }

    // Create gradient for background
    const createGradient = (ctx) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)') // blue-500 with opacity
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        return gradient
    }

    const data = {
        labels,
        datasets: [
            {
                label: dataLabel,
                data: dataSet,
                borderColor: '#3b82f6', // blue-500
                backgroundColor: function (context) {
                    const chart = context.chart
                    const { ctx, chartArea } = chart
                    if (!chartArea) {
                        return 'rgba(59, 130, 246, 0.2)' // Fallback
                    }
                    return createGradient(ctx)
                },
                borderWidth: 2,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: isDarkMode ? '#1e293b' : '#ffffff',
                fill: true,
            },
        ],
    }

    return (
        <div className="h-[400px] w-full">
            <Line options={options} data={data} />
        </div>
    )
}

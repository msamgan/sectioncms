import { useEffect, useState } from 'react'

export default function StatsCard({ label, count, icon }) {
    const [isVisible, setIsVisible] = useState(false)

    // Animation effect when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            className={`bg-white rounded-lg h-full border border-gray-100
                      transition-all duration-300 ease-in-out overflow-hidden
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <h6 className="font-medium text-gray-700 m-0">{label}</h6>
                    <div className="flex-shrink-0">
                        <i className={`${icon} text-primary text-xl`}></i>
                    </div>
                </div>
                <div className="flex items-center">
                    <h3 className="font-bold text-3xl text-gray-900 m-0">{count}</h3>
                </div>
            </div>
        </div>
    )
}

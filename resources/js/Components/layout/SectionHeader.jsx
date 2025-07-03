import React from 'react';

export default function SectionHeader({ icon, title, iconBgColor, iconTextColor, children }) {
    // Default colors if not provided
    const bgColor = iconBgColor || 'bg-blue-100 dark:bg-blue-900/20';
    const textColor = iconTextColor || 'text-primary dark:text-blue-400';

    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
                <div className={`${bgColor} p-2 rounded-lg mr-3 ${textColor}`}>
                    <i className={`${icon} text-xl`}></i>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
            </div>
            {children && (
                <div className="hidden sm:block">
                    {children}
                </div>
            )}
        </div>
    );
}

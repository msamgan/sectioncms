import React from 'react';

export default function StatsGrid({ children }) {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            {children}
        </div>
    );
}

export function StatsGridItem({ children }) {
    return (
        <div className="col-span-6 md:col-span-6 lg:col-span-3">
            {children}
        </div>
    );
}

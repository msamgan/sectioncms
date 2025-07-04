import React from 'react';
import Avatar from '@/Components/helpers/Avatar.jsx';

export default function FormCard({
    icon,
    title,
    module,
    className = "mb-6 w-2/3 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden transition-all duration-300",
    children
}) {
    return (
        <div className={className}>
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
                <div className="flex items-center">
                    <div className="bg-primary rounded-md p-1">
                        <Avatar
                            size="sm"
                            bgColor="transparent"
                            icon={icon}
                            className="text-white"
                        />
                    </div>
                    <h5 className="text-lg font-medium text-primary ml-3">{title}</h5>
                </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900">
                <div className="space-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

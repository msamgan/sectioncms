import React from 'react';

export default function WelcomeBanner({ user, className = "mb-8" }) {
    return (
        <div className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 overflow-hidden relative ${className}`}>
            {/* Decorative circles */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white opacity-5 rounded-full"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white opacity-5 rounded-full"></div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Welcome back, {user.name}!
                    </h1>
                    <p className="text-blue-100 flex flex-wrap items-center gap-2">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center">
                            <i className="ri-mail-line mr-2"></i>
                            {user.email}
                        </span>
                        {user.role && (
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm hidden sm:flex items-center">
                                <i className="ri-user-line mr-2"></i>
                                {user.role.display_name}
                            </span>
                        )}
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm flex items-center">
                        <i className="ri-time-line mr-2"></i>
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

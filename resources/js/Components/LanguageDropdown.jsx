import { useState, useEffect, useRef } from 'react';
import { languages as _languages } from '@actions/LanguageController.js';

export default function LanguageDropdown() {
    const [languages, setLanguages] = useState([]);
    const [filteredLanguages, setFilteredLanguages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState({ code: 'en', name: 'English' });
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const data = await _languages.data({});
                setLanguages(data);
                setFilteredLanguages(data);
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };

        fetchLanguages();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = languages.filter(lang =>
                lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lang.code.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredLanguages(filtered);
        } else {
            setFilteredLanguages(languages);
        }
    }, [searchTerm, languages]);

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setIsOpen(false);
        // Here you would typically handle the language change in your application
        // For example, by setting a cookie or updating the app state
    };

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-3 py-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
                <svg
                    className="h-4 w-4 mr-1.5 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                </svg>
                <span className="font-medium">{selectedLanguage.name}</span>
                <svg
                    className="h-4 w-4 ml-1.5 transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="absolute mt-2 w-64 rounded-lg bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 shadow-lg transform origin-top-left transition-all duration-200 ease-out animate-dropdown"
                    style={{
                        animationDuration: '0.2s'
                    }}
                >
                    <div className="p-3">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-4 w-4 text-gray-400 dark:text-gray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search language..."
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <ul className="max-h-60 overflow-y-auto py-2 px-1">
                        {filteredLanguages.length > 0 ? (
                            filteredLanguages.map((language) => (
                                <li key={language.code} className="px-1">
                                    <button
                                        onClick={() => handleLanguageSelect(language)}
                                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150 ${
                                            selectedLanguage.code === language.code
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold mr-2">
                                                {language.code.toUpperCase()}
                                            </span>
                                            <span className="font-medium">{language.name}</span>
                                        </div>
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-3 text-sm text-center text-gray-500 dark:text-gray-400">
                                No languages found
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

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
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
                <span className="mr-1">{selectedLanguage.name}</span>
                <svg
                    className="h-5 w-5"
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
                <div className="absolute mt-2 w-56 rounded-md bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Search language..."
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <ul className="max-h-60 overflow-y-auto py-1">
                        {filteredLanguages.length > 0 ? (
                            filteredLanguages.map((language) => (
                                <li key={language.code}>
                                    <button
                                        onClick={() => handleLanguageSelect(language)}
                                        className={`block w-full text-left px-4 py-2 text-sm ${
                                            selectedLanguage.code === language.code
                                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <span className="font-medium">{language.name}</span>
                                            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                                ({language.code})
                                            </span>
                                        </div>
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                No languages found
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

import { translatePublic } from '@actions/TranslationController.js'
import { useState } from 'react'

export default function TranslationSection() {
    const [content, setContent] = useState('')
    const [languageCode, setLanguageCode] = useState('')
    const [translationResult, setTranslationResult] = useState(null)
    const [isTranslating, setIsTranslating] = useState(false)
    const [error, setError] = useState(null)

    const handleTranslation = (e) => {
        e.preventDefault()

        if (!content || !languageCode) {
            setError('Please enter both content and a valid language ISO code.')
            setTimeout(() => {
                setError(null)
            }, 5000)
            return
        }

        // Validate language code (2 characters)
        if (languageCode.length !== 2 || !/^[a-z]{2}$/i.test(languageCode)) {
            setError('Invalid language ISO code. Please enter a 2-character code (e.g., "es" for Spanish).')
            setTimeout(() => {
                setError(null)
            }, 5000)
            return
        }

        if (content.length > 200) {
            setError('Content exceeds the maximum length of 200 characters.')
            setTimeout(() => {
                setError(null)
            }, 5000)
            return
        }

        setIsTranslating(true)
        setError(null)

        translatePublic
            .call({
                data: {
                    language: languageCode,
                    content: content,
                },
            })
            .then((r) => r.json())
            .then((data) => {
                console.log('Translation result:', data)
                let result = {
                    [languageCode]: data.payload.translation,
                }

                setTranslationResult(result)
                setIsTranslating(false)
            })
            .catch((err) => {
                setError('Failed to translate. Please check if the language ISO code is a valid or try again.')
            })
            .finally(() => {
                setTimeout(() => {
                    setError(null)
                }, 5000)
                setIsTranslating(false)
            })
    }

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-white">
                    AI-Powered Translation
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                    Reach global audiences with our cutting-edge AI translation technology
                </p>
            </div>

            <div className="relative max-w-3xl mx-auto">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-20 h-20 bg-yellow-400 rounded-full opacity-10 blur-xl"></div>

                {/* Main card with gradient background */}
                <div className="bg-primary hover:bg-primary-dark rounded-xl p-6 lg:p-10 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.2)] ring-2 ring-primary/[0.5] transition-all duration-250 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.35)] transform hover:-translate-y-2 relative overflow-hidden z-10">
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjEuOSAyLjEgMi4xdjE5LjhjMCAxLjItLjkgMi4xLTIuMSAyLjFIMTguMWMtMS4yIDAtMi4xLS45LTIuMS0yLjFWMjAuMWMwLTEuMi45LTIuMSAyLjEtMi4xaDE3Ljh6TTYgNmMxLjIgMCAyLjEuOSAyLjEgMi4xdjE5LjhjMCAxLjItLjkgMi4xLTIuMSAyLjFIMy45Yy0xLjIgMC0yLjEtLjktMi4xLTIuMVY4LjFDMS44IDYuOSAyLjcgNiAzLjkgNkg2eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjIiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>

                    {/* NEW badge */}
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white px-5 py-2 text-xs font-bold transform rotate-45 translate-x-3 translate-y-1 shadow-md z-20">
                        NEW
                    </div>

                    <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                        {/* Icon with glow effect */}
                        <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white shadow-lg md:mt-2 relative group">
                            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-250"></div>
                            <svg
                                className="size-10 text-primary group-hover:scale-110 transition-transform duration-250"
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
                        </div>

                        <div className="flex-1">
                            {/* Title with highlight */}
                            <div className="inline-block relative">
                                <h2 className="text-3xl font-bold text-white">
                                    Translate to any language with{' '}
                                    <span className="relative inline-block">
                                        AI
                                        <span className="absolute bottom-1 left-0 w-full h-2 bg-yellow-400 opacity-40 rounded"></span>
                                    </span>
                                </h2>
                            </div>

                            {/* Description with better typography */}
                            <p className="mt-6 text-lg leading-relaxed text-white/90">
                                Instantly translate your content to any language with our advanced AI translation
                                technology. Perfect for reaching global audiences without the hassle of manual
                                translations.
                            </p>

                            {/* Feature highlights */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 mr-3">
                                        <svg
                                            className="size-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-white">Any language</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 mr-3">
                                        <svg
                                            className="size-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-white">Real-time translation</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 mr-3">
                                        <svg
                                            className="size-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-white">AI-powered accuracy</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 mr-3">
                                        <svg
                                            className="size-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-white">Context preservation</span>
                                </div>
                            </div>

                            {/* Translation form */}
                            <form onSubmit={handleTranslation} className="mt-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="content"
                                            className="flex items-center text-sm font-medium text-white"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2 text-yellow-300"
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
                                            Content to translate
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute -inset-0.5 bg-blue-400 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-250"></div>
                                            <textarea
                                                id="content"
                                                name="content"
                                                rows="3"
                                                className="relative w-full px-4 py-3 bg-white border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-black placeholder-black shadow-inner"
                                                placeholder="Enter the text you want to translate..."
                                                required
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-xs text-white/70">Max 200 characters</p>
                                            <p className="text-xs text-white/70">{content.length}/200</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="languageCode"
                                            className="flex items-center text-sm font-medium text-white"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2 text-yellow-300"
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
                                            Language ISO Code
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute -inset-0.5 bg-blue-400 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-250"></div>
                                            <div className="relative flex items-center">
                                                <input
                                                    type="text"
                                                    id="languageCode"
                                                    name="languageCode"
                                                    maxLength="2"
                                                    className="w-full px-4 py-3 bg-white backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-black placeholder-black shadow-inner"
                                                    placeholder="e.g. es, fr, de, ja"
                                                    required
                                                    value={languageCode}
                                                    onChange={(e) => setLanguageCode(e.target.value)}
                                                />
                                                <div className="absolute right-3 bg-blue-500 rounded-full px-2 py-1">
                                                    <span className="text-xs font-bold text-white">
                                                        {languageCode ? languageCode.toUpperCase() : 'ISO'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-xs text-white/70">
                                            <svg
                                                className="w-3 h-3 mr-1 text-yellow-300/70"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Enter a 2-digit ISO language code (e.g., 'es' for Spanish, 'fr' for French)
                                        </div>
                                    </div>
                                </div>

                                {/* CTA button */}
                                <button
                                    type="submit"
                                    disabled={isTranslating}
                                    className="mt-8 group relative inline-flex items-center justify-center px-8 py-3 bg-white text-black font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-250 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 overflow-hidden"
                                >
                                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                    {isTranslating ? (
                                        <span className="flex items-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Translating...
                                        </span>
                                    ) : (
                                        'Try it now'
                                    )}
                                </button>
                            </form>

                            {/* Translation Results */}
                            {translationResult && (
                                <div className="mt-10 relative">
                                    <div className="absolute -inset-1 bg-blue-400 rounded-lg blur opacity-20"></div>
                                    <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-lg">
                                        <div className="flex items-center mb-6">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 mr-3">
                                                <svg
                                                    className="w-5 h-5 text-green-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-white">Translation Results</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {Object.entries(translationResult).map(([lang, text]) => (
                                                <div
                                                    key={lang}
                                                    className="bg-white/10 p-5 rounded-lg border border-white/10 shadow-inner"
                                                >
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                        <div className="flex-shrink-0">
                                                            <span className="inline-flex items-center justify-center text-sm font-bold text-white bg-blue-500 px-3 py-1.5 rounded-full shadow-inner">
                                                                {lang.toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <p className="text-white text-lg">{text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 flex items-center justify-end">
                                            <div className="flex items-center text-xs text-white/70">
                                                <svg
                                                    className="w-4 h-4 mr-1 text-yellow-300/70"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                Translation completed in less than a second
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="mt-6 relative">
                                    <div className="absolute -inset-1 bg-red-500/30 rounded-lg blur opacity-75"></div>
                                    <div className="relative flex items-center gap-3 text-white bg-red-500/80 p-4 rounded-lg border border-red-400/30 shadow-md">
                                        <svg
                                            className="w-5 h-5 text-white flex-shrink-0"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                        <p className="text-sm font-medium">{error}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Translation Examples */}
            <div className="mt-16 relative">
                <div className="absolute inset-0 bg-blue-50 rounded-3xl -z-10 transform -skew-y-2"></div>
                <div className="py-16 px-4">
                    <div className="flex flex-col items-center mb-12">
                        <h3 className="text-3xl font-bold text-center text-gray-900 mb-3">See it in action</h3>
                        <div className="w-20 h-1 bg-primary rounded-full mb-4"></div>
                        <p className="text-center text-gray-600 max-w-2xl">
                            Watch how our AI instantly translates your content while preserving meaning and context
                        </p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Translation Flow */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-2 bg-primary -z-10 transform -translate-y-1/2"></div>

                        <div className="grid md:grid-cols-3 gap-4 md:gap-8 relative md:items-start">
                            {/* Example 1 - Original */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 hover:border-primary transition-all duration-250 transform hover:-translate-y-2 hover:shadow-xl group h-full flex flex-col">
                                <div className="absolute -top-3 left-6 bg-blue-100 text-primary px-3 py-1 rounded-full text-xs font-bold">
                                    ORIGINAL
                                </div>
                                <div className="flex items-center mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mr-4 group-hover:bg-primary transition-colors duration-250">
                                        <span className="text-2xl group-hover:scale-110 transition-transform duration-250">
                                            🇺🇸
                                        </span>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">English</h4>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100 flex-grow">
                                    <p className="text-gray-700 font-medium">
                                        "Welcome to our platform! We're excited to have you join us."
                                    </p>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <svg
                                        className="size-5 mr-2 text-blue-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>Source content</span>
                                </div>
                            </div>

                            {/* Example 2 - Spanish */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 hover:border-primary transition-all duration-250 transform hover:-translate-y-2 hover:shadow-xl group h-full flex flex-col">
                                <div className="hidden md:flex absolute -left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full w-8 h-8 items-center justify-center shadow-md">
                                    <svg
                                        className="size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </div>
                                <div className="flex items-center mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mr-4 group-hover:bg-primary transition-colors duration-250">
                                        <span className="text-2xl group-hover:scale-110 transition-transform duration-250">
                                            🇪🇸
                                        </span>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Spanish</h4>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100 flex-grow">
                                    <p className="text-gray-700 font-medium">
                                        "¡Bienvenido a nuestra plataforma! Estamos emocionados de que te unas a
                                        nosotros."
                                    </p>
                                </div>
                                <div className="flex items-center text-sm text-primary">
                                    <svg
                                        className="size-5 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                    <span className="font-medium">AI Translated</span>
                                </div>
                            </div>

                            {/* Example 3 - Japanese */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 hover:border-primary transition-all duration-250 transform hover:-translate-y-2 hover:shadow-xl group h-full flex flex-col">
                                <div className="hidden md:flex absolute -left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full w-8 h-8 items-center justify-center shadow-md">
                                    <svg
                                        className="size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </div>
                                <div className="flex items-center mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mr-4 group-hover:bg-primary transition-colors duration-250">
                                        <span className="text-2xl group-hover:scale-110 transition-transform duration-250">
                                            🇯🇵
                                        </span>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Japanese</h4>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100 flex-grow">
                                    <p className="text-gray-700 font-medium">
                                        "私たちのプラットフォームへようこそ！あなたが参加してくれて嬉しいです。"
                                    </p>
                                </div>
                                <div className="flex items-center text-sm text-primary">
                                    <svg
                                        className="size-5 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                    <span className="font-medium">AI Translated</span>
                                </div>
                            </div>
                        </div>

                        {/* Translation Accuracy Indicator */}
                        <div className="mt-12 bg-blue-50 rounded-lg p-4 border border-blue-100 flex items-center justify-center">
                            <div className="flex items-center mr-8">
                                <svg
                                    className="size-5 mr-2 text-green-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">99.8% Accuracy</span>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    className="size-5 mr-2 text-green-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">
                                    Translation in &lt; 0.5 seconds
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Use Cases */}
            <div className="max-w-5xl mx-auto">
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Real-world applications</h3>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Use Case 1 */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">E-commerce</h4>
                        <p className="text-gray-700 mb-4">
                            An online store increased sales by 45% in international markets after implementing our AI
                            translation for product descriptions, customer reviews, and checkout processes.
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                            <svg
                                className="size-5 mr-2 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Translated to 24 languages automatically</span>
                        </div>
                    </div>

                    {/* Use Case 2 */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">Content Marketing</h4>
                        <p className="text-gray-700 mb-4">
                            A digital marketing agency expanded their client base to 15 new countries by offering
                            multilingual content creation with our AI translation technology.
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                            <svg
                                className="size-5 mr-2 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>90% time savings compared to manual translation</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

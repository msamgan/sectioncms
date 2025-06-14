export default function TranslationSection() {
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    AI-Powered Translation
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                    Reach global audiences with our cutting-edge AI translation technology
                </p>
            </div>

            <div className="dark:bg-primary bg-primary hover:bg-primary-dark dark:hover:bg-primary-dark flex items-start gap-4 rounded-lg p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.15)] ring-2 ring-primary/[0.5] transition-all duration-250 hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.25)] transform hover:-translate-y-1 lg:p-10 relative overflow-hidden max-w-3xl mx-auto">
                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-xs font-bold transform rotate-45 translate-x-2 -translate-y-1 shadow-md">
                    NEW
                </div>
                <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white sm:size-20">
                    <svg
                        className="size-8 text-primary"
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

                <div className="pt-3 sm:pt-5">
                    <h2 className="text-2xl font-semibold text-white">Translate to any language with AI</h2>

                    <p className="mt-4 text-lg text-white/90">
                        Instantly translate your content to any language with our advanced AI translation technology. Perfect for reaching global audiences without the hassle of manual translations. Our AI understands context and nuance to deliver high-quality translations that maintain your content's original meaning and tone.
                    </p>
                </div>
            </div>

            {/* Translation Examples */}
            <div className="mt-16 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white rounded-3xl -z-10 transform -skew-y-2"></div>
                <div className="py-16 px-4">
                    <div className="flex flex-col items-center mb-12">
                        <h3 className="text-3xl font-bold text-center text-gray-900 mb-3">See it in action</h3>
                        <div className="w-20 h-1 bg-primary rounded-full mb-4"></div>
                        <p className="text-center text-gray-600 max-w-2xl">Watch how our AI instantly translates your content while preserving meaning and context</p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Translation Flow */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-100 via-primary to-blue-100 -z-10 transform -translate-y-1/2"></div>

                        <div className="grid md:grid-cols-3 gap-4 md:gap-8 relative md:items-start">
                            {/* Example 1 - Original */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 hover:border-primary transition-all duration-250 transform hover:-translate-y-2 hover:shadow-xl group h-full flex flex-col">
                                <div className="absolute -top-3 left-6 bg-blue-100 text-primary px-3 py-1 rounded-full text-xs font-bold">
                                    ORIGINAL
                                </div>
                                <div className="flex items-center mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mr-4 group-hover:bg-primary transition-colors duration-250">
                                        <span className="text-2xl group-hover:scale-110 transition-transform duration-250">🇺🇸</span>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">English</h4>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100 flex-grow">
                                    <p className="text-gray-700 font-medium">"Welcome to our platform! We're excited to have you join us."</p>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <svg className="size-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Source content</span>
                                </div>
                            </div>

                            {/* Example 2 - Spanish */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 hover:border-primary transition-all duration-250 transform hover:-translate-y-2 hover:shadow-xl group h-full flex flex-col">
                                <div className="hidden md:flex absolute -left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full w-8 h-8 items-center justify-center shadow-md">
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                                <div className="flex items-center mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mr-4 group-hover:bg-primary transition-colors duration-250">
                                        <span className="text-2xl group-hover:scale-110 transition-transform duration-250">🇪🇸</span>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Spanish</h4>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100 flex-grow">
                                    <p className="text-gray-700 font-medium">"¡Bienvenido a nuestra plataforma! Estamos emocionados de que te unas a nosotros."</p>
                                </div>
                                <div className="flex items-center text-sm text-primary">
                                    <svg className="size-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="font-medium">AI Translated</span>
                                </div>
                            </div>

                            {/* Example 3 - Japanese */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 hover:border-primary transition-all duration-250 transform hover:-translate-y-2 hover:shadow-xl group h-full flex flex-col">
                                <div className="hidden md:flex absolute -left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full w-8 h-8 items-center justify-center shadow-md">
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                                <div className="flex items-center mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mr-4 group-hover:bg-primary transition-colors duration-250">
                                        <span className="text-2xl group-hover:scale-110 transition-transform duration-250">🇯🇵</span>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Japanese</h4>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100 flex-grow">
                                    <p className="text-gray-700 font-medium">"私たちのプラットフォームへようこそ！あなたが参加してくれて嬉しいです。"</p>
                                </div>
                                <div className="flex items-center text-sm text-primary">
                                    <svg className="size-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="font-medium">AI Translated</span>
                                </div>
                            </div>
                        </div>

                        {/* Translation Accuracy Indicator */}
                        <div className="mt-12 bg-blue-50 rounded-lg p-4 border border-blue-100 flex items-center justify-center">
                            <div className="flex items-center mr-8">
                                <svg className="size-5 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">99.8% Accuracy</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="size-5 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Translation in &lt; 0.5 seconds</span>
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
                            An online store increased sales by 45% in international markets after implementing our AI translation for product descriptions, customer reviews, and checkout processes.
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                            <svg className="size-5 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Translated to 24 languages automatically</span>
                        </div>
                    </div>

                    {/* Use Case 2 */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">Content Marketing</h4>
                        <p className="text-gray-700 mb-4">
                            A digital marketing agency expanded their client base to 15 new countries by offering multilingual content creation with our AI translation technology.
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                            <svg className="size-5 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>90% time savings compared to manual translation</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="mt-16 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">How translation works</h3>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                            <span className="text-primary font-bold text-xl">1</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">Select content</h4>
                        <p className="text-gray-600 text-sm">Choose the content you want to translate</p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:block text-gray-300">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                            <span className="text-primary font-bold text-xl">2</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">Choose languages</h4>
                        <p className="text-gray-600 text-sm">Set target language</p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:block text-gray-300">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                            <span className="text-primary font-bold text-xl">3</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">Instant translation</h4>
                        <p className="text-gray-600 text-sm">Get high-quality translations in seconds</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

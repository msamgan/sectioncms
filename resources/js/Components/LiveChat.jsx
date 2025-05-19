import { useState, useEffect } from 'react'

export default function LiveChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: 'Hi there! 👋 How can I help you with SectionCMS today?',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ])
    const [newMessage, setNewMessage] = useState('')
    const [isMinimized, setIsMinimized] = useState(true)
    const [unreadCount, setUnreadCount] = useState(0)

    // Show chat bubble after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    // Auto-responses based on keywords
    const getAutoResponse = (message) => {
        const lowerMessage = message.toLowerCase()

        if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
            return 'Our pricing is usage-based. You get a generous free tier that includes your first website, 1GB of storage, 100 API calls per day, and 20 sections. Beyond that, you only pay for what you use!'
        }

        if (lowerMessage.includes('trial') || lowerMessage.includes('free')) {
            return 'Yes! You can start using SectionCMS for free. No credit card required to get started.'
        }

        if (lowerMessage.includes('api') || lowerMessage.includes('integration')) {
            return 'SectionCMS provides a RESTful API that allows you to integrate it with any website or application. You can use the API to fetch content from SectionCMS and display it in your existing site.'
        }

        return 'Thanks for your message! A team member will get back to you soon. In the meantime, feel free to check out our documentation or sign up for a free account.'
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }

        setMessages([...messages, userMessage])
        setNewMessage('')

        // Add bot response after a short delay
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                sender: 'bot',
                text: getAutoResponse(newMessage),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }

            setMessages((prev) => [...prev, botResponse])

            if (isMinimized) {
                setUnreadCount((prev) => prev + 1)
            }
        }, 1000)
    }

    const toggleChat = () => {
        setIsMinimized(!isMinimized)
        if (!isMinimized) {
            setUnreadCount(0)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
            {/* Chat window */}
            {!isMinimized && (
                <div className="mb-4 flex max-h-[500px] w-80 flex-col overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 ease-in-out sm:w-96 dark:bg-gray-800">
                    {/* Chat header */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
                        <div className="flex items-center">
                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold">SectionCMS Support</h3>
                                <p className="text-xs text-blue-100">We typically reply in a few minutes</p>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="text-white transition-colors hover:text-blue-100">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    {/* Chat messages */}
                    <div className="bg-gray-50 flex-1 space-y-4 overflow-y-auto p-4 dark:bg-gray-900">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg p-3 ${
                                        message.sender === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'border border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
                                    }`}
                                >
                                    <p>{message.text}</p>
                                    <p
                                        className={`mt-1 text-xs ${
                                            message.sender === 'user'
                                                ? 'text-blue-100'
                                                : 'text-gray-500 dark:text-gray-400'
                                        }`}
                                    >
                                        {message.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat input */}
                    <form
                        onSubmit={handleSendMessage}
                        className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                    >
                        <div className="flex">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            <button
                                type="submit"
                                className="rounded-r-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Chat bubble */}
            <button
                onClick={toggleChat}
                className="relative rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
                {isMinimized ? (
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}

                {/* Unread count badge */}
                {unreadCount > 0 && isMinimized && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                        {unreadCount}
                    </span>
                )}
            </button>
        </div>
    )
}

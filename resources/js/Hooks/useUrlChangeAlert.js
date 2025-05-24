import { parseQueryString } from '@/Utils/methods.js'
import { useEffect } from 'react'

const useUrlChangeAlert = (refresher, setLoading) => {
    useEffect(() => {
        const handleUrlChange = () => {
            refresher(parseQueryString())
                .then()
                .finally(() => {
                    setLoading(false)
                })
        }

        // Override pushState and replaceState
        const originalPushState = history.pushState
        const originalReplaceState = history.replaceState

        history.pushState = function (...args) {
            originalPushState.apply(this, args)
            handleUrlChange()
        }

        history.replaceState = function (...args) {
            originalReplaceState.apply(this, args)
            handleUrlChange()
        }

        // Listen for popstate
        window.addEventListener('popstate', handleUrlChange)

        return () => {
            // Restore original methods and remove event listener
            history.pushState = originalPushState
            history.replaceState = originalReplaceState
            window.removeEventListener('popstate', handleUrlChange)
        }
    }, [])
}

export default useUrlChangeAlert

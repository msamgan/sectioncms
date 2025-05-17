export const formatDuration = (datetime) => {
    const now = new Date()
    const then = new Date(datetime)
    const diff = now.getTime() - then.getTime()

    const seconds = Math.round(diff / 1000)
    const minutes = Math.round(seconds / 60)
    const hours = Math.round(minutes / 60)
    const days = Math.round(hours / 24)
    const months = Math.round(days / 30)
    const years = Math.round(months / 12)

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`
    }
}

export const toTitleCase = (str) => {
    return str
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export const formatFileSize = (bytes) => {
    if (bytes < 1024) {
        return `${Math.round(bytes)} B`
    } else if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`
    } else if (bytes < 1024 * 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    } else if (bytes < 1024 * 1024 * 1024 * 1024) {
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
    } else {
        return `${(bytes / (1024 * 1024 * 1024 * 1024)).toFixed(2)} TB`
    }
}

export const parseQueryString = () => {
    const params = new URLSearchParams(window.location.search)
    const result = {}
    for (const [key, value] of params.entries()) {
        result[key] = value
    }

    return result
}

export const slugify = (str) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export const dataObject = (language) => {
    return {
        name: language ? language.name : '',
        code: language ? language.code : '',
    }
}

export const pageObject = (language) => {
    return {
        title: language ? 'Edit Language' : 'Create Language',
    }
}

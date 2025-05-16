export const dataObject = (section) => {
    return {
        name: section ? section.name : '',
    }
}

export const pageObject = (section) => {
    return {
        title: section ? 'Edit Section' : 'Create Section',
    }
}

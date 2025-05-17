export const dataObject = (section) => {
    return {
        name: section ? section.name : '',
        fields: section ? section.fields : [],
    }
}

export const pageObject = (section) => {
    return {
        title: section ? 'Edit Section' : 'Create Section',
    }
}

export const makeLanguageObject = (languages) => {
    const languageObject = {}
    languages.forEach((language) => {
        languageObject[language.code] = ''
    })

    return languageObject
}

export const dataObject = (section, languages) => {
    return {
        name: section ? section.name : '',
        fields: section
            ? section.fields
            : [
                  {
                      id: 1,
                      key: '',
                      value: makeLanguageObject(languages),
                  },
              ],
    }
}

export const pageObject = (section) => {
    return {
        title: section ? 'Edit Section' : 'Create Section',
    }
}

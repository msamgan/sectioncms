import CreateActionButton from '@/Components/CreateActionButton.jsx'
import DeleteActionButton from '@/Components/DeleteActionButton.jsx'
import EditActionButton from '@/Components/EditActionButton.jsx'
import PageHeader from '@/Components/PageHeader.jsx'
import Actions from '@/Components/helpers/Actions.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import IsActiveToggle from '@/Components/helpers/IsActiveToggle.jsx'
import Name from '@/Components/helpers/Name.jsx'
import Table from '@/Components/layout/Table.jsx'
import OffCanvas from '@/Components/off_canvas/OffCanvas.jsx'
import usePermissions from '@/Hooks/usePermissions'
import Master from '@/Layouts/Master.jsx'
import Form from '@/Pages/Language/Partials/Form.jsx'
import { pageObject } from '@/Pages/Language/helper.js'
import { moduleConstants } from '@/Utils/constants.js'
import { parseQueryString } from '@/Utils/methods.js'
import { permissions } from '@/Utils/permissions/index.js'
import { languages as _languages, destroy, show, toggleIsActive } from '@actions/LanguageController.js'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Index() {
    const { can } = usePermissions()

    const [languages, setLanguages] = useState([])
    const [data, setData] = useState([])
    const [language, setLanguage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [pageData, setPageData] = useState(pageObject(null))

    const getLanguages = async (query) => setLanguages(await _languages.data({ params: query }))

    const getLanguage = async (id) => setLanguage(await show.data({ params: { language: id } }))

    const editLanguage = (language) => {
        getLanguage(language.id).then()
        setPageData(pageObject(language))
    }

    const processLanguage = (language) => {
        return {
            Name: (
                <div className="flex items-center">
                    <Avatar size="sm" bgColor={moduleConstants.language.bgColor} icon={moduleConstants.language.icon} />
                    <div>
                        <Name value={language.name} />
                        <small className="text-gray-500 block">Language</small>
                    </div>
                </div>
            ),
            Code: (
                <div className="flex items-center">
                    <Avatar size="xs" bgColor={moduleConstants.code.bgColor} icon={moduleConstants.code.icon} />
                    <span className="font-semibold">{language.code}</span>
                </div>
            ),
            Status: can(permissions.language.update) ? (
                <IsActiveToggle
                    toggleIsActive={toggleIsActive}
                    toggleIsActiveParams={{ language: language.id }}
                    isActive={language.is_active}
                    refresher={getLanguages}
                />
            ) : (
                <span className="text-gray-500">{language.is_active ? 'Active' : 'Inactive'}</span>
            ),
            Actions: (
                <>
                    {language.code !== 'en' ? (
                        <Actions>
                            <EditActionButton module={'language'} onClick={() => editLanguage(language)} />
                            <DeleteActionButton
                                module={'language'}
                                route={destroy.route({ language: language.id })}
                                refresh={getLanguages}
                            />
                        </Actions>
                    ) : (
                        ''
                    )}
                </>
            ),
        }
    }

    useEffect(() => {
        setData(languages.map((language) => processLanguage(language)))
    }, [languages])

    useEffect(() => {
        if (can(permissions.language.list)) {
            getLanguages(parseQueryString())
                .then()
                .finally(() => setLoading(false))
        }
    }, [])

    return (
        <Master>
            <Head title="Language" />

            <div className="mb-6">
                <PageHeader
                    title={
                        <div className="flex items-center">
                            <Avatar
                                size="sm"
                                bgColor={moduleConstants.language.bgColor}
                                icon={moduleConstants.language.icon}
                            />
                            <span>Language</span>
                        </div>
                    }
                    subtitle={"Find all of your business's Language and there associated details."}
                    action={
                        <CreateActionButton
                            module={'language'}
                            onClick={() => {
                                setLanguage(null)
                                setPageData(pageObject(null))
                            }}
                        />
                    }
                ></PageHeader>
            </div>

            {can([permissions.language.view, permissions.language.update, permissions.language.create]) && (
                <OffCanvas id="languageFormCanvas" title={pageData.title}>
                    <Form getLanguages={getLanguages} language={language} />
                </OffCanvas>
            )}

            <div className="w-full">
                <div className="bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-lg">
                    <div className="flex items-center p-4 border-b bg-gray-50">
                        <Avatar size="sm" bgColor={moduleConstants.list.bgColor} icon={moduleConstants.list.icon} />
                        <h5 className="m-0 ml-2 text-lg font-semibold">Language List</h5>
                    </div>
                    <div className="p-0">
                        <Table
                            data={data}
                            setLoading={setLoading}
                            loading={loading}
                            permission={can(permissions.language.list)}
                            refresher={getLanguages}
                        />
                    </div>
                </div>
            </div>
        </Master>
    )
}

import Master from '@/Layouts/Master.jsx'
import { Head } from '@inertiajs/react'
import { permissions } from '@/Utils/permissions/index.js'
import { useEffect, useState } from 'react'
import Actions from '@/Components/helpers/Actions.jsx'
import Name from '@/Components/helpers/Name.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import Table from '@/Components/layout/Table.jsx'
import { pageObject } from '@/Pages/Language/helper.js'
import PageHeader from '@/Components/PageHeader.jsx'
import OffCanvas from '@/Components/off_canvas/OffCanvas.jsx'
import Form from '@/Pages/Language/Partials/Form.jsx'
import { destroy, languages as _languages, show } from '@actions/LanguageController.js'
import usePermissions from '@/Hooks/usePermissions'
import EditActionButton from '@/Components/EditActionButton.jsx'
import DeleteActionButton from '@/Components/DeleteActionButton.jsx'
import CreateActionButton from '@/Components/CreateActionButton.jsx'

export default function Index() {
    const { can } = usePermissions()

    const [languages, setLanguages] = useState([])
    const [data, setData] = useState([])
    const [language, setLanguage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [pageData, setPageData] = useState(pageObject(null))

    const getLanguages = async () => setLanguages(await _languages.data({}))

    const getLanguage = async (id) => setLanguage(await show.data({ params: { language: id } }))

    const editLanguage = (language) => {
        getLanguage(language.id).then()
        setPageData(pageObject(language))
    }

    const processLanguage = (language) => {
        return {
            Name: (
                <div className="d-flex align-items-center">
                    <Avatar
                        size="sm"
                        bgColor="bg-warning"
                        icon="ri-translate-2"
                    />
                    <div>
                        <Name value={language.name} />
                        <small className="text-muted d-block">Language</small>
                    </div>
                </div>
            ),
            Code: (
                <div className="d-flex align-items-center">
                    <Avatar
                        size="xs"
                        bgColor="bg-secondary"
                        icon="ri-code-line"
                    />
                    <span className="fw-semibold">{language.code}</span>
                </div>
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
        if (can(permissions.language.list)) {
            getLanguages()
                .then()
                .finally(() => setLoading(false))
        }
    }, [])

    useEffect(() => {
        setData(languages.map((language) => processLanguage(language)))
    }, [languages])

    return (
        <Master>
            <Head title="Language" />

            <div className="mb-6">
                <PageHeader
                    title={
                        <div className="d-flex align-items-center">
                            <Avatar
                                size="sm"
                                bgColor="bg-warning"
                                icon="ri-translate-2"
                            />
                            <span>Language</span>
                        </div>
                    }
                    subtitle={'Find all of your business\'s Language and there associated details.'}
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

            <div className="col-12">
                <div className="card shadow-sm hover:shadow-lg transition-all duration-200">
                    <div className="card-header border-bottom bg-light-subtle">
                        <div className="d-flex align-items-center">
                            <Avatar
                                size="sm"
                                bgColor="bg-warning"
                                icon="ri-list-check"
                            />
                            <h5 className="card-title m-0 text-lg font-semibold">Language List</h5>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <Table data={data} loading={loading} permission={can(permissions.language.list)} />
                    </div>
                </div>
            </div>
        </Master>
    )
}

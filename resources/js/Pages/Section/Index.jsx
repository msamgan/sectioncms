import Master from '@/Layouts/Master.jsx'
import { Head } from '@inertiajs/react'
import { permissions } from '@/Utils/permissions/index.js'
import { useEffect, useState } from 'react'
import Name from '@/Components/helpers/Name.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import Table from '@/Components/layout/Table.jsx'
import { pageObject } from '@/Pages/Section/helper.js'
import PageHeader from '@/Components/PageHeader.jsx'
import OffCanvas from '@/Components/off_canvas/OffCanvas.jsx'
import Form from '@/Pages/Section/Partials/Form.jsx'
import { destroy, sections as _sections, show } from '@actions/SectionController.js'
import { languages as _languages } from '@actions/LanguageController.js'
import usePermissions from '@/Hooks/usePermissions'
import EditActionButton from '@/Components/EditActionButton.jsx'
import DeleteActionButton from '@/Components/DeleteActionButton.jsx'
import CreateActionButton from '@/Components/CreateActionButton.jsx'
import Actions from '@/Components/helpers/Actions.jsx'
import ClickToCopy from '@/Components/helpers/ClickToCopy.jsx'
import { moduleConstants } from '@/Utils/constants.js'

export default function Index() {
    const { can } = usePermissions()

    const [sections, setSections] = useState([])
    const [data, setData] = useState([])
    const [section, setSection] = useState(null)
    const [loading, setLoading] = useState(true)
    const [pageData, setPageData] = useState(pageObject(null))
    const [languages, setLanguages] = useState([])
    const getSections = async () => setSections(await _sections.data({}))

    const getSection = async (id) => setSection(await show.data({ params: { section: id } }))

    const getLanguages = async () => setLanguages(await _languages.data({}))

    const editSection = (section) => {
        getSection(section.id).then()
        setPageData(pageObject(section))
    }

    const processSection = (section) => {
        return {
            Name: (
                <div className="d-flex align-items-center">
                    <Avatar
                        size="sm"
                        bgColor={moduleConstants.section.bgColor}
                        icon={moduleConstants.section.icon}
                    />
                    <div>
                        <Name value={section.name} />
                        <small className="text-muted d-block">Section</small>
                    </div>
                </div>
            ),
            Identifier: (
                <div className="d-flex align-items-center">
                    <Avatar
                        size="xs"
                        bgColor={moduleConstants.hashtag.bgColor}
                        icon={moduleConstants.hashtag.icon}
                    />
                    <ClickToCopy text={section.slug} />
                </div>
            ),
            Actions: (
                <Actions>
                    <EditActionButton module={'section'} onClick={() => editSection(section)} />
                    <DeleteActionButton
                        module={'section'}
                        route={destroy.route({ section: section.id })}
                        refresh={getSections}
                    />
                </Actions>
            ),
        }
    }

    useEffect(() => {
        if (can(permissions.section.list)) {
            getSections()
                .then()
                .finally(() => setLoading(false))
        }

        getLanguages().then()
    }, [])

    useEffect(() => {
        setData(sections.map((section) => processSection(section)))
    }, [sections])

    return (
        <Master>
            <Head title="Section" />

            <div className="mb-6">
                <PageHeader
                    title={
                        <div className="d-flex align-items-center">
                            <Avatar
                                size="sm"
                                bgColor={moduleConstants.section.bgColor}
                                icon={moduleConstants.section.icon}
                            />
                            <span>Section</span>
                        </div>
                    }
                    subtitle={'Find all of your business\'s Section and there associated details.'}
                    action={
                        <CreateActionButton
                            module={'section'}
                            onClick={() => {
                                setSection(null)
                                setPageData(pageObject(null))
                            }}
                        />
                    }
                ></PageHeader>
            </div>

            {can([permissions.section.view, permissions.section.update, permissions.section.create]) && (
                <OffCanvas id="sectionFormCanvas" title={pageData.title}>
                    {languages.length > 0 && <Form getSections={getSections} section={section} languages={languages} />}
                </OffCanvas>
            )}

            <div className="col-12">
                <div className="card shadow-sm hover:shadow-lg transition-all duration-200">
                    <div className="card-header border-bottom bg-light-subtle">
                        <div className="d-flex align-items-center">
                            <Avatar
                                size="sm"
                                bgColor={moduleConstants.list.bgColor}
                                icon={moduleConstants.list.icon}
                            />
                            <h5 className="card-title m-0 text-lg font-semibold">Section List</h5>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <Table data={data} loading={loading} permission={can(permissions.section.list)} />
                    </div>
                </div>
            </div>
        </Master>
    )
}

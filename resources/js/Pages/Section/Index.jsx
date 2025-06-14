import CreateActionButton from '@/Components/CreateActionButton.jsx'
import DeleteActionButton from '@/Components/DeleteActionButton.jsx'
import EditActionButton from '@/Components/EditActionButton.jsx'
import PageHeader from '@/Components/PageHeader.jsx'
import Actions from '@/Components/helpers/Actions.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import ClickToCopy from '@/Components/helpers/ClickToCopy.jsx'
import Name from '@/Components/helpers/Name.jsx'
import Table from '@/Components/layout/Table.jsx'
import OffCanvas from '@/Components/off_canvas/OffCanvas.jsx'
import usePermissions from '@/Hooks/usePermissions'
import Master from '@/Layouts/Master.jsx'
import Form from '@/Pages/Section/Partials/Form.jsx'
import { pageObject } from '@/Pages/Section/helper.js'
import { moduleConstants } from '@/Utils/constants.js'
import { parseQueryString } from '@/Utils/methods.js'
import { permissions } from '@/Utils/permissions/index.js'
import { languages as _languages } from '@actions/LanguageController.js'
import { sections as _sections, destroy, show } from '@actions/SectionController.js'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Index() {
    const { can } = usePermissions()

    const [sections, setSections] = useState([])
    const [data, setData] = useState([])
    const [section, setSection] = useState(null)
    const [loading, setLoading] = useState(true)
    const [pageData, setPageData] = useState(pageObject(null))
    const [languages, setLanguages] = useState([])
    const getSections = async (query) => setSections(await _sections.data({ params: query }))

    const getSection = async (id) => setSection(await show.data({ params: { section: id } }))

    const getLanguages = async () => setLanguages(await _languages.data({}))

    const editSection = (section) => {
        getSection(section.id).then()
        setPageData(pageObject(section))
    }

    const processSection = (section) => {
        return {
            Name: (
                <div className="flex items-center">
                    <Avatar size="sm" bgColor={moduleConstants.section.bgColor} icon={moduleConstants.section.icon} />
                    <div>
                        <Name value={section.name} />
                        <small className="text-gray-500 block">Section</small>
                    </div>
                </div>
            ),
            Identifier: (
                <div className="flex items-center">
                    <Avatar size="xs" bgColor={moduleConstants.hashtag.bgColor} icon={moduleConstants.hashtag.icon} />
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
            getSections(parseQueryString())
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
                        <div className="flex items-center">
                            <Avatar
                                size="sm"
                                bgColor={moduleConstants.section.bgColor}
                                icon={moduleConstants.section.icon}
                            />
                            <span>Section</span>
                        </div>
                    }
                    subtitle={"Find all of your business's Section and there associated details."}
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

            <div className="w-full">
                <div className="bg-white rounded-lg transition-all duration-200">
                    <div className="flex items-center p-4 border-b bg-gray-50">
                        <Avatar size="sm" bgColor={moduleConstants.list.bgColor} icon={moduleConstants.list.icon} />
                        <h5 className="m-0 ml-2 text-lg font-semibold">Section List</h5>
                    </div>
                    <div className="p-0">
                        <Table
                            data={data}
                            loading={loading}
                            permission={can(permissions.section.list)}
                            setLoading={setLoading}
                            refresher={getSections}
                        />
                    </div>
                </div>
            </div>
        </Master>
    )
}

import Master from '@/Layouts/Master.jsx'
import { Head } from '@inertiajs/react'
import { permissions } from '@/Utils/permissions/index.js'
import { useEffect, useState } from 'react'
import Name from '@/Components/helpers/Name.jsx'
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
            Name: <Name value={section.name} />,
            Identifier: <ClickToCopy text={section.slug} />,
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

            <PageHeader
                title={'Section'}
                subtitle={'Find all of your business’s Section and there associated details.'}
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

            {can([permissions.section.view, permissions.section.update, permissions.section.create]) && (
                <OffCanvas id="sectionFormCanvas" title={pageData.title}>
                    {languages.length > 0 && <Form getSections={getSections} section={section} languages={languages} />}
                </OffCanvas>
            )}

            <div className="col-12">
                <Table data={data} loading={loading} permission={can(permissions.section.list)} />
            </div>
        </Master>
    )
}

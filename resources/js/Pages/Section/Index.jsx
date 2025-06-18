import CreateActionButton from '@/Components/CreateActionButton.jsx'
import DeleteActionButton from '@/Components/DeleteActionButton.jsx'
import EditActionButton from '@/Components/EditActionButton.jsx'
import PageHeader from '@/Components/PageHeader.jsx'
import StatsCard from '@/Components/StatsCard.jsx'
import Actions from '@/Components/helpers/Actions.jsx'
import Avatar from '@/Components/helpers/Avatar.jsx'
import ClickToCopy from '@/Components/helpers/ClickToCopy.jsx'
import Name from '@/Components/helpers/Name.jsx'
import StatsGrid, { StatsGridItem } from '@/Components/layout/StatsGrid.jsx'
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
import { keysCount as _keysCount, sections as _sections, destroy, show } from '@actions/SectionController.js'
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
    const [keysCount, setKeysCount] = useState(0)

    const getSections = async (query) => setSections(await _sections.data({ params: query }))

    const getSection = async (id) => setSection(await show.data({ params: { section: id } }))

    const getLanguages = async () => setLanguages(await _languages.data({}))

    const getKeysCount = async () => setKeysCount(await _keysCount.data({}))

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
        getKeysCount().then()
    }, [])

    useEffect(() => {
        setData(sections.map((section) => processSection(section)))
    }, [sections])

    // Handle refresh button click
    const handleRefresh = () => {
        setLoading(true)
        getSections(parseQueryString())
            .then(() => setLastUpdated(new Date()))
            .finally(() => setLoading(false))
    }

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
                    subtitle={"Find all of your business's Sections and their associated details."}
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

            {/* Summary Cards */}
            <StatsGrid>
                {sections.length > 0 ? (
                    <StatsGridItem>
                        <StatsCard icon={moduleConstants.section.icon} label="Total Sections" count={sections.length} />
                    </StatsGridItem>
                ) : null}
                {languages.length > 0 ? (
                    <StatsGridItem>
                        <StatsCard icon={moduleConstants.language.icon} label="Languages" count={languages.length} />
                    </StatsGridItem>
                ) : null}
                {keysCount > 0 ? (
                    <StatsGridItem>
                        <StatsCard icon={'ri-key-2-line'} label="Active Keys" count={keysCount} />
                    </StatsGridItem>
                ) : null}
            </StatsGrid>

            {can([permissions.section.view, permissions.section.update, permissions.section.create]) && (
                <OffCanvas id="sectionFormCanvas" title={pageData.title}>
                    {languages.length > 0 && <Form getSections={getSections} section={section} languages={languages} />}
                </OffCanvas>
            )}

            <Table
                data={data}
                loading={loading}
                permission={can(permissions.section.list)}
                setLoading={setLoading}
                refresher={getSections}
            />
        </Master>
    )
}

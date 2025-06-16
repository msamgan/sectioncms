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

    // Format date for display
    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // Get current timestamp for "last updated"
    const [lastUpdated, setLastUpdated] = useState(new Date())

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Sections</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2 transition-all duration-500">
                                <span className="inline-block animate-count-up" data-count={sections.length}>
                                    {sections.length}
                                </span>
                            </p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg text-blue-600 transition-transform duration-300 hover:scale-110">
                            <i className="ri-file-list-3-line text-2xl"></i>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500 flex items-center">
                            <i className="ri-time-line mr-1 animate-pulse"></i>
                            Last updated: {formatDate(lastUpdated)}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-indigo-500 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Languages</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2 transition-all duration-500">
                                <span className="inline-block animate-count-up" data-count={languages.length}>
                                    {languages.length}
                                </span>
                            </p>
                        </div>
                        <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600 transition-transform duration-300 hover:scale-110">
                            <i className="ri-translate-2 text-2xl"></i>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500 flex items-center">
                            <i className="ri-global-line mr-1"></i>
                            Available for content
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Quick Actions</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <button
                                    onClick={handleRefresh}
                                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 flex items-center transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    <i
                                        className={`ri-refresh-line mr-1.5 ${loading ? 'animate-spin' : 'hover:animate-spin'}`}
                                    ></i>
                                    Refresh
                                </button>
                                <button
                                    onClick={() => {
                                        setSection(null)
                                        setPageData(pageObject(null))
                                        document
                                            .getElementById('sectionFormCanvas')
                                            .dispatchEvent(new CustomEvent('show.sectionFormCanvas'))
                                    }}
                                    className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm text-blue-700 flex items-center transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    <i className="ri-add-line mr-1.5 group-hover:animate-bounce"></i>
                                    New Section
                                </button>
                            </div>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg text-purple-600 transition-transform duration-300 hover:scale-110">
                            <i className="ri-rocket-line text-2xl"></i>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500 flex items-center">
                            <i className="ri-information-line mr-1"></i>
                            Manage your sections efficiently
                        </span>
                    </div>
                </div>
            </div>

            {can([permissions.section.view, permissions.section.update, permissions.section.create]) && (
                <OffCanvas id="sectionFormCanvas" title={pageData.title}>
                    {languages.length > 0 && <Form getSections={getSections} section={section} languages={languages} />}
                </OffCanvas>
            )}

            <div className="w-full">
                <div className="bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b bg-gradient-to-r from-blue-500/10 to-indigo-600/10">
                        <div className="flex items-center mb-3 sm:mb-0">
                            <Avatar size="sm" bgColor={moduleConstants.list.bgColor} icon={moduleConstants.list.icon} />
                            <div>
                                <h5 className="m-0 ml-2 text-lg font-semibold text-gray-800">Section List</h5>
                                <p className="ml-2 text-xs text-gray-600 mt-0.5">
                                    Manage and organize your content sections
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                                <span className="flex items-center">
                                    <i className="ri-database-2-line mr-2 text-primary"></i>
                                    Total: <span className="font-medium ml-1">{sections.length}</span>
                                </span>
                            </div>
                            <button
                                onClick={handleRefresh}
                                className="p-2 bg-white rounded-lg shadow-sm text-gray-600 hover:text-primary transition-colors"
                                title="Refresh list"
                            >
                                <i className="ri-refresh-line"></i>
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="bg-gray-50 px-5 py-3 border-b flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Filter:</span>
                            <select className="text-sm border border-gray-200 rounded-lg bg-white px-3 py-1.5 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary/20">
                                <option value="">All Sections</option>
                                <option value="recent">Recently Added</option>
                                <option value="alphabetical">Alphabetical</option>
                            </select>
                        </div>
                        <div className="text-xs text-gray-500">Last updated: {formatDate(lastUpdated)}</div>
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

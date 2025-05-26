import DependentMenu from '@/Components/layout/DependentMenu.jsx'
import IndependentMenu from '@/Components/layout/IndependentMenu.jsx'
import { index } from '@actions/MenuController'
import { useEffect, useState } from 'react'

export default function TopMenu() {
    const [menuItems, setMenuItems] = useState([])

    const getMenus = async () => setMenuItems(await index.data({}))

    useEffect(() => {
        getMenus().then()
    }, [])

    return (
        <aside id="layout-menu" className="w-full flex-none transition-all duration-300">
            <div className="py-4 h-full border-b border-gray-100">
                <ul className="menu-inner flex flex-wrap items-center gap-3">
                    <IndependentMenu item={{ route: 'dashboard', icon: 'ri-home-smile-line', label: 'Dashboard' }} />
                    {Object.keys(menuItems).map((itemKey, index) =>
                        itemKey === ''
                            ? menuItems[itemKey].map((item, index) => <IndependentMenu key={index} item={item} />)
                            : menuItems[itemKey].length > 0 && (
                                  <DependentMenu key={index} menuItems={menuItems} itemKey={itemKey} />
                              ),
                    )}
                </ul>
            </div>
        </aside>
    )
}

import OffCanvasButton from '@/Components/off_canvas/OffCanvasButton.jsx'
import usePermissions from '@/Hooks/usePermissions'
import caseify from '@/Utils/caseify.js'
import { permissions } from '@/Utils/permissions/index.js'

export default function EditActionButton({ module, onClick }) {
    const { can } = usePermissions()
    const cases = caseify(module)

    return can([permissions[module].view, permissions[module].update]) ? (
        <OffCanvasButton onClick={onClick} id={cases.camelCase + 'FormCanvas'}>
            {can(permissions[module].update) ? (
                <>
                    <i className="ri-pencil-line mr-1 text-white"></i> Edit
                </>
            ) : can(permissions[module].view) ? (
                <>
                    <i className="ri-eye-line mr-1 text-white"></i> View
                </>
            ) : null}
        </OffCanvasButton>
    ) : null
}

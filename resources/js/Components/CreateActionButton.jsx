import OffCanvasButton from '@/Components/off_canvas/OffCanvasButton.jsx'
import usePermissions from '@/Hooks/usePermissions'
import caseify from '@/Utils/caseify.js'
import { toTitleCase } from '@/Utils/methods.js'
import { permissions } from '@/Utils/permissions/index.js'

export default function CreateActionButton({ module, onClick }) {
    const { can } = usePermissions()
    const cases = caseify(module)

    return (
        can(permissions[module].create) && (
            <OffCanvasButton onClick={onClick} id={cases.camelCase + 'FormCanvas'}>
                <i className="ri-add-line me-2"></i>
                Create {toTitleCase(module)}
            </OffCanvasButton>
        )
    )
}

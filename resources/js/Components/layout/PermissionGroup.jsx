import React from 'react';
import Avatar from '@/Components/helpers/Avatar.jsx';
import { Switch } from '@headlessui/react';
import { moduleConstants } from '@/Utils/constants.js';

export default function PermissionGroup({
    moduleName,
    permissions,
    selectedPermissions,
    onTogglePermission,
    onToggleMultiplePermissions
}) {
    const icon = moduleConstants[moduleName]
        ? moduleConstants[moduleName].icon
        : 'ri-settings-line';

    // Check if all permissions for this module are selected
    const allSelected = permissions.every(permission =>
        selectedPermissions.includes(permission.id)
    );

    // Function to handle "Select All" toggle
    const handleSelectAll = (checked) => {
        if (onToggleMultiplePermissions) {
            // Collect all permission IDs that need to be toggled
            const permissionsToToggle = permissions
                .filter(permission => selectedPermissions.includes(permission.id) !== checked)
                .map(permission => permission.id);

            // Toggle all permissions at once
            if (permissionsToToggle.length > 0) {
                onToggleMultiplePermissions(permissionsToToggle, checked);
            }
        } else {
            // Fallback to the old behavior if onToggleMultiplePermissions is not provided
            permissions.forEach(permission => {
                // Only toggle if the current state doesn't match the desired state
                if (selectedPermissions.includes(permission.id) !== checked) {
                    onTogglePermission(permission.id, checked);
                }
            });
        }
    };

    return (
        <div className="mb-6 p-4 rounded-md border border-gray-200 bg-white transition-all duration-200">
            <div className="flex items-center mb-4">
                <div className="bg-primary rounded-md p-1 mr-3">
                    <Avatar
                        size="xs"
                        bgColor="transparent"
                        icon={icon}
                        className="text-white"
                    />
                </div>
                <h6 className="text-base font-medium text-primary">
                    {moduleName.toUpperCase() + ' MODULE'}
                </h6>
            </div>

            {/* Select All option */}
            <div className="mb-4 border-b pb-3">
                <div className="flex items-center cursor-pointer group">
                    <Switch
                        id={`select-all-${moduleName}`}
                        checked={allSelected}
                        onChange={handleSelectAll}
                        className={(state) =>
                            `${
                                state.checked ? 'bg-primary' : 'bg-gray-200'
                            } relative inline-flex h-6 w-6 items-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1`
                        }
                    >
                        <span className="sr-only">Select All</span>
                        <span
                            className={(state) =>
                                `${
                                    state.checked
                                        ? 'translate-x-6'
                                        : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`
                            }
                        />
                    </Switch>
                    <span
                        onClick={() => handleSelectAll(!allSelected)}
                        className="ml-3 text-gray-700 font-medium group-hover:text-primary transition-colors duration-150"
                    >
                        Select All
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                {permissions.map((permission, index) => (
                    <div className="mb-2 mr-6" key={index}>
                        <div className="flex items-center cursor-pointer group">
                            <Switch
                                id={`permission-${permission.id}`}
                                checked={selectedPermissions.includes(permission.id)}
                                onChange={(checked) => onTogglePermission(permission.id, checked)}
                                className={(state) =>
                                    `${
                                        state.checked ? 'bg-primary' : 'bg-gray-200'
                                    } relative inline-flex h-6 w-6 items-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1`
                                }
                            >
                                <span className="sr-only">{permission.name}</span>
                                <span
                                    className={(state) =>
                                        `${
                                            state.checked
                                                ? 'translate-x-6'
                                                : 'translate-x-1'
                                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`
                                    }
                                />
                            </Switch>
                            <span
                                onClick={() => onTogglePermission(permission.id, !selectedPermissions.includes(permission.id))}
                                className="ml-3 text-gray-700 group-hover:text-primary transition-colors duration-150"
                            >
                                {permission.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

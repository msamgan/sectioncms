import React from 'react';
import SectionHeader from './SectionHeader';
import StatsGrid from './StatsGrid';

export default function DashboardSection({
    icon,
    title,
    iconBgColor,
    iconTextColor,
    className = "mb-8",
    headerAction = null,
    children
}) {
    return (
        <div className={className}>
            <SectionHeader
                icon={icon}
                title={title}
                iconBgColor={iconBgColor}
                iconTextColor={iconTextColor}
            >
                {headerAction}
            </SectionHeader>

            {children}
        </div>
    );
}

export function DashboardStatsSection({
    icon,
    title,
    iconBgColor,
    iconTextColor,
    className,
    headerAction,
    children
}) {
    return (
        <DashboardSection
            icon={icon}
            title={title}
            iconBgColor={iconBgColor}
            iconTextColor={iconTextColor}
            className={className}
            headerAction={headerAction}
        >
            <StatsGrid>
                {children}
            </StatsGrid>
        </DashboardSection>
    );
}

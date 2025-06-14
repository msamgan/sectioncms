# SectionCMS Panel Design Guide

## 1. Layout Structure

### Master Layout
The Panel uses a master layout (`Master.jsx`) with the following key components:
- **Sidebar**: Collapsible navigation menu on the left
- **TopHeader**: Fixed header at the top
- **Main Content Area**: Central area for displaying content
- **Footer**: Information and links at the bottom

```jsx
<div className="flex min-h-screen w-full bg-white">
    <Sidebar user={auth.user} collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
    <header>...</header>
    <div className="flex flex-col flex-1 transition-all duration-250 pt-16">
        <main className="flex-grow w-full">...</main>
        <footer>...</footer>
    </div>
</div>
```

### Content Containers
- Use `rounded-panel` class for content containers
- Apply consistent padding with `px-4 md:px-6` for responsive spacing
- Maintain consistent white backgrounds with `bg-white`

## 2. Color Scheme

### Primary Colors
- **Primary Brand Color**: Applied with `text-primary`, `bg-primary`
- **White**: `bg-white` for panels and content areas
- **Gray Shades**:
    - Light backgrounds: `bg-gray-50`
    - Borders: `border-gray-100`, `border-gray-200`
    - Text: `text-gray-600`, `text-gray-700`, `text-gray-800`

### State Colors
- **Active/Selected**: `bg-blue-50 text-primary`
- **Hover States**: `hover:bg-gray-50 hover:text-primary`

## 3. Typography

### Text Styles
- **Headings**: Use font-medium with appropriate text sizes
- **Body Text**: Regular weight, typically `text-sm` or `text-base`
- **Labels**: `text-xs font-medium text-gray-600`

### Text Hierarchy
- Primary content: `text-gray-800`
- Secondary content: `text-gray-600`
- Tertiary/disabled: `text-gray-500`

## 4. Navigation Components

### Sidebar
- Collapsible design (16px width when collapsed, 64px when expanded)
- Menu items with consistent padding: `px-3 py-2.5`
- Icons for all menu items: `ri-*` (Remix Icon)
- Active state: `bg-blue-50 text-primary font-medium border-l-2 border-primary`
- Hover state: `hover:bg-gray-50 hover:text-primary`

### Top Header
- User information display
- Action buttons (notifications, site management)
- User dropdown menu

## 5. UI Components

### Tables
- Search functionality in the header
- Sticky column headers
- Consistent cell padding: `px-6 py-4`
- Hover states for rows: `hover:bg-gray-50`
- Empty state messaging

```jsx
<table className="w-full text-sm text-left">
    <thead className="text-xs sticky top-0 z-10">
        <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
            {/* Column headers */}
        </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
        {/* Table rows */}
    </tbody>
</table>
```

### Forms
- Floating labels
- Consistent input styling:
```jsx
<input
    className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
/>
```
- Focus states with primary color: `focus:ring-primary focus:border-primary`

### Buttons
- Primary actions: Primary color background
- Secondary actions: Outlined or text-only
- Icon buttons: `p-1.5 rounded-md text-gray-500 hover:bg-gray-50 hover:text-primary`

## 6. Transitions and Animations

### Standard Transitions
- Use consistent duration: `transition-all duration-250`
- Apply to interactive elements: buttons, dropdowns, sidebar

```jsx
className="transition-all duration-250"
```

### Hover Effects
- Subtle background changes: `hover:bg-gray-50`
- Text color changes: `hover:text-primary`

## 7. Responsive Design

### Breakpoints
- Mobile-first approach
- Key breakpoints:
    - sm: Small devices
    - md: Medium devices
    - lg: Large devices
    - xl: Extra large devices

### Responsive Patterns
- Stack elements vertically on mobile, horizontally on larger screens
- Hide/show elements based on screen size: `hidden md:block`
- Adjust padding and margins: `px-4 md:px-6`

## 8. Accessibility

### Focus States
- Visible focus indicators: `focus:ring-2 focus:ring-primary focus:ring-opacity-50`
- Maintain sufficient contrast in all states

### Semantic HTML
- Use appropriate HTML elements (buttons for actions, anchors for links)
- Maintain proper heading hierarchy

## 9. Icons

### Icon System
- Use Remix Icon library consistently: `ri-*` classes
- Maintain consistent sizing: `text-lg` for standard icons

### Icon + Text Patterns
```jsx
<i className="ri-home-line text-lg"></i>
<span className="ml-3">Dashboard</span>
```

## 10. Best Practices

### Component Structure
- Keep components focused on a single responsibility
- Use composition for complex UI elements
- Maintain consistent prop patterns

### CSS Approach
- Use Tailwind CSS utility classes
- Create custom utility classes for repeated patterns
- Follow consistent naming conventions

### State Management
- Use React state for component-level state
- Pass props for shared state between components
- Consider context for deeply nested components

## Implementation Examples

### Standard Panel Container
```jsx
<div className="bg-white rounded-panel transition-all duration-250">
    <div className="p-6">
        {/* Panel content */}
    </div>
</div>
```

### Form Input with Floating Label
```jsx
<div className="relative group">
    <input
        type="text"
        className="w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
        id="fieldName"
    />
    <label
        htmlFor="fieldName"
        className="absolute -top-2 left-2 inline-block bg-white px-1.5 text-xs font-medium text-gray-600 transition-all duration-200 group-focus-within:text-primary"
    >
        Field Label
    </label>
</div>
```

### Action Button
```jsx
<button
    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-250"
>
    Submit
</button>
```

By following this design guide, you'll maintain consistency across the Panel interface while creating a professional, accessible, and user-friendly experience.

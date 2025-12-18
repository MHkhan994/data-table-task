# Data Table Task

A Next.js application featuring a dynamic, customizable data table with infinite scroll, column management, and drag-and-drop reordering capabilities.

## Features

- **Infinite Scroll**: Automatically loads more data as you scroll to the bottom
- **Column Customization**: Show/hide columns and reorder them via drag-and-drop
- **Persistent Settings**: Column preferences saved to localStorage
- **Skeleton Loading**: Smooth loading states for better UX
- **Responsive Design**: Works across different screen sizes

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Axios** - HTTP client for API requests
- **SortableJS** - Drag-and-drop functionality
- **Lucide React** - Icon library

## Reusable Components

### 1. GlobalTable

**Location**: `components/global/GlobalTable.tsx`

A generic, type-safe table component that handles data rendering with infinite scroll.

**Key Features**:
- **Generic Type Support**: Works with any data type using TypeScript generics
- **Infinite Scroll**: Uses Intersection Observer API to detect when user reaches the last row
- **Loading States**: Shows skeleton loaders on initial load and a spinner when loading more data
- **Column Visibility**: Only renders columns marked as visible
- **Customizable Cells**: Each column can define its own cell rendering function

**Props**:
- `data`: Array of data to display
- `defaultColumns`: Column definitions with headers and cell renderers
- `loading`: Loading state indicator
- `hasMore`: Whether more data is available
- `page`: Current page number
- `onEndRow`: Callback when user scrolls to the last row
- `tableName`: Unique identifier for the table

### 2. ColumnSettings

**Location**: `components/global/ColumnSettings.tsx`

A drawer-based UI for managing table column visibility and order.

**Key Features**:
- **Show/Hide Columns**: Toggle individual columns on/off
- **Select All/Deselect All**: Bulk toggle for all columns
- **Drag-and-Drop Reordering**: Rearrange column order using SortableJS
- **Protected Columns**: Some columns can be marked as non-hideable (`canHide: false`)
- **LocalStorage Persistence**: Saves column preferences per table
- **Apply/Cancel Actions**: Changes only apply when user clicks "Apply"

**Props**:
- `columns`: Current column configuration
- `setColumns`: Function to update column state
- `tableName`: Unique table identifier for localStorage key

### 3. GlobalDrawer

**Location**: `components/global/GlobalDrawer.tsx`

A reusable side drawer component using React portals.

**Key Features**:
- **Portal Rendering**: Renders outside the normal DOM hierarchy
- **Click Outside to Close**: Automatically closes when clicking the backdrop
- **Optional Close Button**: Can show/hide the built-in close button
- **Backdrop Blur**: Semi-transparent backdrop with blur effect
- **Fixed Positioning**: Slides in from the right side

**Props**:
- `open`: Controls drawer visibility
- `setOpen`: Callback to close the drawer
- `children`: Content to render inside the drawer
- `withCloseButton`: Whether to show the close button (default: true)

## Utility Functions

### delay

**Location**: `utils/delay.ts`

A simple promise-based delay function for simulating async operations.

**Usage**:
```typescript
await delay(1000); // Wait for 1 second
```

## Type Definitions

### TUser

**Location**: `types/user.ts`

Defines the structure for user data including name, email, address, phone, website, and company information.

### TColumnDef

**Location**: `components/global/GlobalTable.tsx`

Generic type for defining table columns:
- `id`: Column identifier (must match data property)
- `header`: Column header (string or render function)
- `cell`: Function to render cell content
- `isVisible`: Whether column is currently visible
- `canHide`: Whether column can be hidden (optional)

### TableNames

**Location**: `types/table.ts`

Enum for table identifiers used in localStorage keys.

## API Routes

### GET /api/users

**Location**: `app/api/users/route.ts`

Paginated user data endpoint.

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 15)

**Response**:
```json
{
  "data": [...],
  "pagination": {
    "limit": 15,
    "page": 1,
    "total": 50,
    "hasMore": true
  }
}
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## How It Works

1. **Initial Load**: The app fetches the first page of users and displays them in the table
2. **Infinite Scroll**: When you scroll to the bottom, it automatically loads the next page
3. **Column Management**: Click "Table Columns" to open the settings drawer
4. **Customize Columns**: Toggle visibility, drag to reorder, then click "Apply"
5. **Persistence**: Your column preferences are saved and restored on page reload

## Project Structure

```
├── app/
│   ├── api/users/          # API route for user data
│   ├── page.tsx            # Main page component
│   └── layout.tsx          # Root layout
├── components/
│   └── global/             # Reusable components
│       ├── GlobalTable.tsx
│       ├── ColumnSettings.tsx
│       └── GlobalDrawer.tsx
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── lib/                    # Mock data
```

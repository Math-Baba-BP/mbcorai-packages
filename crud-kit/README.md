# @mbcorai/crud-kit

A complete, type-safe CRUD toolkit for React and Next.js applications. Provides reusable components, hooks, and context for building data management interfaces with minimal boilerplate.

## Features

- **Complete CRUD Operations** — Create, Read, Update, Delete with minimal setup
- **Type-Safe** — Built with TypeScript and Zod validation
- **React Context Integration** — Global CRUD state management
- **Reusable Components** — DataTable, Modal, Form, Buttons
- **Form Validation** — React Hook Form + Zod integration
- **Table Rendering** — TanStack React Table with sortable columns
- **Loading & Error States** — Built-in UI components for async operations
- **Flexible & Extensible** — Customizable actions, columns, and layouts
- **Next.js Compatible** — Works seamlessly with App Router

## Technologies

- **React 19+**
- **TypeScript**
- **React Hook Form** — Form state management
- **Zod** — Schema validation
- **@hookform/resolvers** — Zod integration with React Hook Form
- **TanStack React Table** — Advanced table features
- **Tailwind CSS** — Styling

## Installation

```bash
npm install @mbcorai/crud-kit
```

Or with yarn:

```bash
yarn add @mbcorai/crud-kit
```

## Configuration

### 1 — Wrap your app with `CrudProvider`

```tsx
import { CrudProvider } from "@mbcorai/crud-kit"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <CrudProvider>
          {children}
        </CrudProvider>
      </body>
    </html>
  )
}
```

### 2 — Create your data schema with Zod

```tsx
import { z } from "zod"

export const userSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  age: z.coerce.number().min(1),
  role: z.enum(["ADMIN", "CLIENT"]),
})

export type UserFormValues = z.infer<typeof userSchema>
```

### 3 — Define your API operations

```tsx
const users = useCrudResource<User>({
  // Fetch all records
  async getMany() {
    const response = await fetch("/api/users")
    return response.json()
  },

  // Create a new record
  async create(data) {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // Update an existing record
  async update(id, data) {
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // Delete a record
  async remove(id) {
    await fetch(`/api/users/${id}`, { method: "DELETE" })
  },

  // Callbacks
  onSuccess() {
    console.log("Operation successful")
  },
  onError(error) {
    console.error("Operation failed:", error)
  },
})
```

## Using the Components

### Basic Example

```tsx
"use client"

import { useMemo } from "react"
import {
  CrudProvider,
  useCrudContext,
  useCrudResource,
  DataTable,
  CrudModal,
  CrudForm,
  InputField,
  FormActions,
  CreateButton,
  EditButton,
  DeleteButton,
  CrudLoading,
  CrudError,
  CrudEmpty,
  CreateCrudColumn,
} from "@mbcorai/crud-kit"
import { UserFormValues, userSchema } from "@/schemas/user.schema"

function UserPageContent() {
  const crud = useCrudContext()
  const users = useCrudResource<User>({
    async getMany() {
      const response = await fetch("/api/users")
      return response.json()
    },
    async create(data) {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      return response.json()
    },
    async update(id, data) {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      return response.json()
    },
    async remove(id) {
      await fetch(`/api/users/${id}`, { method: "DELETE" })
    },
    onSuccess() {
      crud.resetCrudState()
    },
  })

  const columns = useMemo(
    () => [
      CreateCrudColumn<User>("firstname", "Firstname"),
      CreateCrudColumn<User>("lastname", "Lastname"),
      CreateCrudColumn<User>("email", "Email"),
      CreateCrudColumn<User>("role", "Role"),
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <EditButton item={row.original} />
            <DeleteButton item={row.original} />
          </div>
        ),
      },
    ],
    [crud]
  )

  async function handleSubmit(data: UserFormValues) {
    if (crud.mode === "edit" && crud.selectedItem) {
      await users.updateItem(crud.selectedItem.id, data)
      crud.closeModal()
      return
    }
    await users.createItem(data)
    crud.closeModal()
  }

  if (users.loading) {
    return <CrudLoading />
  }

  if (users.error) {
    return <CrudError message={users.error} />
  }

  const isEmpty = !users.data.length

  return (
    <div className="p-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <CreateButton onClick={() => crud.openModal("create")} />
      </div>

      {isEmpty ? (
        <CrudEmpty message="No users found" />
      ) : (
        <DataTable data={users.data} columns={columns} />
      )}

      <CrudModal
        open={crud.open}
        onClose={crud.closeModal}
        title={crud.mode === "edit" ? "Edit User" : "Create User"}
      >
        <CrudForm<UserFormValues>
          schema={userSchema}
          defaultValues={
            crud.selectedItem || {
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              age: 18,
              role: "CLIENT",
            }
          }
          onSubmit={handleSubmit}
        >
          <InputField name="firstname" label="Firstname" />
          <InputField name="lastname" label="Lastname" />
          <InputField name="email" label="Email" />
          <InputField name="password" label="Password" type="password" />
          <InputField name="age" label="Age" type="number" />
          <InputField name="role" label="Role" />
          <FormActions />
        </CrudForm>
      </CrudModal>
    </div>
  )
}

export default function UserPage() {
  return (
    <CrudProvider>
      <UserPageContent />
    </CrudProvider>
  )
}
```

## Architecture & File Structure

### Core Concepts

The package follows a layered architecture:
1. **Context Layer** — Manages global CRUD state
2. **Hooks Layer** — Exposes CRUD functionality to components
3. **Components Layer** — Reusable UI components
4. **Types Layer** — TypeScript definitions

### File-by-File Breakdown

#### **Context Layer**

##### `context/CrudContext.tsx`
Provides global CRUD state management using React Context.

**Responsibilities:**
- Creates a `CrudContext` for storing modal state and selected item
- Exports `CrudProvider` wrapper component
- Exports `useCrudContext()` hook for accessing CRUD state anywhere

**Key exports:**
- `CrudProvider<T>` — Wrapper component
- `useCrudContext<T>()` — Hook to access modal state, open/close functions

#### **Hooks Layer**

##### `hooks/useCrud.ts`
The core hook managing modal and selection state.

**Responsibilities:**
- Manages modal open/close state
- Stores current CRUD mode ("create", "edit", "delete")
- Stores selected item for editing
- Provides functions to open/close modal and reset state

**Key exports:**
- `useCrud<T>()` — Returns object with `open`, `mode`, `selectedItem`, `openModal()`, `closeModal()`, `resetCrudState()`

##### `hooks/resources/useCrudResource.ts`
The main hook for API operations and data fetching.

**Responsibilities:**
- Fetches data on mount via `config.getMany()`
- Manages loading and error states
- Provides `createItem()`, `updateItem()`, `removeItem()` functions
- Calls `config.onSuccess()` after mutations
- Uses `useRef` to prevent infinite re-fetches when config changes

**Key exports:**
- `useCrudResource<T>(config: CrudResourceConfig<T>)` — Returns object with `data[]`, `loading`, `error`, `refresh()`, `createItem()`, `updateItem()`, `removeItem()`

#### **Components Layer**

##### `components/DataTable.tsx`
Renders a table using TanStack React Table.

**Responsibilities:**
- Renders table headers and rows
- Uses `flexRender` to render column headers and cells
- Supports custom column definitions

**Props:**
- `data: T[]` — Array of items to display
- `columns: ColumnDef<T>[]` — Column definitions

##### `components/CrudModal.tsx`
Modal dialog for forms (create/edit/delete).

**Responsibilities:**
- Shows/hides modal based on `open` prop
- Renders title and close button
- Renders children (typically forms)

**Props:**
- `open: boolean` — Whether modal is visible
- `onClose: () => void` — Close handler
- `title: string` — Modal title
- `children: ReactNode` — Modal content

##### `components/forms/CrudForm.tsx`
Generic form wrapper using React Hook Form + Zod.

**Responsibilities:**
- Wraps `FormProvider` for form context
- Accepts schema for validation
- Provides form methods to children via React Hook Form context

**Props:**
- `schema: ZodType<T>` — Zod validation schema
- `defaultValues: Partial<T>` — Initial form values
- `onSubmit: SubmitHandler<T>` — Form submission handler
- `children: ReactNode` — Form fields

##### `components/forms/InputField.tsx`
Reusable form input component.

**Responsibilities:**
- Registers field with React Hook Form
- Converts numeric inputs to numbers
- Displays validation errors
- Supports any input type (text, email, password, number, etc.)

**Props:**
- `name: string` — Field name
- `label: string` — Display label
- `type?: string` — HTML input type (default: "text")

##### `components/forms/FormActions.tsx`
Renders submit button(s).

**Responsibilities:**
- Renders a submit button with customizable label

**Props:**
- `submitLabel?: string` — Button text (default: "Save")

##### `components/actions/CreateButton.tsx`
Button to open create form.

**Responsibilities:**
- Calls `openModal("create")` on click
- Allows custom `onClick` handler

**Props:**
- `label?: string` — Button text (default: "create")
- `onClick?: () => void` — Custom click handler

##### `components/actions/EditButton.tsx`
Button to open edit form for an item.

**Responsibilities:**
- Calls `openModal("edit", item)` on click
- Requires the item to edit

**Props:**
- `item: T` — Item to edit
- `label?: string` — Button text (default: "Edit")

##### `components/actions/DeleteButton.tsx`
Button to trigger delete operation.

**Responsibilities:**
- Calls `openModal("delete", item)` on click
- Item can then be deleted via API

**Props:**
- `item: T` — Item to delete
- `label?: string` — Button text (default: "Delete")

##### `components/states/CrudLoading.tsx`
Loading state indicator.

**Responsibilities:**
- Displays loading message

**Props:**
- `message?: string` — Loading text (default: "Loading...")

##### `components/states/CrudError.tsx`
Error state display.

**Responsibilities:**
- Displays error message in red

**Props:**
- `message: string` — Error message (required)

##### `components/states/CrudEmpty.tsx`
Empty state display.

**Responsibilities:**
- Displays "no data" message

**Props:**
- `message?: string` — Empty text (default: "No data found")

#### **Library Utilities**

##### `lib/CreateCrudColumn.ts`
Helper function to create standard table columns.

**Responsibilities:**
- Generates a column definition with accessor key and header
- Handles safe value display (shows "-" for null/undefined)

**Function:**
```tsx
CreateCrudColumn<T>(
  accessorKey: keyof T,
  header: string
): ColumnDef<T>
```

##### `lib/CreateCrudActions.tsx`
Helper function to create an actions column.

**Responsibilities:**
- Generates a column for edit/delete buttons

**Function:**
```tsx
CreateCrudActions<T>(
  actions: CrudActionsProps<T>
): ColumnDef<T>
```

#### **Types Layer**

##### `types/CrudContextTypes.ts`
Type definitions for CRUD context.

**Exports:**
- `CrudContextType<T>` — Context value shape

##### `types/CrudHookTypes.ts`
Type definitions for the CRUD hook.

**Exports:**
- `CrudMode` — "create" | "edit" | "delete"
- `CrudState<T>` — State shape with modal state

##### `types/CrudResourceTypes.ts`
Type definitions for resource operations.

**Exports:**
- `CrudResourceConfig<T>` — Configuration object for API operations
- `CrudResourceReturn<T>` — Return object from `useCrudResource`

##### `types/CrudFormTypes.ts`
Type definitions for form components.

**Exports:**
- `CrudFormProps<T>` — Props for `CrudForm`
- `InputFieldProps` — Props for `InputField`
- `FormActionsProps` — Props for `FormActions`

##### `types/CrudActionsTypes.ts`
Type definitions for action buttons.

**Exports:**
- `CrudActionsProps<T>` — Callbacks for edit/delete actions
- `EditButtonProps<T>` — Props for `EditButton`
- `DeleteButtonProps<T>` — Props for `DeleteButton`

##### `types/CrudModalTypes.ts`
Type definitions for the modal.

**Exports:**
- `CrudModalProps` — Props for `CrudModal`

##### `types/DataTableTypes.ts`
Type definitions for the data table.

**Exports:**
- `DataTableProps<T>` — Props for `DataTable`

### Data Flow

```
App Component
    ↓
CrudProvider (wraps everything)
    ↓
useCrudContext() — Access modal state
useCrudResource() — Fetch & manage data
    ↓
DataTable + CrudModal
    ↓
CreateButton → openModal("create")
EditButton → openModal("edit", item)
DeleteButton → openModal("delete", item)
    ↓
CrudForm → Validation via Zod + React Hook Form
    ↓
handleSubmit() → Call users.createItem() / updateItem() / removeItem()
    ↓
API → useCrudResource updates state → Table re-renders
```

## State Management Flow

1. **Initial Load**: `useCrudResource` calls `config.getMany()` on mount
2. **Open Modal**: `EditButton`/`CreateButton` calls `crud.openModal()` with item (if editing)
3. **Fill Form**: Form fields are populated with `defaultValues`
4. **Submit**: `handleSubmit()` calls `users.createItem()` / `updateItem()` / `removeItem()`
5. **Refresh**: After operation, `useCrudResource.refresh()` is called automatically
6. **Close Modal**: `crud.closeModal()` and `crud.resetCrudState()`
7. **Re-render**: Table updates with fresh data

## Customization

### Custom Columns

```tsx
const customColumn: ColumnDef<User> = {
  id: "custom",
  header: "Custom",
  cell: ({ row }) => <span>{row.original.firstname.toUpperCase()}</span>,
}

const columns = [
  ...standardColumns,
  customColumn,
]
```

### Custom Styling

All components use Tailwind CSS classes. Override by wrapping or modifying component classes.

### Custom Actions

Use `EditButton` and `DeleteButton` in custom column definitions, or create your own buttons calling `crud.openModal()` or `users.removeItem()`.

## Best Practices

- Always wrap your app with `CrudProvider`
- Use `useMemo` for column definitions to prevent unnecessary re-renders
- Stabilize API config with `useMemo` in `useCrudResource`
- Use `z.coerce.number()` for numeric fields to handle string inputs
- Use `valueAsNumber` in `InputField` for numeric input types
- Call `crud.resetCrudState()` in `onSuccess` callback to close modal after operations
- Handle errors with `CrudError` state component

## License

MIT

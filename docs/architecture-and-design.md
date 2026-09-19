# HVAC Service Tracker — Architecture and Design Plan

## Team

- David Canales — Team Lead and Full-Stack Developer

## Application Architecture

The application will use Next.js with the App Router, TypeScript, Tailwind CSS, PostgreSQL, and server-side authentication.

### Planned routes

- `/login`
- `/register`
- `/dashboard`
- `/customers`
- `/customers/new`
- `/customers/[id]`
- `/customers/[id]/edit`
- `/customers/[id]/equipment/new`
- `/equipment/[id]`
- `/equipment/[id]/edit`
- `/jobs`
- `/jobs/new`
- `/jobs/[id]`
- `/jobs/[id]/edit`

### Shared components

- `AppShell`
- `Header`
- `Sidebar`
- `PageHeader`
- `StatusBadge`
- `SearchFilters`
- `CustomerCard`
- `EquipmentCard`
- `JobCard`
- `FormField`
- `EmptyState`
- `LoadingState`
- `ErrorAlert`
- `ConfirmDialog`
- `WeatherPanel`
- `Pagination`

### Component hierarchy

```text
RootLayout
└── AppShell
    ├── Header
    ├── Sidebar
    └── Page Content
        ├── PageHeader
        ├── SearchFilters
        ├── Card or table list
        ├── Empty, loading, or error state
        └── Pagination
```

## Data Model

### Team

- `id`: primary key
- `name`
- `created_at`
- `updated_at`

A team has many users and customers.

### User

- `id`: primary key
- `team_id`: foreign key to Team
- `name`
- `email`: unique
- `password_hash`
- `role`: owner, dispatcher, or technician
- `is_active`
- `created_at`
- `updated_at`

A user belongs to one team and may be assigned to many service jobs.

### Customer

- `id`: primary key
- `team_id`: foreign key to Team
- `name`
- `email`
- `phone`
- `street_address`
- `city`
- `state`
- `postal_code`
- `created_at`
- `updated_at`

A customer belongs to one team and has many equipment records and service jobs.

### Equipment

- `id`: primary key
- `customer_id`: foreign key to Customer
- `equipment_type`
- `manufacturer`
- `model`
- `serial_number`
- `installation_date`
- `notes`
- `created_at`
- `updated_at`

Equipment belongs to one customer and may be associated with many service jobs.

### Service Job

- `id`: primary key
- `team_id`: foreign key to Team
- `customer_id`: foreign key to Customer
- `equipment_id`: optional foreign key to Equipment
- `assigned_technician_id`: optional foreign key to User
- `description`
- `service_address`
- `scheduled_at`
- `status`: scheduled, in_progress, completed, or cancelled
- `completion_notes`
- `completed_at`
- `created_at`
- `updated_at`

A service job belongs to a customer and may be assigned to a technician and equipment.

### Job Status History

- `id`: primary key
- `job_id`: foreign key to Service Job
- `changed_by_user_id`: foreign key to User
- `previous_status`
- `new_status`
- `note`
- `changed_at`

A service job has many status-history records.

## Relationship Summary

```text
Team 1 ─── many Users
Team 1 ─── many Customers
Customer 1 ─── many Equipment
Customer 1 ─── many Service Jobs
Equipment 1 ─── many Service Jobs
User 1 ─── many assigned Service Jobs
Service Job 1 ─── many Job Status History records
```

## Database and Security Decisions

- PostgreSQL will be used as the relational database.
- Foreign keys will enforce relationships between records.
- Application queries will be restricted by `team_id` to provide team-level authorization.
- Passwords will only be stored as secure password hashes.
- Customer deletion must not accidentally remove historical service-job records.
- Equipment and users referenced by service jobs may be deactivated or archived instead of permanently deleted.
- Service-job status changes will be preserved in Job Status History.

## Design System

### Color palette

- Navy `#0F172A`: headers and primary text
- Blue `#0369A1`: primary actions and links
- Sky `#E0F2FE`: highlighted backgrounds
- Green `#15803D`: completed and successful states
- Amber `#B45309`: scheduled or warning states
- Red `#B91C1C`: destructive actions and errors
- Slate `#F8FAFC`: application background
- White `#FFFFFF`: cards and form surfaces

### Typography

- Font family: Inter
- Page title: 32–40px, bold
- Section title: 20–24px, semibold
- Body text: 16px
- Supporting text: 14px

### Layout and spacing

- Use an 8px spacing system.
- Use a maximum content width of 1280px.
- Use a sidebar on desktop and compact navigation on mobile.
- Use responsive cards instead of wide tables on narrow screens.
- Form controls must have visible labels and error messages.
- Interactive controls must remain keyboard accessible.
- Status must never be communicated by color alone.

## Project Coordination

### Responsibilities

David Canales will be responsible for:

- Application architecture
- Database design
- Authentication and authorization
- Frontend and backend implementation
- Testing and accessibility
- GitHub Issues and Project Board maintenance
- Documentation and deployment

### Dependencies

- The database schema must be defined before implementing data fetching and CRUD operations.
- Authentication must be available before protected application pages are completed.
- Customer records must exist before equipment and service jobs can be created.
- Equipment and technician records must exist before they can be assigned to service jobs.
- Core job management will be completed before weather integration and advanced search.

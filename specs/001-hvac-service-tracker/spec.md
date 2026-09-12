# Feature Specification: HVAC Service Tracker

**Feature Branch**: `001-hvac-service-tracker`  
**Created**: 2026-09-12  
**Status**: Draft  
**Input**: Project specification for a web application serving small HVAC service teams.

## Project Overview

### Description

HVAC Service Tracker is a web application that helps small HVAC service teams maintain
customer and equipment records, coordinate service jobs, track technician progress, and
view weather conditions for service locations.

### Purpose

The product gives dispatchers, owners, and technicians one reliable place to manage the
service lifecycle from customer request through job completion. It should reduce duplicate
data entry, make job ownership and status visible, and help technicians arrive prepared.

### Target Audience

- Small HVAC business owners and office staff who manage customers, equipment, and schedules.
- Dispatchers who assign service jobs and monitor progress.
- Technicians who need assigned job details, equipment history, status updates, and local weather.

## User Scenarios & Testing

### User Story 1 - Register and Sign In (Priority: P1)

As a service team member, I want to create an account and sign in securely so that I can
access the team's service information.

**Why this priority**: Authentication protects customer and operational data and is the
entry point for every other workflow.

**Independent Test**: Register a new account, sign out, sign back in with valid credentials,
and verify that an unauthenticated visitor cannot access protected records.

**Acceptance Scenarios**:

1. **Given** a visitor with a valid name, email, and password, **When** they submit registration,
   **Then** the account is created and they are signed in or directed to sign in.
2. **Given** an existing account, **When** the user submits the correct email and password,
   **Then** they reach the authenticated application.
3. **Given** an existing account, **When** the user submits an incorrect password,
   **Then** the system shows a non-sensitive error and does not start an authenticated session.
4. **Given** an authenticated user, **When** they sign out, **Then** protected pages and actions
   require authentication again.

### User Story 2 - Manage Customers (Priority: P1)

As an office user, I want to create, view, update, and delete customer records so that the
team has accurate contact and service-location information.

**Why this priority**: Customers are the primary record associated with equipment and jobs.

**Independent Test**: Create a customer, view the saved record, edit a field, confirm the
change, and delete the record while verifying the defined relationship safeguards.

**Acceptance Scenarios**:

1. **Given** an authenticated user on the customer form, **When** they submit a valid name,
   contact method, and service address, **Then** a customer record is saved and displayed.
2. **Given** an existing customer, **When** the user edits contact or address information,
   **Then** the updated values are shown on subsequent views.
3. **Given** an existing customer with no dependent records, **When** the user confirms deletion,
   **Then** the customer is removed and the customer list reflects the change.
4. **Given** a customer with equipment or jobs, **When** the user requests deletion,
   **Then** the system prevents accidental data loss and explains the required next step.

### User Story 3 - Manage Customer Equipment (Priority: P1)

As a service team member, I want to create, view, update, and delete equipment associated
with a customer so that technicians can see relevant unit history before service.

**Why this priority**: Equipment context is essential for accurate diagnosis, service history,
and job preparation.

**Independent Test**: Select a customer, add equipment, view it from the customer record,
edit its details, and delete it when it has no protected job history.

**Acceptance Scenarios**:

1. **Given** an existing customer, **When** an authenticated user submits valid equipment
   details, **Then** the equipment is associated with that customer and appears in their record.
2. **Given** existing equipment, **When** the user updates model, serial number, type, or
   installation details, **Then** the revised information is retained.
3. **Given** equipment referenced by a completed job, **When** the user requests deletion,
   **Then** the system prevents loss of service history and explains the restriction.
4. **Given** a customer with no equipment, **When** the customer record is viewed,
   **Then** an informative empty state offers the action to add equipment.

### User Story 4 - Create, Assign, and Complete Service Jobs (Priority: P1)

As a dispatcher or owner, I want to create service jobs and assign them to technicians so
that work is coordinated and progress is visible to the team.

**Why this priority**: Job coordination is the core operational outcome of the product.

**Independent Test**: Create a job for a customer, assign a technician, update its status,
and mark it complete while verifying that required fields and permissions are enforced.

**Acceptance Scenarios**:

1. **Given** an authenticated dispatcher with an existing customer, **When** they submit a
   valid job description, service location, and scheduled time, **Then** the job is created
   with an initial status of `scheduled`.
2. **Given** an unassigned job and an active technician, **When** an authorized dispatcher
   assigns the technician, **Then** the technician and dispatcher can see the assignment.
3. **Given** an assigned job, **When** the technician changes status to `in_progress`,
   **Then** the current status and last update are visible to authorized team members.
4. **Given** an in-progress job, **When** an authorized user submits completion notes and
   marks it complete, **Then** the job status becomes `completed` and the completion timestamp
   and notes are retained.
5. **Given** a job missing a customer, location, or required description, **When** the user
   submits the form, **Then** the form identifies each missing or invalid field and does not save.

### User Story 5 - Search, Filter, and Inspect Weather (Priority: P2)

As a dispatcher or technician, I want to find jobs quickly and view weather for a service
location so that I can prioritize work and prepare for field conditions.

**Why this priority**: These capabilities improve daily efficiency after the core records
and job lifecycle are reliable.

**Independent Test**: Search by customer or job text, filter by status and technician, open
a job, and request weather for its service location.

**Acceptance Scenarios**:

1. **Given** multiple authorized jobs, **When** a user searches by customer name, address,
   or job description, **Then** only matching jobs are shown.
2. **Given** multiple authorized jobs, **When** a user applies status, technician, or date
   filters, **Then** the results contain only jobs matching all active filters.
3. **Given** a job with a valid service location and available weather data, **When** the user
   requests weather, **Then** the current conditions and forecast summary are displayed with
   the location and retrieval time.
4. **Given** unavailable or invalid weather data, **When** the user requests weather,
   **Then** the job remains usable and an actionable unavailable-state message is shown.

### User Story 6 - Optional Team Enhancements (Priority: P3)

As a service team, I want optional improvements such as saved views, reminders, or richer
reporting so that the tracker can grow with our operating needs after the core workflows
are stable.

**Why this priority**: Enhancements are valuable but must not delay secure, reliable service
management.

**Independent Test**: Each enhancement must define its own acceptance scenarios and must not
regress authentication, records, job lifecycle, search, or weather behavior.

**Acceptance Scenarios**:

1. **Given** a proposed enhancement, **When** it is prioritized for implementation,
   **Then** it has a documented user outcome, scope boundary, and regression coverage before work begins.

### Edge Cases

- Duplicate registration email: reject the registration with a clear, non-sensitive message.
- Invalid or incomplete customer, equipment, or job fields: preserve entered values where safe,
  identify the invalid fields, and do not create or overwrite a record.
- Concurrent edits: prevent silent overwrites and tell the user when the record changed since it was opened.
- Customer or equipment with dependent jobs: preserve historical integrity and block destructive deletion.
- No records match a search or filter: show an empty state with a way to clear filters.
- Slow or failed requests: show a loading state while waiting and an actionable error state after failure.
- Weather provider rate limit, outage, malformed response, or missing location: keep job data available
  and show when weather cannot be retrieved.
- Unauthorized direct access to another team's identifier: return the same not-found or forbidden behavior
  used for protected resources without leaking whether the record exists.
- Narrow screens and zoomed text: controls and tables remain usable without overlapping content or requiring
  horizontal scrolling for primary actions.

## Requirements

### Functional Requirements

- **FR-001**: The system MUST allow a visitor to register with a unique email address, display name,
  and password that meets the stated strength rules.
- **FR-002**: The system MUST allow registered users to sign in and sign out, and MUST protect all customer,
  equipment, job, search, and weather data behind an authenticated session.
- **FR-003**: The system MUST provide customer create, read, update, and delete operations for authorized users.
- **FR-004**: Customer records MUST validate required name, contact, and service-address fields and MUST preserve
  a clear created and updated time.
- **FR-005**: The system MUST provide equipment create, read, update, and delete operations scoped to a customer.
- **FR-006**: Equipment records MUST support at least equipment type, manufacturer, model, serial number,
  installation date when known, and notes.
- **FR-007**: The system MUST prevent deletion of customers or equipment when doing so would orphan or destroy
  required job history.
- **FR-008**: The system MUST allow authorized users to create jobs linked to a customer and optionally to equipment.
- **FR-009**: A job MUST include a description, service location, scheduled date/time, and status; valid statuses
  are `scheduled`, `in_progress`, `completed`, and `cancelled`.
- **FR-010**: Authorized dispatchers or owners MUST be able to assign an active technician to a job.
- **FR-011**: Assigned technicians MUST be able to update permitted job statuses and add completion notes;
  only authorized roles may reassign or cancel jobs.
- **FR-012**: Completed jobs MUST retain completion time, completion notes, customer, equipment when applicable,
  assigned technician, and status history.
- **FR-013**: The system MUST support searching jobs by customer name, service address, and job description.
- **FR-014**: The system MUST support combining status, technician, and scheduled-date filters.
- **FR-015**: The system MUST request weather for a job service location through a cloud-based weather service
  without exposing provider credentials to the browser.
- **FR-016**: Weather results MUST identify the location, current conditions or a forecast summary, and retrieval time.
- **FR-017**: The system MUST show validation, loading, empty, and error states for every data-dependent workflow.
- **FR-018**: The system MUST enforce authorization on every protected read and mutation using the authenticated
  user's team and role, not only by hiding interface controls.
- **FR-019**: The system MUST avoid exposing passwords, credentials, or unnecessary personal data in responses,
  logs, URLs, or client-visible errors.

### Cross-Cutting Requirements

- **CR-001**: User-facing workflows MUST use semantic structure, associated labels, keyboard-accessible controls,
  visible focus, sufficient contrast, and non-color-only status indicators.
- **CR-002**: Forms MUST announce or clearly associate validation and submission errors with the affected controls,
  and focus MUST move predictably to the first actionable error when appropriate.
- **CR-003**: The interface MUST remain usable at mobile widths and at 200% text zoom, with primary actions,
  navigation, forms, and status information remaining available without overlap.
- **CR-004**: All external input and weather responses MUST be validated before use; secrets MUST remain server-side;
  authorization, injection, unsafe URL, CSRF, and rate-limit risks MUST be addressed at data boundaries.
- **CR-005**: The primary list and form workflows MUST provide visible progress feedback within 300 milliseconds of
  an action and MUST display a recoverable error when a request cannot complete.
- **CR-006**: The job list MUST support at least 1,000 jobs for a team while keeping the initial view responsive
  and limiting data to the current search, filter, or page context.

## Proposed API Endpoints

These endpoint contracts describe the externally observable operations required by the project.
Request and response bodies MUST omit secrets and enforce the authorization requirements above.

| Method | Endpoint | Purpose | Priority |
|--------|----------|---------|----------|
| POST | `/api/auth/register` | Register an account | P1 |
| POST | `/api/auth/sign-in` | Start an authenticated session | P1 |
| POST | `/api/auth/sign-out` | End the current session | P1 |
| GET | `/api/customers` | List authorized customers | P1 |
| POST | `/api/customers` | Create a customer | P1 |
| GET | `/api/customers/{customerId}` | View a customer and related summary | P1 |
| PATCH | `/api/customers/{customerId}` | Update a customer | P1 |
| DELETE | `/api/customers/{customerId}` | Delete an eligible customer | P1 |
| GET | `/api/customers/{customerId}/equipment` | List a customer's equipment | P1 |
| POST | `/api/customers/{customerId}/equipment` | Create customer equipment | P1 |
| GET | `/api/equipment/{equipmentId}` | View equipment | P1 |
| PATCH | `/api/equipment/{equipmentId}` | Update equipment | P1 |
| DELETE | `/api/equipment/{equipmentId}` | Delete eligible equipment | P1 |
| GET | `/api/jobs` | List jobs with search, filters, and pagination | P1/P2 |
| POST | `/api/jobs` | Create a service job | P1 |
| GET | `/api/jobs/{jobId}` | View a job and status history | P1 |
| PATCH | `/api/jobs/{jobId}` | Update job details, assignment, or status | P1 |
| DELETE | `/api/jobs/{jobId}` | Delete a job when policy permits | P1 |
| GET | `/api/jobs/{jobId}/weather` | Retrieve weather for the service location | P2 |

List endpoints MUST support bounded results. `/api/jobs` MUST accept search text, status,
technician, scheduled-date range, and page or cursor parameters. Mutation endpoints MUST
return a clear validation response for invalid input, an authorization response for a
disallowed action, and a conflict response when a concurrent edit cannot be safely merged.

## Key Entities

- **User**: An authenticated team member with identity, email, role, and team membership.
- **Team**: The service organization that owns customers, equipment, and jobs.
- **Customer**: A person or organization with contact information and one or more service locations.
- **Equipment**: An HVAC unit associated with a customer, including identifying and installation details.
- **Service Job**: A request or scheduled visit tied to a customer, location, optional equipment, and technician.
- **Job Status History**: Timestamped status changes and notes retained for operational visibility.
- **Weather Snapshot**: A time-stamped weather response associated with a service location and job.

## Implementation Priorities

- **P1 - Operational foundation**: Account registration and sign-in; authorization; customer CRUD;
  customer-associated equipment CRUD; job creation, assignment, status updates, completion, validation,
  and responsive accessible core screens.
- **P2 - Daily efficiency**: Job search and combined filtering; bounded job lists; cloud weather lookup;
  weather loading, unavailable, and stale-data behavior.
- **P3 - Optional enhancements**: Saved filters, reminders, richer reporting, import/export, notifications,
  or other improvements only after P1 and P2 acceptance scenarios pass.

## Success Criteria

### Measurable Outcomes

- **SC-001**: At least 90% of new users complete registration and sign-in on their first attempt in usability testing.
- **SC-002**: An authenticated office user can create or update a customer, equipment record, or job in under 2 minutes
  when valid information is available.
- **SC-003**: At least 95% of tested unauthorized resource requests fail without revealing protected record details.
- **SC-004**: At least 90% of tested technicians can find their assigned jobs and update a job to completed without assistance.
- **SC-005**: At least 95% of job searches and combined filters show the correct first result set within 2 seconds for a team
  with 1,000 jobs under normal service conditions.
- **SC-006**: Weather is shown or an actionable unavailable state is shown within 5 seconds for at least 95% of valid requests.
- **SC-007**: All P1 workflows pass keyboard-only and 200% zoom acceptance testing without blocked primary actions.
- **SC-008**: Every P1 and P2 workflow has verified loading, empty, validation-error, request-error, and authorization states.

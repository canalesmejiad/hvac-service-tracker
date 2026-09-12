<!--
Sync Impact Report

- Initial constitution created as version 1.0.0.
- Added five core principles and project governance rules.
- Updated the Spec-Kit plan, specification, and task templates.
-->

# HVAC Service Tracker Constitution

## Core Principles

### I. Type-Safe Product Code

All application code MUST use TypeScript with `strict` mode enabled. The codebase MUST NOT
use `any`; unknown external data MUST be narrowed or validated before use. Components,
services, and domain types MUST expose clear, minimal contracts. This prevents runtime
ambiguity in workflows involving customers, equipment, jobs, and weather data.

### II. Route- and Component-Oriented Design

The product MUST use Next.js App Router file-based routing. Routes belong in the `app/`
tree, and reusable UI or domain behavior MUST be extracted into appropriately named
components or modules rather than duplicated across pages. Tailwind CSS utilities MUST be
the primary styling mechanism; new global CSS is reserved for tokens, base styles, and
cross-cutting rules. This keeps navigation predictable and features composable.

### III. Tested, Reviewable Delivery

Every feature MUST define independently testable acceptance scenarios. Tests MUST cover
critical user journeys, validation, error states, and security-sensitive behavior at the
lowest practical level, with integration or end-to-end coverage when multiple boundaries
interact. A pull request MUST pass type checking, linting, the applicable test suite, and
the production build before merge. Reviewers MUST verify behavior against the feature
specification, not only code style.

### IV. Accessible and Secure by Default

All interactive workflows MUST be keyboard usable, semantically structured, visibly
focused, and compatible with assistive technology. Form controls MUST have labels and
clear validation or error feedback; color MUST NOT be the sole means of conveying state.
User input and external API responses MUST be validated, secrets MUST remain in server-side
environment configuration, and authorization, CSRF, injection, and unsafe URL risks MUST
be considered at each data boundary. The application MUST avoid exposing sensitive
customer or service information unnecessarily.

### V. Fast, Focused, and Maintainable Experiences

Features MUST preserve responsive interaction and avoid unnecessary client JavaScript,
network requests, re-renders, and unbounded data loading. Server components are preferred
unless client state or browser APIs require otherwise. Loading, empty, and failure states
MUST be intentional and accessible. Naming MUST use PascalCase for React components and
types, camelCase for variables and functions, and kebab-case for route segments and file
names where the framework permits it. Simpler designs are preferred until measurable
requirements justify added abstraction.

## Technology and Quality Constraints

The required stack is Next.js with the App Router, TypeScript, Tailwind CSS, and ESLint.
The TypeScript compiler MUST retain `strict: true`, and lint configuration MUST remain
active for all application code. Feature plans MUST document data boundaries, accessibility
impact, security considerations, performance expectations, and the tests that prove the
acceptance scenarios. Performance-sensitive choices MUST be justified with a measurable
goal such as response time, rendered list size, or request count.

## Delivery and Collaboration

Work MUST be developed on a dedicated Git feature branch and submitted through a pull
request. Pull requests MUST describe the user-visible change, testing performed, risks,
and any follow-up work. At least one other team member MUST review changes before merge
when another reviewer is available; the author remains responsible for resolving review
feedback and keeping the branch current. Commits and code comments MUST communicate
intent, and contributors MUST coordinate ownership when changes touch shared routes,
components, data contracts, or configuration.

## Governance

This constitution supersedes conflicting project conventions. Amendments MUST be proposed
in a pull request with the rationale, affected artifacts, migration or adoption notes, and
an updated Sync Impact Report. Versioning follows semantic rules: MAJOR for incompatible
principle changes or removals, MINOR for new principles or materially expanded obligations,
and PATCH for clarifications that do not change obligations. Every feature plan MUST
include a Constitution Check, and reviewers MUST verify compliance before approval.
Periodic compliance review MUST include the current stack, compiler and lint settings,
test coverage for critical journeys, accessibility, security boundaries, and performance
regressions.

**Version**: 1.0.0 | **Ratified**: 2026-09-12 | **Last Amended**: 2026-09-12

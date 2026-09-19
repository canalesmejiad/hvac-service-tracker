# GitHub Copilot Instructions — HVAC Service Tracker

## Project purpose

HVAC Service Tracker is a web application for small HVAC service teams. It manages users, customers, equipment, service jobs, technician assignments, job status history, search, pagination, and service-location weather information.

## Technology stack

- Next.js with the App Router
- TypeScript
- React
- Tailwind CSS
- PostgreSQL
- Server-side authentication

## Development conventions

- Use TypeScript for all application code.
- Keep TypeScript strict and avoid `any`.
- Use Server Components by default.
- Add `"use client"` only when browser APIs, state, or event handlers are required.
- Keep components small, reusable, and clearly named.
- Place reusable UI components in the `components` directory.
- Use descriptive names for variables, functions, files, and database fields.
- Follow the existing project structure and formatting conventions.

## Data and security

- Validate all user input on the server.
- Never expose database credentials, API keys, password hashes, or secrets to the client.
- Store passwords only as secure hashes.
- Restrict application data by `team_id`.
- Verify authentication and authorization before protected operations.
- Preserve service-job history when customers, users, or equipment are deactivated.
- Use parameterized database queries or a trusted ORM.
- Keep environment variables in local environment files that are excluded from Git.

## User interface

- Follow the design system in `docs/architecture-and-design.md`.
- Use accessible labels for form controls.
- Support keyboard navigation.
- Provide visible focus states.
- Do not communicate status using color alone.
- Include loading, empty, success, and error states.
- Make pages responsive for desktop and mobile screens.

## Quality requirements

- Run linting before committing changes.
- Resolve TypeScript errors before opening a pull request.
- Test authentication and authorization boundaries.
- Test form validation and error handling.
- Keep commits focused and use descriptive commit messages.
- Update documentation when architecture or data-model decisions change.
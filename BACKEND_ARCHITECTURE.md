# Recommended Backend Architecture

## Recommendation

Use **Node.js with NestJS, PostgreSQL, and Prisma ORM** for the production backend.

This is a good fit because:

- The frontend already uses JavaScript, so the team can use TypeScript across the full system.
- NestJS provides a structured module system, authentication guards, validation, and testable services.
- PostgreSQL is reliable for related institutional data such as staff, students, classes, enrollment, attendance, scores, and certificates.
- Prisma provides typed database access and clear migrations.
- Role and permission checks can be implemented centrally and enforced on every protected API route.
- Audit history and certificate verification are easier to model safely in a relational database.

Supabase is a good option for a fast proof of concept, but this project contains sensitive institutional records, detailed role boundaries, and audit requirements. A controlled NestJS API is the recommended long-term option.

## Suggested production stack

| Layer | Technology |
|---|---|
| Public and portal frontend | HTML, Tailwind CSS, JavaScript with Vite |
| Backend API | Node.js + NestJS + TypeScript |
| Database | PostgreSQL |
| Database access | Prisma ORM |
| Staff authentication | Secure server sessions with HTTP-only cookies |
| Two-factor authentication | TOTP authenticator application |
| File storage | Private S3-compatible object storage |
| Email | Transactional email provider for password resets |
| Deployment | Docker containers behind an HTTPS reverse proxy |

## Required backend modules

- Authentication and session management
- Staff accounts
- Roles and permissions
- HR employee records
- Students
- Programs, classes, and schedules
- Enrollment
- Attendance
- Scores
- Certificates and diploma verification
- Public announcements
- Reports and exports
- System settings
- Audit and activity history
- Backups and operational monitoring

## Role enforcement

The account role is stored in the database. Users never select a role during login.

After authentication:

1. The backend creates a secure session.
2. The frontend requests the current staff profile from `/api/auth/me`.
3. The API returns the user's name, role, and allowed permissions.
4. The frontend renders the correct dashboard.
5. Every API request independently checks the session and required permission.

Frontend redirection and hidden menu items are not security controls. The backend must reject unauthorized actions.

## Example permission boundaries

- HR: teacher and staff employment records, employee attendance, leave, HR documents, and HR reports.
- Admin: students, classes, schedules, enrollment, academic attendance, scores, certificates, announcements, and academic reports.
- IT: staff accounts, role assignment, permissions, system configuration, security logs, and backup status.

IT support access should not automatically allow modification of HR or academic records.

## Suggested API routes

```text
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/forgot-password
GET    /api/auth/me

GET    /api/public/schedule
GET    /api/public/announcements
POST   /api/public/diplomas/verify
POST   /api/public/contact

GET    /api/hr/employees
GET    /api/hr/leave-requests

GET    /api/admin/students
GET    /api/admin/classes
GET    /api/admin/enrollments
GET    /api/admin/certificates

GET    /api/it/accounts
PATCH  /api/it/accounts/:id/status
GET    /api/it/security-logs
GET    /api/it/backups/status
```

## Security requirements

- Hash passwords with Argon2id.
- Store sessions in secure, HTTP-only, same-site cookies.
- Require HTTPS in production.
- Add CSRF protection to state-changing requests.
- Rate-limit login, password reset, diploma verification, and contact endpoints.
- Require two-factor authentication for IT and preferably all portal users.
- Validate every request body on the server.
- Use parameterized database queries through Prisma.
- Record account, permission, score, attendance, certificate, and publishing changes in an append-only audit log.
- Never store secrets in frontend JavaScript or source control.
- Encrypt sensitive backups and test recovery regularly.

## Prototype warning

The current frontend uses local JavaScript demo accounts and `localStorage` only to demonstrate role redirection. This is not production authentication. Replace it with the server authentication flow before using real institutional data.

# Public Website and Staff Portal Specification

## 1. Project Overview

The system will have two separate user experiences:

1. **Public website** — available to everyone without an account.
2. **Staff portal** — available only to authorized HR, Admin, and IT users.

Suggested addresses:

- Public website: `www.institution.com`
- Staff portal: `portal.institution.com`

The public website will not display a login button or a link to the staff portal. Authorized staff will receive the portal address directly and may bookmark it.

The public website and staff portal may use the same backend and database, but public and protected information must remain clearly separated.

---

## 2. Public Website

### 2.1 Purpose

The public website will present approved information about the institution. Visitors will not need to register or log in.

The design should be:

- Professional and easy to understand
- Responsive on desktop, tablet, and mobile devices
- Fast and accessible
- Available in the institution's required languages
- Consistent with the institution's branding

### 2.2 Public Header

The header will contain:

- Institution logo and name
- Home
- About
- Schedule
- Announcements
- Diploma Verification
- Contact

On mobile devices, the navigation links will appear inside a hamburger menu.

The header and footer will not contain a staff login button.

### 2.3 Home Page

The home page will contain the following sections:

#### Hero Section

- Institution name
- Short slogan or introduction
- Approved institution or classroom image
- **About Us** button
- **Contact Us** button

#### About Summary

- Short description of the institution
- Mission and educational goals
- Link to the complete About page

#### Why Choose Us

Possible items include:

- Qualified instructors
- Recognized certificates
- Practical education
- Modern learning environment
- Flexible schedules

#### Diploma Verification

- Diploma serial-code input
- Verification button
- Clear valid, invalid, or not-found result

#### Contact Summary

- Public address
- Telephone number
- Email address
- Working hours
- Map or directions

The home page will not include featured courses, teacher profiles, upcoming classes, or a latest-announcements section.

### 2.4 About Page

The About page may contain:

- Institution history
- Mission and vision
- Educational objectives
- Accreditations or registrations
- Facilities
- Achievements
- Message from the institution's director

Only information approved for public viewing will be published.

### 2.5 Public Schedule Page

The schedule page may display:

- Class or program name
- Day of the week
- Starting and ending times
- Start date
- Registration or availability status

It must not display:

- Student names
- Attendance records
- Private room or security information
- Internal notes
- Staff-only scheduling information

### 2.6 Announcements Page

The Announcements page may include:

- General notices
- Enrollment notices
- Examination notices
- Holidays
- Events
- Other approved institutional news

Announcements will support at least these states:

- Draft
- Published
- Archived

Only published announcements will appear on the public website.

### 2.7 Diploma Verification Page

Visitors will verify a diploma by entering its serial or verification code.

For a valid diploma, the system may display:

- Verification status
- Certificate or diploma number
- Student name, only if legally and institutionally approved
- Program or qualification name
- Issue date
- Institution name

For an invalid code, the website will display a simple message such as **Certificate not found**.

Security requirements:

- Use long, unpredictable verification codes
- Apply rate limiting to verification requests
- Display only the minimum required personal information
- Do not allow visitors to browse or search all student records
- Record suspicious or excessive verification attempts

### 2.8 Contact Page

The Contact page will contain:

- Institution address
- Public telephone numbers
- Public email address
- Office hours
- Map
- Contact form
- Approved social-media links

The contact form should include input validation and spam protection.

### 2.9 Public Footer

The footer may contain:

- Institution logo and short description
- Quick navigation links
- Contact information
- Social-media links
- Privacy policy
- Terms and conditions
- Copyright notice

The staff portal address will not be shown in the footer.

---

## 3. Staff Portal

### 3.1 Purpose

The staff portal is a private management system for authorized employees. It will support exactly three roles:

- HR
- Admin
- IT

There will be no public registration. Staff accounts will be created, assigned, disabled, and maintained by authorized personnel.

### 3.2 Login Page

All staff will use the same login page at `portal.institution.com`.

The login page will contain:

- Institution logo and portal name
- Username or work email field
- Password field
- Sign-in button
- Forgot-password option
- Two-factor authentication step when enabled

The login page will not ask the user to select HR, Admin, or IT. A user's role will be stored in the system and checked after successful authentication.

### 3.3 Role-Based Redirection

After a successful login, the server will redirect the user according to the role stored on the account:

- HR user -> HR Dashboard
- Admin user -> Administration Dashboard
- IT user -> IT Dashboard

Redirection is for navigation only. Every protected page, API, and operation must also perform server-side permission checks.

### 3.4 HR Dashboard

HR users may access approved human-resource functions, including:

- Teacher records
- Staff records
- Employee contact and employment information
- Employee attendance
- Leave and absence records
- Employment status
- HR documents
- HR reports
- HR-related activity history

HR users should not automatically receive access to:

- Student academic records
- Student scores
- Certificate management
- System configuration
- User roles and technical permissions
- Backups or technical logs

### 3.5 Administration Dashboard

Admin users may access approved academic and operational functions, including:

- Student management
- Courses and programs
- Classes
- Schedules
- Enrollment
- Student attendance
- Scores and results
- Certificates and diplomas
- Public announcements
- Academic and operational reports
- Relevant activity history

Admin users can create and update public schedules and announcements. Only content marked as published will appear on the public website.

Admin users should not automatically receive access to:

- Employee salaries or confidential HR documents
- Server configuration
- Backups
- Security configuration
- Technical system logs
- Role or permission changes reserved for IT

### 3.6 IT Dashboard

IT users may access approved technical functions, including:

- Staff user accounts
- Role assignment
- Permission management
- Account activation and disabling
- Password-reset assistance
- Two-factor authentication management
- System settings
- Security and login logs
- Audit and activity history
- Backup status and recovery tools
- Technical monitoring and maintenance

IT access to academic or HR data should be limited to what is necessary for support and maintenance. Sensitive record changes should require the appropriate HR or Admin user whenever possible.

### 3.7 Permission Summary

| Function | HR | Admin | IT |
|---|:---:|:---:|:---:|
| Teacher and staff employment records | Yes | Limited | Support only |
| Employee attendance and leave | Yes | No | Support only |
| Student management | No | Yes | Support only |
| Courses, classes, and schedules | No | Yes | Support only |
| Enrollment | No | Yes | Support only |
| Student scores and attendance | No | Yes | Support only |
| Certificates and diplomas | No | Yes | Support only |
| Public announcements | No | Yes | Support only |
| HR reports | Yes | No | Support only |
| Academic reports | No | Yes | Support only |
| Staff user accounts | No | No | Yes |
| Roles and permissions | No | No | Yes |
| System settings and technical logs | No | No | Yes |
| Relevant activity history | Yes | Yes | Yes |

`Limited` and `Support only` permissions must be defined precisely during implementation. Support access should not give IT unrestricted permission to change institutional records.

### 3.8 Dashboard Navigation

After login, the sidebar or navigation menu will show only functions permitted for the current user. A user must not see inaccessible modules.

Hiding a menu item is not sufficient security. The server must reject every unauthorized request even if someone manually enters a protected address.

### 3.9 Account Management

- No public account registration
- Accounts created only for authorized staff
- Exactly one primary role assigned to each account unless a future requirement explicitly allows more
- Roles cannot be selected or changed by users themselves
- Accounts can be activated, suspended, or disabled
- Staff who leave the institution must have their access disabled promptly
- Password resets must use a secure, time-limited process
- Account and role changes must be recorded in the audit history

### 3.10 Security Requirements

The portal must include:

- Secure password hashing
- Strong password requirements
- Two-factor authentication, preferably required for IT and other privileged users
- Rate limiting and temporary lockout for repeated failed logins
- Secure, expiring sessions
- Automatic logout after an approved period of inactivity
- CSRF, XSS, SQL injection, and common web-attack protection
- HTTPS for the public website and staff portal
- Server-side role and permission validation
- Audit logs for important actions
- Secure backup and recovery procedures
- Minimum necessary access to personal information

### 3.11 Activity History

The system should record important actions, including:

- Successful and failed login attempts
- Account creation, disabling, and role changes
- Student-record changes
- Score and attendance changes
- Certificate creation, editing, and cancellation
- Announcement publishing and removal
- HR-record changes
- System-setting changes
- Data exports

Each activity record should contain:

- User who performed the action
- Action performed
- Date and time
- Affected record
- Relevant before-and-after information where appropriate
- IP address or device information when legally permitted

Audit records should not be editable by ordinary HR or Admin users.

---

## 4. Shared System Behaviour

### 4.1 Public and Private Data

Every record that may appear publicly must have a clear publication status. Private records must never become public automatically.

Examples:

- A draft announcement remains visible only in the staff portal.
- A published announcement appears on the public website.
- A staff schedule may contain internal details, while the public schedule contains only approved fields.
- A diploma record contains complete internal information, while public verification displays only approved fields.

### 4.2 Responsive Design

Both the public website and staff portal must work on desktop, tablet, and mobile devices. The staff portal should use mobile-friendly forms and tables, not only a collapsed desktop layout.

### 4.3 Language and Date Support

The interface supports English in left-to-right mode and Dari in right-to-left mode. The language choice persists across the public website and staff portal. Production date formatting should use the approved Afghanistan time zone and calendar conventions.

### 4.4 Error Handling

The system should display clear messages without exposing technical or sensitive details.

Examples:

- Invalid login: **The username or password is incorrect.**
- Unauthorized access: **You do not have permission to access this page.**
- Invalid diploma code: **Certificate not found.**
- System problem: **The service is temporarily unavailable. Please try again later.**

---

## 5. Final Site Structure

### Public Website

```text
Home
├── About
├── Schedule
├── Announcements
├── Diploma Verification
└── Contact
```

### Staff Portal

```text
Staff Login
├── HR Dashboard
├── Administration Dashboard
└── IT Dashboard
```

The public website contains no login link. HR, Admin, and IT users access the staff portal through its separate address.

---

## 6. Items to Confirm Before Development

- Institution name, logo, colors, and languages
- Exact public diploma information
- Exact HR, Admin, and IT permission boundaries
- Whether two-factor authentication is required for all staff
- Public schedule fields
- Announcement approval process
- Required reports and export formats
- Data-retention and privacy requirements
- Backup schedule and recovery responsibility
- Hosting domain and portal subdomain

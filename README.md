# Sepidan Organization Website and Staff Portal

Responsive public website and a separate role-based staff portal for Sepidan Organization.

## Included

- Public Home, About, Schedule, Announcements, Diploma Verification, and Contact pages
- Sepidan Organization’s official name, logo, tagline, public organization details, email, location, WhatsApp number, and activity summaries
- Accessible infinite program-area marquee on the homepage
- English and Dari language switching with automatic LTR/RTL layout
- Locally bundled 29LT Zarid Slab font family for both scripts
- No public login link
- Separate `portal.html` login for exactly three roles: Admin, HR, and IT
- Automatic role-based dashboard rendering
- Responsive public navigation and mobile dashboard sidebar
- Tailwind CSS as the primary design system and vanilla JavaScript for prototype interactions

## Quick local preview

```powershell
python -m http.server 4173
```

Open `http://127.0.0.1:4173/index.html`.

The website uses the compiled `styles.css` file and does not require Tailwind’s development CDN at runtime.

You can also open `index.html` directly for a quick check. All scripts and links are compatible with both `file://` previews and repository-relative GitHub Pages URLs.

## Publish with GitHub Pages

1. Create a GitHub repository and upload the contents of this folder so `index.html` is at the repository root.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then save.
5. Open the URL GitHub provides, usually `https://USERNAME.github.io/REPOSITORY/`.

The site uses repository-relative paths, so it works from a GitHub Pages project subdirectory. The included `.nojekyll` file tells GitHub to publish the static files without Jekyll processing.

After changing Tailwind classes or `src/input.css`, rebuild the production stylesheet before pushing:

```powershell
npm.cmd install
npm.cmd run css:build
```

> GitHub Pages can host the public website and the current staff-portal demonstration, but it cannot provide secure staff authentication or a private database. Real Admin, HR, and IT accounts require the backend described below; do not store production passwords or confidential records in this repository.

## Compiled Tailwind development

```powershell
npm.cmd install
npm.cmd run dev
```

## Demo staff accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@demo.sepidan` | `Admin123!` |
| HR | `hr@demo.sepidan` | `Hr123!` |
| IT | `it@demo.sepidan` | `It123!` |

These are local prototype credentials only. The dashboard also contains clearly labeled sample operational data.

## Production backend

See `BACKEND_ARCHITECTURE.md`. The recommended production stack is NestJS, PostgreSQL, and Prisma. Replace the local demo login, certificate record, and dashboard data with protected server APIs before using real accounts or records.

## Public information source

Organization information is based on Sepidan Organization’s official LinkedIn presence: <https://www.linkedin.com/company/sepidan-organization/>.

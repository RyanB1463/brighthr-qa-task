- **Node.js 18+** (Node 20 recommended)
- **npm**

## Setup (local)

1. Install dependencies: `npm install`
2. Install Playwright browsers: `npx playwright install`
3. Create a local `.env` file:
   - Copy `.env.example` to `.env`
   - Fill in your values:

     ```
     BASE_URL=https://sandbox-app.brighthr.com
     BRIGHTHR_EMAIL=your-email@example.com
     BRIGHTHR_PASSWORD=your-password
     ```

   - Note: `.env` is gitignored on purpose.

## Running tests

- **Headless (default):** `npm test`
- **Headed (see the browser):** `npm run test:headed`
- **Playwright UI mode:** `npm run test:ui`
- **Debug mode:** `npm run test:debug`
- **Open the HTML report:** `npm run test:report`

## How login works (storageState)

Login happens once in `tests/global.setup.ts`:

- opens `${BASE_URL}/login`
- logs in using `BRIGHTHR_EMAIL` / `BRIGHTHR_PASSWORD`
- saves the session to `.auth/storageState.json`

The suite then reuses that session automatically via `playwright.config.ts` so tests start logged in.

If auth gets out of sync locally, delete: `.auth/storageState.json` and rerun tests.

## Project structure

- tests/ Test specs + global setup (storageState)
- pages/ Page objects (login + employees)
- utils/ Env loading + test data generation
- .github/orkflows/ CI workflow

## CI (GitHub Actions)

- **Workflow file:** `.github/workflows/e2e.yml`

To run in GitHub Actions, add these repository secrets:

- `BASE_URL`
- `BRIGHTHR_EMAIL`
- `BRIGHTHR_PASSWORD`

The workflow installs dependencies and Playwright browsers, runs tests headless, and uploads:

- `playwright-report` (HTML report)
- `test-results` (screenshots/traces/videos depending on config)
with open("playwright_setup_guide.md", "w") as file:
    file.write(content)

# ELabVault

ELabVault is a static C programming practice companion. Browse questions by level and concept, search the question bank, filter questions with saved solutions, and open individual problem pages with sample test cases and explanations.

## Features

- C programming questions grouped by level and concept
- Search across question descriptions and concepts
- Level, concept, and solved-question filters
- Individual question pages with solutions, explanations, and sample cases
- Community solution contributions with contributor attribution
- Copyable solution code
- Static export for GitHub Pages, including a page for every question
- Contact links for GitHub, Instagram, and Telegram

## Tech Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Question data stored in `questions.json`

## Run Locally

Requirements: Node.js 22 or later and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
```

The build creates a static site in `out/`. To test the exported files locally, serve that directory with any static file server. `npm start` runs the Next.js server and is not used for the GitHub Pages export.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys the site when code is pushed to `main` or `master`.

1. Create a public GitHub repository. For a project site, a name such as `elabvault` works.
2. Push this project to the repository's `main` branch.
3. In the repository, open **Settings → Pages** and set the source to **GitHub Actions**.
4. Wait for the **Deploy to GitHub Pages** workflow to complete. A project site is published at `https://<username>.github.io/<repository>/`.

The build detects `GITHUB_REPOSITORY` and adds the repository name as the base path for project sites. A repository named `<username>.github.io` is treated as a user site and uses the root path. To use a custom domain with a project repository, set `NEXT_BASE_PATH` to an empty string in the workflow build environment.

## Community Contributions

ELabVault welcomes student-contributed solutions for questions that do not yet have answers. Contact the maintainer on [Telegram](https://t.me/walker_web) and include the question ID or title, course and subject, complete solution, and the name you would like displayed. College and year are optional.

Every submission is reviewed manually. Submissions are not published automatically; only solutions reviewed and approved by the maintainer are added to the site. Published solutions display contributor attribution near the answer. Contributions must be original work or material the contributor is authorized to share.

The optional `contributed_solutions` field supports multiple credited solutions on a question without changing its existing `saved_code` data:

```json
{
	"contributed_solutions": [
		{
			"solution": "<complete approved solution>",
			"contributor": {
				"name": "<preferred display name>",
				"credit": "Solution Contributor"
			},
			"verified": true
		}
	]
}
```

Set `verified` to `true` only after the maintainer has reviewed and approved that solution; entries without `verified: true` are not shown on public pages. Existing questions without this optional field continue to use `saved_code` and do not display contributor credit or a verification label.

## Contributors

This section will list contributors and the questions or topics they helped answer as reviewed contributions are published. No community contributors are listed yet.

## Project Structure

```text
src/
	app/                 App Router pages, layout, and global styles
	components/          Question browser, detail view, and shared UI
	lib/questions.ts     Question normalization and lookup helpers
questions.json         Source question bank
.github/workflows/     GitHub Pages deployment workflow
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create the production static export in `out/` |
| `npm run lint` | Run ESLint |

## Contact

- GitHub: [@bhuvii16](https://github.com/bhuvii16)
- Instagram: [@bhuvii0716](https://www.instagram.com/bhuvii0716/)
- Telegram: [@walker_web](https://t.me/walker_web)

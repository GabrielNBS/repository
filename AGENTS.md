# Repository Guidelines

## Project Structure & Module Organization
This repository is a small Next.js portfolio app using the App Router. Main routes and shared entry files live in `app/` (`page.tsx`, `layout.tsx`, `globals.css`). Dynamic project pages live under `app/projects/[slug]/`. Structured content is kept in `data/` (`cards.ts`, `projects.ts`). Static assets such as fonts, screenshots, and mockups live in `public/`. Build and framework configuration is in `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, and `.prettierrc`.

## Design System Priority
Always follow this order before creating or changing UI: `DESIGN.md`, `styles.json`, provided screenshots/images, existing design system, reusable components, then external inspiration. Use external references only to improve hierarchy, spacing, rhythm, interaction quality, or responsiveness; never let them override the portfolio identity.

## UI Implementation Rules
Use reusable components and shared tokens whenever practical. Avoid hardcoded one-off CSS when a token, CSS variable, utility class, or existing component pattern fits. Keep the portfolio visually consistent, responsive across mobile/tablet/desktop, and aligned with the current minimal premium direction.

Reduce unnecessary copy in headings, descriptions, cards, and buttons. Prefer clear labels such as `Ver projetos`, `Contato`, `Ver projeto`, `Deploy`, `Codigo`, and `Voltar`. Preserve the portfolio identity: clean neutrals, precise spacing, thin dividers, restrained project accents, and subtle Japanese influence through `Ma`, shoji-like modular rhythm, wabi-sabi restraint, and small ensō-inspired details.

Do not add decorative kanji, temples, samurai, anime/cartoon styling, random ornaments, excessive glow, noisy gradients, cluttered cards, or visual effects without a product reason. Cards should stay at 8px border radius or less unless the design system changes.

## Build, Test, and Development Commands
- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local dev server with Turbopack.
- `npm run build`: create a production build and catch compile-time issues.
- `npm run start`: serve the production build locally.
- `npm run lint .`: run ESLint across the repository.

Run commands from `C:\Projetos\repository`.

## Coding Style & Naming Conventions
Use TypeScript with `strict` mode expectations and the `@/*` path alias defined in `tsconfig.json`. Formatting is enforced by `.editorconfig` and Prettier: 2-space indentation, LF line endings, single quotes, semicolons, no trailing commas, and `printWidth` 100. Keep React components in PascalCase, route files in Next.js defaults such as `page.tsx` and `layout.tsx`, and data/config modules in concise camelCase names like `projects.ts`.

## Testing Guidelines
There is no committed test suite yet. Until one is added, use `npm run build` and `npm run lint .` as the minimum verification before opening a PR. For UI changes, visually validate desktop and mobile layouts in the browser, including alignment, spacing, hierarchy, project pages, hover/focus states, and responsive galleries. If you add tests, place them next to the feature or under a dedicated `__tests__/` folder and name them `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines
Recent history favors short, imperative commit subjects with prefixes such as `feat:`, `refactor:`, and `chore:`. Keep commits focused and descriptive, for example `feat: add responsive project gallery`. Pull requests should include a brief summary, note any UI-visible changes, list validation steps, and attach screenshots for layout or animation changes.

## Security & Configuration Tips
Do not commit secrets or environment-specific tokens. Treat `.next/` and other generated output as disposable build artifacts, and keep large media additions optimized before placing them in `public/`.

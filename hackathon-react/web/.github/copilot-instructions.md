# Copilot Instructions for AI Coding Agents

## Project Overview
This is a React + TypeScript web application for INNOVA HACK 2025, a 24-hour hackathon organized by VVIT IUCEE Student Chapter. The app uses Vite for bundling and Tailwind CSS for styling, with a focus on component-driven development and responsive design.

## Key Architecture & Patterns
- **Entry Point:** `src/main.tsx` bootstraps the app, rendering `App.tsx`.
- **Pages:** Main page is `src/pages/Home.tsx` containing all sections (Hero, About, Tracks, Schedule, etc.).
- **Components:**
  - Shared UI components are in `src/components/ui/` including:
    - `FaqAccordion.tsx` - Expandable FAQ items
    - `Timeline.tsx` & `TimelineItem.tsx` - Event schedule display
    - `MobileMenu.tsx` - Mobile navigation menu
    - `NavLink.tsx` - Navigation links with hover effects
    - `Reveal.tsx` - Animation wrapper for scroll reveals
  - `src/components/index.ts` and `src/components/ui/index.ts` re-export components for easier imports.
- **Styling:** Tailwind CSS with custom animations and responsive design patterns.
- **Types:** Shared TypeScript types are in `src/types/`.

## Developer Workflows
- **Install dependencies:**
  ```sh
  npm install
  ```
- **Start development server:**
  ```sh
  npm start
  ```
- **Build for production:**
  ```sh
  npm run build
  ```
- **Preview production build:**
  ```sh
  npm run serve
  ```
- **Lint code:**
  ```sh
  npm run lint
  ```
- **Run tests:**
  ```sh
  npm test
  ```

## Project-Specific Conventions
- **Component Structure:** Prefer functional components. Co-locate related files (styles, types) when possible.
- **Exports:** Use `index.ts` files for barrel exports in component folders.
- **Styling:** Use Tailwind utility classes in JSX. Avoid custom CSS unless necessary.
- **Type Safety:** Use TypeScript for all code. Place shared types in `src/types/`.

## Integration Points
- **Vite:** Handles bundling and dev server (`vite.config.ts`).
- **Tailwind CSS:** Configured in `tailwind.config.ts` and `postcss.config.cjs`.

## Current Content Structure
The Home page (`src/pages/Home.tsx`) contains:
- **Hero Section:** Title, tagline, dates, venue, and CTA buttons
- **About Section:** Event description and key details
- **Tracks Section:** Problem statements divided into CSE/Allied, ECE/EEE, and Open Innovation
- **Schedule Section:** Detailed 2-day timeline using Timeline components
- **Mentors/Judges Sections:** Placeholder content for event organizers
- **Prizes Section:** Cash prizes, swags, networking, and career opportunities
- **Partners Section:** Sponsor logos and partner information
- **FAQ Section:** Common questions using FaqAccordion components
- **Footer:** Copyright and contact information

## Examples
- To add a new track to the Tracks section, add an object to the array in `src/pages/Home.tsx` with `title`, `desc`, and `img` properties
- To update the schedule, modify the Timeline `items` array with new `date` and `title` properties
- To add a new FAQ, add an object with `q` (question) and `a` (answer) to the FAQ array
- To modify prizes, update the prizes array in the Rewards section with new `title` and `desc` properties

## References
- Entry: `src/main.tsx`, `App.tsx`
- Components: `src/components/ui/`
- Styles: `src/styles/globals.css`, `tailwind.config.ts`
- Types: `src/types/`

---

For questions about project structure or conventions, review this file and the referenced source files before making changes.

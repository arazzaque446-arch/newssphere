<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# NewsSphere AI Development Guide

## Project Overview

NewsSphere is an AI-powered news platform built using:

- Next.js 16
- React 19
- TypeScript
- Supabase
- Google Gemini
- Tailwind CSS

## Primary Goals

- Professional news website
- RSS aggregation
- AI article generation
- SEO optimization
- Fast performance

## Database

Main table:

articles

Never create duplicate tables.

Always reuse existing schema whenever possible.

## Current Status

See README.md

## Before Writing Code

1. Read README.md
2. Read CHANGELOG.md
3. Check current database schema
4. Preserve existing functionality
5. Make minimal safe changes

## Coding Rules

- Use TypeScript.
- Reuse existing components.
- Do not hardcode secrets.
- Follow existing project structure.
- Prefer Server Components when appropriate.
- Validate Supabase queries.
- Handle errors gracefully.

## Git Workflow

Never modify unrelated files.

Commit only completed features.

Keep commits focused.

## AI Rules

Never assume the database schema.

Never delete working code unless requested.

Explain major architectural changes before implementing them.
## Project-Specific Rules

- Always use the existing `articles` table.
- Never create duplicate Supabase tables.
- Never remove working features without explicit instruction.
- Reuse existing components whenever possible.
- Ask before making major architectural changes.
- Keep the UI responsive.
- Use TypeScript throughout the project.
- Follow the existing folder structure.
- Prefer small, focused commits.
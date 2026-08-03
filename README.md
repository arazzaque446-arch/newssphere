# 📰 NewsSphere

AI-powered modern news platform built with **Next.js**, **Supabase**, **Google Gemini AI**, and **Tailwind CSS**.

---

# Project Overview

NewsSphere is a full-stack news platform that automatically imports news from RSS feeds, allows administrators to manage articles, and uses AI to rewrite, summarize, and optimize content for SEO.

The long-term goal is to build a professional news portal with AI-assisted publishing, analytics, and mobile support.

---

# Tech Stack

## Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

## Backend
- Supabase

## Database
- PostgreSQL (Supabase)

## Authentication
- Supabase Auth

## AI
- Google Gemini API

## Deployment
- Vercel

---

# Features

## Public

- Homepage
- Category pages
- Latest News
- Trending News
- Search
- Responsive Design

## Admin

- Dashboard
- Create Articles
- Edit Articles
- Delete Articles
- Manage Categories
- Manage Comments
- Media Library
- Settings

## AI

- AI News Writer
- AI Rewrite
- AI Summary
- SEO Title Generator
- SEO Description Generator
- Keyword Generation

## RSS

- BBC
- Reuters
- The Hindu
- Additional feeds configurable

---

# Project Structure

```
app/
components/
lib/
public/
scripts/
types/
```

---

# Environment Variables

Create `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

GOOGLE_GENERATIVE_AI_API_KEY=
```

---

# Installation

Clone

```bash
git clone <repository-url>
```

Install

```bash
npm install
```

Run

```bash
npm run dev
```

Build

```bash
npm run build
```

---

# Database

Main table:

```
articles
```

Important columns

- id
- title
- slug
- summary
- content
- category
- image_url
- author
- tags
- seo_title
- seo_description
- status
- created_at
- updated_at

---

# Current Project Status

## Completed

- Next.js setup
- Supabase integration
- RSS feed configuration
- Admin Dashboard
- Categories
- AI Writer
- Comments
- Responsive layout

## Currently Working On

- Admin article editing
- Image upload improvements
- SEO optimization

## Planned

- Notifications
- User Profiles
- Bookmarks
- PWA
- Mobile App
- Dark Mode

---

# RSS Configuration

RSS feeds are located in

```
lib/rss/feeds.ts
```

---

# Deployment

Deploy using

- Vercel

---

# Git Workflow

Before coding

```bash
git pull
```

After completing work

```bash
git add .
git commit -m "Meaningful commit message"
git push
```

---

# Project Rules

- Do not create duplicate database tables.
- Avoid renaming existing database columns without a migration.
- Test before every commit.
- Push completed work to GitHub regularly.
- Update documentation after major changes.

---

# Known Issues

See `BUGS.md`

---

# Database Documentation

See `DATABASE.md`

---

# Changelog

See `CHANGELOG.md`

---

# Roadmap

- AI Journalist
- Multi-language support
- Push notifications
- Analytics dashboard
- Live news updates
- Mobile applications

---

# Current Task

**Update this section before each coding session.**

Example:

```
Implement Admin Article Editing
```

---

# AI Assistant Instructions

If continuing this project in a new ChatGPT conversation:

1. Read this README first.
2. Review the Current Task section.
3. Review CHANGELOG.md.
4. Do not change the database schema unless necessary.
5. Preserve existing functionality unless explicitly instructed otherwise.
6. Suggest the smallest safe change before large refactors.
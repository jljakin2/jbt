# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 personal website/blog for Jeff Builds Tech that combines content publishing (blog posts, tutorials) with interactive tools. The site uses the App Router with TypeScript, Tailwind CSS, and shadcn/ui components.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Route Structure

The app uses Next.js 14 App Router with route groups to organize different sections:

- **(main)/** - Main website routes
  - `/` - Homepage
  - `/blog` - Blog listing and individual posts at `/blog/[slug]`
  - `/tools` - Tools listing page

- **(tool)/** - Interactive tool applications
  - `/atomic-essay` - Essay writing tool with markdown editor and preview
  - `/daily-dollar` - Daily dollar tracking tool
  - `/v60` - V60 coffee brewing tool

- **(tutorials)/[topic]/[slug]** - Tutorial content system organized by topic

### Content Management

- **Blog Posts**: MDX files in `content/blog/` with frontmatter (title, publishedAt, tag, image, summary)
- **Tutorial Docs**: MDX files in `content/docs/` with navigation metadata (prevTitle, prevSlug, nextTitle, nextSlug, topicTitle, topicSlug)
- **MDX Utilities**: `components/mdx/utils.ts` provides `getBlogPosts()` and `getDocPages()` to read and parse MDX files
- **Custom MDX Components**: Located in `components/mdx/` for enhanced content rendering (image modals, videos, tables, etc.)

### State Management

- **Zustand** is used for client-side state management
- Example: `app/(tool)/atomic-essay/hooks/use-atomic-essay.tsx` uses Zustand to manage markdown content and word count

### Component Organization

- **UI Components**: `components/ui/` contains shadcn/ui components (configured via `components.json`)
- **Feature Components**: Top-level `components/` directory contains feature-specific components
- **Tool-Specific Components**: Each tool route has its own `components/` subdirectory (e.g., `app/(tool)/atomic-essay/components/`)

### Styling & Theming

- **Tailwind CSS** with custom design system in `tailwind.config.js` (custom font sizes, letter spacing, color tokens)
- **Dark mode** support via `next-themes` (provider in `app/theme-provider.tsx`)
- **CSS Variables** for theming - colors use HSL format with CSS custom properties
- **Path aliases**: `@/*` maps to root directory for clean imports

### API Routes

- `app/api/subscribe/` - Newsletter subscription endpoint
- `app/api/daily-dollar/` - Daily Dollar marketing exercise generator
  - Uses Claude (Anthropic) via Vercel AI SDK
  - Scrapes random marketing lessons from Marketing Examples website
  - Generates practical exercises based on article content
  - Returns JSON with exercise content and article metadata
  - Requires `ANTHROPIC_API_KEY` env var
  - Configured as dynamic route (not pre-rendered at build time)

## Key Technical Details

- **TypeScript** with strict mode enabled
- **Image Optimization**: Remote patterns configured for S3, Sanity, Medium, CloudFront, Giphy
- **MDX Support**: Configured with `@next/mdx` for both content files and page components
- **SEO**: Metadata API used for OpenGraph, canonical URLs, sitemaps, and robots.txt
- **Analytics**: Google Analytics integration via `@next/third-parties/google` (requires `GTAG` env var)
- **AI Integration**:
  - Vercel AI SDK (`ai` package) for unified AI provider interface
  - Claude (Anthropic) via `@ai-sdk/anthropic` for all AI features

## Environment Variables

Required in `.env.local`:
- `ANTHROPIC_API_KEY` - For Claude API integration (used by daily-dollar API)
- `GTAG` - Google Analytics tracking ID (optional)

## Content Authoring Guidelines

When creating blog posts in `content/blog/`:
- Use `.mdx` extension
- Include frontmatter with: title, tag, publishedAt (YYYY-MM-DD), image, summary
- Slug is derived from filename

When creating tutorial docs in `content/docs/`:
- Include frontmatter with: title, publishedAt, summary, topicTitle, topicSlug
- Add navigation metadata: prevTitle, prevSlug, nextTitle, nextSlug for sequential navigation

# 🌟 anandchowdhary.com

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

Personal website and portfolio of Anand Chowdhary, creative technologist and entrepreneur. Built with Next.js 15, TypeScript, and Tailwind CSS v4.

## 🚀 Features

### 📱 Core Sections

- **🏠 Homepage** - Overview with dynamic sections showcasing life events, work, and projects
- **📝 Blog** - Articles and thoughts organized by year
- **💼 Projects** - Portfolio of creative and technical projects with tag filtering
- **🌍 Travel** - Location history and travel experiences
- **📚 Books** - Reading list and book reviews
- **🎬 Videos** - Video content collection
- **📓 Notes** - Quick thoughts and observations
- **🎯 Now** - Current focus and activities
- **💻 Open Source** - GitHub repositories and contributions
- **📰 Press** - Media mentions and coverage
- **🗓️ Events** - Speaking engagements and appearances
- **🧬 Life** - Personal milestones and experiences
- **📦 Archive** - Historical content and past versions

### ⚡ Technical Features

- **🎨 View Transitions** - Smooth page transitions using Next.js experimental view transitions
- **🗺️ Interactive Maps** - MapLibre GL and Leaflet integration for location visualization
- **📊 Analytics** - Vercel Analytics integration for visitor insights
- **🔢 Number Animations** - Smooth number transitions with @number-flow/react
- **🌐 Internationalization** - Country and timezone support
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **🎭 Dynamic Content** - API-driven content management
- **🔍 SEO Optimized** - Metadata and sitemap generation

## 🛠️ Tech Stack

### 🎯 Framework & Language

- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.1** - UI library
- **TypeScript 5** - Type-safe JavaScript

### 💅 Styling & UI

- **Tailwind CSS v4** - Utility-first CSS framework
- **@tailwindcss/typography** - Beautiful typographic defaults
- **@tabler/icons-react** - Icon library
- **tailwind-scrollbar** - Custom scrollbar styling

### 🗺️ Maps & Visualization

- **MapLibre GL** - Open-source map rendering
- **Leaflet** - Interactive maps
- **React Leaflet** - React components for Leaflet

### 📝 Content Processing

- **Marked** - Markdown parser
- **marked-smartypants** - Smart typography for Markdown
- **@sindresorhus/slugify** - URL slug generation

### 🔧 Utilities

- **countries-list** - Country data and information
- **countries-and-timezones** - Timezone management
- **humanize-duration** - Human-readable time durations
- **rand-seed** - Seeded random number generation
- **@number-flow/react** - Animated number transitions

### 📊 Analytics & Monitoring

- **@vercel/analytics** - Web analytics

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js 18+
- npm or yarn package manager

### 💻 Installation

1. Clone the repository:

```bash
git clone https://github.com/AnandChowdhary/anandchowdhary.com.git
cd anandchowdhary.com
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Available Scripts

- **`npm run dev`** - Start development server with Turbopack
- **`npm run build`** - Build for production
- **`npm run start`** - Start production server
- **`npm run lint`** - Run ESLint

## 📁 Project Structure

```
anandchowdhary.com/
├── app/                    # Next.js App Router
│   ├── components/         # Reusable React components
│   ├── blog/              # Blog section pages
│   ├── projects/          # Projects section with tags
│   ├── events/            # Events and speaking
│   ├── books/             # Book reviews and reading list
│   ├── notes/             # Quick notes and thoughts
│   ├── open-source/       # GitHub repositories
│   ├── life/              # Life events and milestones
│   ├── location/          # Travel and location history
│   ├── videos/            # Video content
│   ├── press/             # Media mentions
│   ├── archive/           # Historical content
│   ├── api/               # API routes
│   ├── api.ts             # API utilities
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── public/                # Static assets
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 🎨 Components Architecture

The site uses a modular component architecture with specialized sections:

- **Timeline Components** - Display various life events (birthday, code, fitness, location, music, sleep, theme)
- **Section Components** - Reusable sections for different content types (blog, books, projects, etc.)
- **Navigation Components** - Header, footer, and navigation links
- **Metadata Components** - Dynamic metadata generation for SEO

## 🔄 API Structure

The project includes API routes for:

- `/api/blog/` - Blog post data
- `/api/projects/` - Project information and filtering

## 🌐 Deployment

The site is optimized for deployment on Vercel:

```bash
npm run build
```

The build process:

1. Compiles TypeScript
2. Optimizes React components
3. Generates static pages where possible
4. Creates optimized production bundle

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
🐾 Maintained with love by Clawdia

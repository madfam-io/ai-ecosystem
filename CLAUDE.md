# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website that presents "The State of the AI Ecosystem: A Comprehensive Report for August 2025". The site is built with vanilla HTML, CSS, and JavaScript, generated from the research document `RESEARCH.md`.

## Architecture & Structure

**Core Files:**
- `RESEARCH.md` - Source document containing all research content and data (single source of truth)
- `index.html` - Main HTML structure with semantic markup for the entire report
- `style.css` - Responsive CSS styling with mobile-first approach
- `scripts.js` - Vanilla JavaScript for interactivity (no external frameworks)

**Key Features:**
- Responsive design using Flexbox and media queries
- Sticky sidebar navigation with smooth scrolling
- Active section highlighting based on scroll position
- Interactive accordion-style glossary
- Mobile hamburger menu toggle
- Scroll-to-top functionality

## Development Commands

**Viewing the site:**
```bash
# Open directly in browser
open index.html
# Or serve locally (if you have a simple server)
python3 -m http.server 8000
```

**No build process** - This is a static site with no compilation or bundling required.

## Architecture Patterns

**CSS Architecture:**
- Mobile-first responsive design
- Flexbox-based layout system
- CSS custom properties for theming
- Modular component-based styling

**JavaScript Architecture:**
- Vanilla ES6+ JavaScript with no dependencies
- Event-driven architecture using `addEventListener`
- Modular functions for specific features
- DOM manipulation through standard APIs

**Content Architecture:**
- Content sourced from `RESEARCH.md` markdown file
- Glossary data embedded in JavaScript objects
- Section-based navigation structure
- Semantic HTML5 elements for accessibility

## Key Implementation Details

**Navigation System:**
- Uses `IntersectionObserver` API for scroll-spy functionality
- Smooth scrolling via `scrollIntoView()` with `behavior: 'smooth'`

**Interactive Elements:**
- Glossary accordion using CSS classes and click handlers
- Mobile menu toggle with CSS class manipulation
- Scroll-to-top button with scroll position detection

**Styling Approach:**
- Inter font family from Google Fonts
- Professional blue color scheme (#002349 primary)
- Responsive breakpoints for tablet and mobile
- CSS Grid for glossary layout, Flexbox for main layout

## Content Management

When updating content:
1. Modify `RESEARCH.md` for text changes
2. Update glossary data in `scripts.js` glossaryData object
3. Adjust HTML structure in `index.html` if needed
4. No build step required - changes are immediately reflected
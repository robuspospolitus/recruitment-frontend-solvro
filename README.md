# Cocktails Browser App

A modern, responsive web application for exploring cocktails, built with a focus on usability, clean design, and performance. The app allows users to browse, search, and discover cocktails, view detailed ingredient information, and save their favorites for quick access.

## Features
- Browse a collection of cocktails fetched from an external API.
- Mark cocktails as favorites and easily access them later.
- Quickly find cocktails using selected fields such as name, category, or glass type.
- Explore full cocktail details, including:
- - Ingredients
- - Instructions
- - Additional metadata from the API
- Responsive Design
- Optimized for both desktop and mobile devices.

## Tech Stack
- Frontend Framework: Next.js
- Language: TypeScript
- Server State Management: TanStack Query
- UI Components: shadcn/ui (Radix-based components)
- Styling: Tailwind CSS
- API: https://cocktails.solvro.pl

## Deployment

The app can be accessed here: [COCKTAIL BROWSER](https://recruitment-frontend-solvro.vercel.app/)

## Installation & Setup

Clone the repository:
```
git clone <your-repo-url>
cd <project-folder>
```
Install dependencies:

```
npm install
```
Run the development server:
```
npm run dev
```
Open in browser:

http://localhost:3000

## Additional Notes
The application uses TanStack Query for efficient data fetching, caching, and synchronization.

Favorites are stored locally (e.g. in LocalStorage) to persist user preferences.

UI components are built with accessibility and consistency in mind using shadcn/ui.

## Thank you
Created as a recruitment project with emphasis on code quality, UX, and modern web development practices.
# GitHub Search Application

This project is a React application that allows users to search for GitHub profiles and explore their repositories using the public GitHub API.

## Live Application

https://github-search-sooty-eight.vercel.app/

## Features

- Search GitHub users by username
- Display user profile information
- List repositories with infinite scroll (10 items per page)
- Sort repositories by different criteria (created, updated, pushed, name)
- Open repositories directly on GitHub
- Access user external links (website and Twitter if available)
- Internationalization (Portuguese and English)
- Responsive design for desktop and mobile devices

## Technologies

- React
- Vite
- Chakra UI
- Axios
- i18next
- Zod
- React Router

## Project Structure

- Home page for user search
- Profile page with dynamic route: /profile/:username
- Service layer for API requests
- Component-based architecture

## Getting Started

Clone the repository:

git clone https://github.com/gabrielfmoreno/github-search.git

Install dependencies:

npm install

Run the project:

npm run dev

## Notes

- The application uses the GitHub public API and may be subject to rate limiting.
- No authentication token is used by default.

## Author

Gabriel Moreno
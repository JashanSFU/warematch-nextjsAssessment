# WareMatch Listings

WareMatch Listings is a Next.js application designed to help users browse and filter warehouse listings. It leverages server-side rendering (SSR) to pre-fetch data and Material UI for a clean, responsive user interface. Users can view listings, filter them based on criteria (e.g., listing type, available square footage, pricing, etc.), and see key warehouse details.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Components](#components)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

- **Server-Side Rendering (SSR)**: Listings data is fetched on the server and passed to client components for enhanced SEO and faster initial load times.
- **Dynamic Filtering**: Users can filter listings by type (3PL or sublease), square footage, pricing, and title.
- **Responsive Design**: Built with Material UI and CSS Grid/Flexbox, the application adapts to various screen sizes.
- **Internal API Proxy**: The app uses an internal Next.js API route to securely fetch data from an external backend.

## Project Structure

```
├── app
│   ├── api
│   │   └── listing
│   │       └── route.ts        // API route for fetching listings
│   ├── types
│   │   └── listing.ts          // Type defined for listing object from API call
│   ├── components
│   │   ├── Header.tsx          // Header component (includes responsive navigation) (reused in Home and listing page)
│   │   ├── ListingCard.tsx     // Card component for displaying listing details (reusable component)
│   │   └── FilterPanel.tsx     // UI component for filtering listings (Can be reused)
│   ├── listings
│   │   ├── page.tsx            // Server component that fetches listings data (SSR) Revalidation time 90
│   │   ├── Loading.tsx         // This page added to keep a loading sign till Server renders the listing page. (To avoid unresponsive clicks)
│   │   └── ListingsClient.tsx  // Client component that handles filtering and UI logic to display the info
│   └── styles
│       ├── HomePage.module.css // CSS module for the home page/hero section
│       └── ListingsPage.module.css // CSS module for listings page styling
├── src
│   └── app
│       └── types
│           └── listing.ts      // Type definitions for Listing objects
│       └── utils
│           └── filters.ts      // Utility functions for filtering listings
│           └── token.ts        // Utility functions for token fetching (used in API route)
├── .env.local                  // Environment variables
├── package.json
└── README.md
```

## Components

### Header

- **Location**: `app/components/Header.tsx`
- **Description**: Displays the navigation menu and brand logo. Responsive with a hamburger menu on mobile devices.

### ListingCard

- **Location**: `app/components/ListingCard.tsx`
- **Description**: A reusable card component that displays key listing details such as title, location, pricing, available square footage, amenities, and services.

### FilterPanel

- **Location**: `app/components/FilterPanel.tsx`
- **Description**: Provides UI controls (checkboxes, text inputs, numeric fields) for filtering the listings by criteria like listing type, square footage, and pricing.

### ListingsPage (Server Component)

- **Location**: `app/listings/page.tsx`
- **Description**: An SSR page that fetches listings from the internal API (`/api/listing`) and passes the data to a client component.

### ListingsClient (Client Component)

- **Location**: `app/listings/ListingsClient.tsx`
- **Description**: A client-side component that receives the server-fetched listings, applies filtering logic (using `applyListingFilters`), and renders the listings along with a fixed sidebar filter panel.

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/warematch-listing.git
   cd warematch-listing
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables:**

   Create a `.env.local` file in the root directory with the following variables (adjust as needed):

   ```env
   NEXT_PUBLIC_API_BASE_URL= Fill in with the required API Base
   NEXT_PUBLIC_API_LOGIN_EMAIL= required email address
   NEXT_PUBLIC_API_LOGIN_PASSWORD= required password
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   > **Note:** Ensure that `NEXT_PUBLIC_BASE_URL` includes the protocol (http:// or https://).

4. **Run the Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To build for production:

add these lines to a new file .env.local file and place .env.local to the root folder

NEXT_PUBLIC_API_BASE_URL=http://54.242.149.77:8000
NEXT_PUBLIC_API_LOGIN_EMAIL=tester@gmail.com
NEXT_PUBLIC_API_LOGIN_PASSWORD=Tester@1234
NEXT_PUBLIC_BASE_URL=http://localhost:3000

```bash
npm run build
npm run start
```

## Environment Variables

- **NEXT_PUBLIC_API_BASE_URL**: URL of the external API backend for listings.
- **NEXT_PUBLIC_API_LOGIN_EMAIL / NEXT_PUBLIC_API_LOGIN_PASSWORD**: Credentials for API authentication.
- **NEXT_PUBLIC_BASE_URL**: The base URL of your Next.js application (must include protocol).

## Troubleshooting

- **EPERM Errors**: If you encounter file permission issues (e.g., with `.next/trace`), ensure no antivirus or indexing process is locking the file and try running your terminal as an administrator.
- **SSR Data Issues**: Make sure your internal API route (`/api/listing`) is accessible and returns the expected data format.
- **Type Errors with MUI Components**: Ensure that you are importing components (like `Grid`) from the correct paths (e.g., `@mui/material/Grid`) and that your MUI version is up-to-date.

## License

[MIT](LICENSE)

# DevTrack Project: A Deep Dive

This document provides a detailed explanation of the DevTrack project's codebase. We'll explore the file structure, the technologies used, and how different parts of the application interact with each other.

## High-Level Overview

DevTrack is a modern, full-stack web application built with **Next.js**, a popular React framework. It's designed to be a project and task management tool.

### Core Technologies

Based on the `package.json` file, here's a breakdown of the key technologies that power this application:

- **Framework**: [Next.js](https://nextjs.org/) (v15) is used for both the frontend (React server components) and the backend (API routes).
- **Language**: JavaScript (with JSX for React components).
- **Database**: [MongoDB](https://www.mongodb.com/) is the primary database, connected via the `mongodb` driver. The project uses a manual approach to data access instead of a full ORM like Mongoose.
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) handles user authentication, including session management and integration with MongoDB via `@next-auth/mongodb-adapter`.
- **UI Components**: The UI is built with [React](https://react.dev/) and styled using [Tailwind CSS](https://tailwindcss.com/). It uses [shadcn/ui](https://ui.shadcn.com/), which is a collection of reusable UI components built on top of Radix UI primitives (`@radix-ui/*`) and styled with Tailwind.
- **Icons**: [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/) provide the icon sets.
- **API Communication**: The native `fetch` API is used for making HTTP requests from the client to the backend API routes.
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest) is used for managing server state, which includes fetching, caching, and updating data from the backend.
- **Forms**: [React Hook Form](https://react-hook-form.com/) is used for building robust and performant forms, with [Zod](https://zod.dev/) for schema validation.
- **Styling Utilities**: `clsx` and `tailwind-merge` are used to intelligently merge Tailwind CSS classes.

---

## File Structure Explanation

(As explained previously)

---

## Data Flow: An End-to-End Example

To understand how the application works, let's trace the flow of data from the database to the UI. We'll use the example of the dashboard displaying a list of projects.

1.  **The UI Component (`/dashboard/page.js`)**: The dashboard page needs to display projects. It calls the `useProjects()` hook.

2.  **The Custom Hook (`/hooks/useProjects.js`)**: The `useProjects()` hook is a wrapper around TanStack Query's `useQuery`. It's configured to fetch data from the `/api/projects` endpoint. TanStack Query handles the loading states, caching, and refetching automatically.

3.  **The API Route (`/api/projects/route.js`)**: The `GET` function in this file is the server-side handler for the `/api/projects` endpoint.
    *   It first checks for a valid user session using `getServerSession` to ensure the route is protected.
    *   It connects to the MongoDB database.
    *   It queries the `projects` collection for all projects belonging to the logged-in user (`session.user.id`).
    *   For each project, it performs an additional query on the `tasks` collection to calculate progress, total tasks, etc.
    *   Finally, it returns the list of projects (with the calculated data) as a JSON response.

4.  **Back to the UI**: The JSON response is received by the `useProjects` hook. TanStack Query updates its cache and provides the data to the dashboard page component. The component then re-renders, displaying the list of projects to the user.

This entire process is reactive. If a user creates a new project using the `useCreateProject` mutation hook, the hook will send a `POST` request to the API, and upon success, it will invalidate the `["projects"]` query key. This tells TanStack Query that its cached project data is stale, triggering a refetch and updating the UI automatically.

---

## Code Deep Dive

Here are more detailed explanations of the key files we've examined.

### `src/lib/dbConnect.js`

This file provides a simple function to connect to a specific collection in your MongoDB database. It creates a new `MongoClient` instance for each call. For production applications, this is often optimized to cache and reuse a single client instance across multiple serverless function invocations to improve performance.

### `src/lib/models.js`

Instead of a full-fledged ORM/ODM like Mongoose or Prisma, this project defines its data schemas as plain JavaScript objects (e.g., `UserSchema`, `ProjectSchema`). This file also includes simple, manual validation functions (`validateProject`, `validateTask`) and default objects for creating new items. This approach is lightweight but requires more manual effort to maintain and enforce data consistency compared to an ORM.

### `src/lib/auth.js`

This is the core of the authentication system. It configures NextAuth.js with:

-   **Providers**: Google, GitHub, and a `CredentialsProvider` for email/password login.
-   **Adapter**: The `MongoDBAdapter` automatically handles the creation and management of users and accounts in the database when using OAuth providers.
-   **Credentials `authorize` function**: For email/password login, this function manually looks up the user in the database and uses `bcrypt.js` to compare the provided password with the stored hash.
-   **Session Strategy**: It uses `jwt` (JSON Web Tokens) for session management.
-   **Callbacks**: The `jwt` and `session` callbacks are customized to add the user's database `_id` to the token and session objects, making it easily accessible in both server-side and client-side code.

### `src/app/layout.js`

This is the root layout for the entire application. Its most important job is to wrap all pages with the necessary context providers:

-   **`SessionProvider`**: Makes the NextAuth.js session object (containing user data) available to all client components via the `useSession` hook.
-   **`QueryProvider`**: Sets up the context for TanStack Query, enabling data fetching, caching, and state management across the app.
-   **`Toaster`**: Renders the `sonner` component for displaying toast notifications.

### `src/app/dashboard/layout.js`

This component serves two purposes:

1.  **Route Protection**: It's a client component that uses the `useSession` hook to check for an active session. If the user is not logged in, it redirects them to the `/login` page.
2.  **Dashboard UI Shell**: For logged-in users, it renders the common dashboard structure, including the `DashboardSidebar` and `DashboardHeader`.

### `src/components/dashboard/DashboardSidebar.jsx`

This component builds the navigation menu for the dashboard. It's a great example of a dynamic and data-aware UI component:

-   It uses the `useProjects` and `useTasks` hooks to fetch data.
-   It displays the number of active projects and tasks as badges next to the menu items.
-   It uses the `usePathname` hook to determine the current page and apply an "active" style to the correct menu item.
-   It displays the logged-in user's name and avatar in the footer of the sidebar.
# DevTrack

DevTrack is a personal developer project and task tracker built with Next.js, MongoDB, and Tailwind CSS. It helps developers organize their projects, manage tasks, and boost productivity with a clean and intuitive dashboard.

---

## Features

* User authentication with NextAuth (Google & Email)
* Responsive landing page with Hero, Features, Testimonials, FAQ, and more
* Protected dashboard for managing projects and tasks (CRUD)
* Booking/checkout simulation for project planning
* Modern UI built with Tailwind CSS and Shadcn UI components
* Server-side and client-side data fetching using Next.js and React Query
* SEO optimized with Next.js metadata and Open Graph tags

---

## Tech Stack

* [Next.js 13 (App Router)](https://nextjs.org/)
* [NextAuth.js](https://next-auth.js.org/) for authentication
* [MongoDB](https://www.mongodb.com/) with official Node.js driver for database
* [Tailwind CSS](https://tailwindcss.com/) for styling
* [Shadcn UI](https://ui.shadcn.com/) for accessible UI components
* [React Query](https://tanstack.com/query/latest) for client-side data fetching and caching
* [React Hook Form](https://react-hook-form.com/) for form management
* [React Hot Toast](https://react-hot-toast.com/) for notifications

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/md-zeon/devtrack.git
cd devtrack
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root and add:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Folder Structure

```
src/
├── app/                   # Next.js App Router pages and layouts
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard pages
│   ├── about/             # Public about page
│   ├── contact/           # Public contact page
│   ├── layout.js          # Root layout
│   └── page.js            # Landing page
├── components/            # UI components (Hero, Features, Cards, etc.)
├── lib/                   # Utilities (MongoDB client, auth helpers)
├── hooks/                 # Custom React hooks
└── styles/                # Global styles
```

---

## Deployment

You can deploy DevTrack easily on platforms like [Vercel](https://vercel.com/) which supports Next.js out of the box.

Make sure to add your environment variables on your deployment platform.

---

## License

This project is open source and available under the MIT License.

---

## Contact

Created by [Zeon](https://github.com/md-zeon).
For questions or support, email: [zeon.cse@gmail.com](mailto:zeon.cse@gmail.com)

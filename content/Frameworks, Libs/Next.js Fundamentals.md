## What is Next.js?

Next.js is a [[React.js]] framework that provides a robust foundation for building web applications. It extends React with additional features like server-side rendering, static site generation, and built-in optimizations.

## Core Concepts

### 1. App Router (Next.js 13+)

The App Router is the newer routing system that uses the `app` directory structure:

```
app/
├── page.js          # Home page (/)
├── about/
│   └── page.js      # About page (/about)
├── blog/
│   ├── page.js      # Blog listing (/blog)
│   └── [slug]/
│       └── page.js  # Dynamic blog post (/blog/[slug])
└── layout.js        # Root layout
```

### 2. Server Components vs Client Components

**Server Components (default):**

- Render on the server
- Can access server-side resources directly
- Smaller bundle size
- Better for SEO

**Client Components:**

- Render in the browser
- Can use hooks, event handlers, browser APIs
- Marked with `"use client"` directive

javascript

```javascript
// Server Component (default)
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data.title}</div>
}

// Client Component
"use client"
import { useState } from 'react'

function ClientComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### 3. File-based Routing

Next.js uses file-based routing where the file structure determines the URL structure:

- `page.js` - Creates a route
- `layout.js` - Shared UI for a segment and its children
- `loading.js` - Loading UI
- `error.js` - Error UI
- `not-found.js` - 404 UI

### 4. Dynamic Routes

Create dynamic routes using square brackets:

javascript

```javascript
// app/blog/[slug]/page.js
export default function BlogPost({ params }) {
  return <h1>Post: {params.slug}</h1>
}

// app/shop/[...categories]/page.js (catch-all)
export default function Categories({ params }) {
  return <div>Categories: {params.categories.join('/')}</div>
}
```

### 5. Layouts

Layouts wrap pages and can be nested:

javascript

```javascript
// app/layout.js (Root Layout)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>Navigation</nav>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  )
}

// app/dashboard/layout.js (Nested Layout)
export default function DashboardLayout({ children }) {
  return (
    <div>
      <aside>Sidebar</aside>
      <main>{children}</main>
    </div>
  )
}
```

## Data Fetching

### Server Components Data Fetching

Server components can fetch data directly:

javascript

```javascript
// app/posts/page.js
async function getPosts() {
  const res = await fetch('https://api.example.com/posts')
  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### Client Components Data Fetching

Use hooks like `useEffect` or data fetching libraries:

javascript

```javascript
"use client"
import { useEffect, useState } from 'react'

export default function ClientPosts() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(setPosts)
  }, [])
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## API Routes

Create API endpoints in the `app/api` directory:

javascript

```javascript
// app/api/posts/route.js
export async function GET() {
  const posts = await fetchPosts()
  return Response.json(posts)
}

export async function POST(request) {
  const data = await request.json()
  const newPost = await createPost(data)
  return Response.json(newPost, { status: 201 })
}
```

## Styling

### CSS Modules

javascript

```javascript
// styles/Home.module.css
.container {
  padding: 20px;
}

// app/page.js
import styles from './page.module.css'

export default function Home() {
  return <div className={styles.container}>Content</div>
}
```

### Tailwind CSS

Next.js has built-in Tailwind CSS support:

javascript

```javascript
export default function Button() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Click me
    </button>
  )
}
```

## Built-in Optimizations

### Image Optimization

javascript

```javascript
import Image from 'next/image'

export default function Profile() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={500}
      priority
    />
  )
}
```

### Font Optimization

javascript

```javascript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

## Rendering Methods

### Static Site Generation (SSG)

Pages are pre-rendered at build time:

javascript

```javascript
// Automatically static if no dynamic functions are used
export default function StaticPage() {
  return <div>This page is statically generated</div>
}
```

### Server-Side Rendering (SSR)
[[Server-side rendering (SSR)]]
Pages are rendered on each request:

javascript

```javascript
// Using dynamic functions makes the page dynamic
export default async function DynamicPage() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store' // This makes it dynamic
  })
  
  return <div>{data.title}</div>
}
```

### Incremental Static Regeneration (ISR)
[[Incremental Static Regeneration (ISR)]]
Static pages that can be updated after build:

javascript

```javascript
export default async function ISRPage() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
  
  return <div>{data.title}</div>
}
```

## Key Features

### Middleware

Run code before requests are processed:

javascript

```javascript
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: '/admin/:path*'
}
```

### Environment Variables

javascript

```javascript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=your-database-url

// Usage
const apiUrl = process.env.NEXT_PUBLIC_API_URL // Client-side
const dbUrl = process.env.DATABASE_URL // Server-side only
```

## Getting Started

1. **Create a new Next.js app:**
    
    bash
    
    ```bash
    npx create-next-app@latest my-app
    cd my-app
    npm run dev
    ```
    
2. **Project structure:**
    
    ```
    my-app/
    ├── app/
    │   ├── globals.css
    │   ├── layout.js
    │   └── page.js
    ├── public/
    ├── next.config.js
    └── package.json
    ```
    
3. **Basic configuration:**
    
    javascript
    
    ```javascript
    // next.config.js
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      experimental: {
        appDir: true,
      },
    }
    
    module.exports = nextConfig
    ```
    

## Best Practices

1. **Use Server Components by default** - Only use Client Components when necessary
2. **Optimize images** - Always use the Next.js Image component
3. **Implement proper error handling** - Use error.js files for error boundaries
4. **Follow the loading patterns** - Use loading.js for loading states
5. **Keep client-side bundles small** - Move heavy processing to the server
6. **Use TypeScript** - Next.js has excellent TypeScript support
7. **Implement proper SEO** - Use metadata API for better search optimization

This guide covers the fundamental concepts you need to start building with Next.js. The framework provides many more advanced features like internationalization, authentication patterns, and performance optimizations that you can explore as you become more comfortable with these basics.
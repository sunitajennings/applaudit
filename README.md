# Applaudit

A social Oscar prediction party app. Host parties, fill out ballots, and compete with friends during live award shows.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations/Gestures:** Framer Motion
- **Backend/Auth:** Supabase (Postgres, magic link auth, realtime)
- **Hosting:** Vercel

## Setup

### Prerequisites

- Node.js 20+ installed
- A GitHub account
- A code editor (Zed, Cursor, VS Code, etc.)

### 1. Accounts to Create

You'll need accounts on these services (all have free tiers):

1. **Supabase** - https://supabase.com
   - Create a new project
   - Save your project URL and anon key (found in Project Settings > API)

2. **Vercel** - https://vercel.com
   - Sign up with your GitHub account

### 2. Clone and Install

```bash
git clone <repo-url>
cd applaudit
npm install
```

### 3. Environment Variables

Copy the example env file:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Locally

```bash
npm run dev
```

Open http://localhost:3000

### 5. Supabase Setup

In your Supabase dashboard:

1. **Enable Email Auth with Magic Links:**
   - Go to Authentication > Providers
   - Ensure Email is enabled
   - Magic links are enabled by default

2. **Run Database Migrations:**
   - (Migrations will be added as we build features)

## Development

### Project Structure

```
src/
├── app/          # Next.js app router pages
├── components/   # React components
│   └── ui/       # shadcn/ui components
├── lib/          # Utilities, Supabase client
└── styles/       # Global styles
```

### Adding shadcn Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

### Useful Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # Run ESLint
```

## Deployment

Push to `main` branch. Vercel auto-deploys from GitHub.

## Roles

| Role | Abilities |
|------|-----------|
| Admin | Toggle live mode on/off |
| Host | Identified as party host (no special permissions) |
| Participant | Enter actual winners, vote, view ballots |

## Contributing

1. Create a branch from `main`
2. Make your changes
3. Open a pull request

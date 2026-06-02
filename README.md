# Jump2Spot

A GPS story atlas — discover what happened where you're standing.

## Getting started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New Project" and select your repository
4. Leave all settings as default and click "Deploy"

That's it — Vercel handles everything automatically.

## Project structure

```
app/
  data/
    stories.ts        # All story data and types
  components/
    ExploreView.tsx   # Explore mode (nearby + map)
    BrowseView.tsx    # Browse mode (editorial feed)
    StoryView.tsx     # Story mode (immersive single story)
    CategoryBadge.tsx # Category pill component
    CategoryIcon.tsx  # Category icon component
  page.tsx            # Main app — wires all three modes together
  layout.tsx          # App shell
  globals.css         # Base styles
```

## Adding stories

Open `app/data/stories.ts` and add entries to the `stories` array.
Each story needs: id, title, excerpt, body, category, address, neighbourhood, city, lat, lng, distanceM, year, score, imageColor, tags.

Categories: `film` | `music` | `photo` | `biography` | `art` | `innovation`

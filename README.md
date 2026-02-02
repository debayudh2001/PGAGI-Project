# Personalized Content Dashboard

A dynamic, interactive dashboard that aggregates personalized content from multiple sources including news, movie recommendations, and social media posts.

## 🚀 Features

- **Personalized Content Feed** - Customized content based on user preferences
- **Multi-Source Integration** - News API, TMDB (movies), and social media
- **Search Functionality** - Debounced search across all content types
- **User Preferences** - Configurable categories with localStorage persistence
- **Favorites Management** - Save and organize favorite content
- **Responsive Design** - Mobile-first, works on all devices
- **Modern UI** - Clean, professional interface with Tailwind CSS

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **State Management:** Redux Toolkit with createAsyncThunk
- **Styling:** Tailwind CSS
- **API Client:** Axios
- **Utilities:** Lodash (debouncing)

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- API Keys (free):
  - [NewsAPI](https://gnews.io) - for news content
  - [TMDB](https://www.themoviedb.org/settings/api) - for movie recommendations

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personalized-content-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
   NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_tmdb_api_key
   NEXT_PUBLIC_NEWS_API_URL=base_url
   NEXT_PUBLIC_TMDB_API_URL=base_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
personalized-content-dashboard/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page (Personalized Feed)
│   ├── globals.css        # Global styles
│   ├── trending/          # Trending page
│   ├── favorites/         # Favorites page
│   └── settings/          # Settings page
├── components/            # React components
│   ├── layout/           # Layout components (Header, Sidebar)
│   ├── content/          # Content cards and grids
│   ├── sections/         # Dashboard sections
│   ├── search/           # Search components
│   └── settings/         # Settings panel
├── lib/                  # Utilities and configurations
│   ├── redux/           # Redux store, slices, hooks
│   ├── api/             # API service layer
│   └── utils/           # Helper functions
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## 🔑 API Integration

### News API
Fetches latest news articles based on user-selected categories (technology, sports, finance, etc.).

### TMDB API
Provides movie recommendations and trending movies.

### Social Media (Mock)
Sample social media posts for demonstration purposes.

## 🎨 Customization

Users can customize their dashboard by:
- Selecting preferred content categories
- Marking content as favorites
- Searching across all content types
- Viewing trending content

All preferences are saved in localStorage and persist across sessions.

## 🚀 Build & Deploy

**Build for production:**
```bash
npm run build
```

**Start production server:**
```bash
npm start
```

**Deploy to Vercel** (recommended):
```bash
vercel
```

## 📝 License

MIT License - feel free to use this project for learning and development.

## 👤 Author

Created as part of SDE Intern Frontend Development Assignment

---

**Note:** Make sure to keep your API keys secure and never commit them to version control!

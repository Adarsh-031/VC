# VC Intelligence Console

A Next.js MVP for venture discovery and live enrichment. The interface supports:
- Company discovery with search, filters, sorting, and pagination
- Company profiles with notes, list saving, and live enrichment
- Saved searches and list exports (CSV/JSON)
- Server-side enrichment with caching and optional OpenAI extraction

## Setup

```bash
npm install
```

Create a `.env.local` file with the optional OpenAI key:

```bash
OPENAI_API_KEY=your_api_key_here
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Enrichment Pipeline

`POST /api/enrich` accepts:

```json
{
  "companyId": "string",
  "website": "string"
}
```

The API:
1. Validates the URL
2. Fetches and extracts visible text
3. Calls OpenAI if `OPENAI_API_KEY` is set (falls back to heuristic summary)
4. Caches results in memory

## Local Storage Keys

- `vc_lists`: Saved company lists
- `vc_saved_searches`: Saved searches
- `vc_notes`: Per-company notes

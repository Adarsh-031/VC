import { NextResponse } from "next/server";
import { getCachedEnrichment, setCachedEnrichment } from "../../../lib/enrichmentCache";
import { EnrichmentResult } from "../../../lib/types";

const REQUEST_TIMEOUT_MS = 10000;
const MAX_TEXT_LENGTH = 12000;

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function extractVisibleText(html: string) {
  const withoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
  const withoutTags = withoutScripts.replace(/<[^>]+>/g, " ");
  return withoutTags.replace(/\s+/g, " ").trim().slice(0, MAX_TEXT_LENGTH);
}

function buildHeuristic(text: string, website: string): EnrichmentResult {
  const sentenceMatch = text.split(".").map((s) => s.trim()).filter(Boolean);
  const summary = sentenceMatch.slice(0, 2).join(". ") + (sentenceMatch.length ? "." : "");
  const keywords = Array.from(
    new Set(
      text
        .toLowerCase()
        .split(/\W+/)
        .filter((word) => word.length > 4)
        .slice(0, 10)
    )
  );

  const normalized = text.toLowerCase();
  const derivedSignals = [
    "Has a public website with readable content",
    "Content length suggests active marketing presence",
  ];
  if (normalized.includes("careers") || normalized.includes("jobs")) {
    derivedSignals.push("Careers or jobs content detected");
  }
  if (normalized.includes("blog")) {
    derivedSignals.push("Blog content detected");
  }
  if (normalized.includes("changelog") || normalized.includes("release")) {
    derivedSignals.push("Product updates or changelog content detected");
  }

  return {
    summary: summary || "No summary available from website text.",
    whatTheyDo: [
      "Website text extracted for analysis",
      "Summary derived from public-facing content",
      "Signals inferred from keyword frequency",
    ],
    keywords: keywords.length ? keywords : ["insufficient", "content"],
    derivedSignals,
    sources: [
      {
        url: website,
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

async function callOpenAI(text: string): Promise<EnrichmentResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Extract structured intelligence from the provided website text and return JSON only.",
        },
        {
          role: "user",
          content: `Website text: ${text}\n\nReturn JSON with: summary (1-2 sentences), whatTheyDo (3-6 bullets), keywords (5-10), derivedSignals (2-4).`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    return null;
  }

  try {
    const parsed = JSON.parse(content) as Omit<EnrichmentResult, "sources">;
    return {
      summary: parsed.summary ?? "",
      whatTheyDo: parsed.whatTheyDo ?? [],
      keywords: parsed.keywords ?? [],
      derivedSignals: parsed.derivedSignals ?? [],
      sources: [],
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as { companyId?: string; website?: string };
  if (!body.companyId || !body.website) {
    return NextResponse.json({ error: "Missing companyId or website." }, { status: 400 });
  }
  if (!isValidUrl(body.website)) {
    return NextResponse.json({ error: "Invalid website URL." }, { status: 400 });
  }

  const cacheKey = `${body.companyId}:${body.website}`;
  const cached = getCachedEnrichment(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(body.website, { signal: controller.signal });
    const html = await response.text();
    const text = extractVisibleText(html);
    let enrichment = await callOpenAI(text);
    if (!enrichment) {
      enrichment = buildHeuristic(text, body.website);
    }

    enrichment.sources = [
      {
        url: body.website,
        timestamp: new Date().toISOString(),
      },
    ];

    setCachedEnrichment(cacheKey, enrichment);
    return NextResponse.json(enrichment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to enrich website. " + (error instanceof Error ? error.message : "") },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeout);
  }
}

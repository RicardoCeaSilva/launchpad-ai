import { NextRequest, NextResponse } from "next/server";

// Replace this with your actual AI SDK call, e.g. Anthropic, OpenAI, etc.
// import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea || typeof idea !== "string") {
      return NextResponse.json({ error: "Missing or invalid idea" }, { status: 400 });
    }

    // --- Plug in your AI model here ---
    // Example with Anthropic Claude:
    //
    // const client = new Anthropic({ apiKey: process.env.AI_API_KEY });
    // const message = await client.messages.create({
    //   model: "claude-opus-4-20250514",
    //   max_tokens: 1024,
    //   messages: [
    //     {
    //       role: "user",
    //       content: `You are a startup advisor. Given this business idea: "${idea}", generate:
    //         1. A catchy product name
    //         2. A one-sentence tagline
    //         3. Core features (5 bullet points)
    //         4. Target audience
    //         5. Monetization strategy
    //         Format as JSON.`,
    //     },
    //   ],
    // });
    // const plan = message.content[0].text;

    // --- Placeholder response (remove when AI is connected) ---
    const plan = {
      name: "IdeaForge",
      tagline: `Turn "${idea}" into a revenue-generating SaaS in days, not months.`,
      features: [
        "User authentication & team management",
        "AI-powered core functionality",
        "Subscription billing via Stripe",
        "Analytics dashboard",
        "REST API for integrations",
      ],
      targetAudience: "SMBs and early-stage startups",
      monetization: "Freemium with $49/mo Pro tier",
    };

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("[/api/generate]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

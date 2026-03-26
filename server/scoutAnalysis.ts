/**
 * Ada2ai — Player Visual Analysis Route
 * Uses Claude Vision (Anthropic SDK) to analyze athlete images/videos
 * Standards: FIFA Quality Programme + Saudi Football Federation (SAFF)
 */

import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

const router = Router();

// ── Anthropic Client ─────────────────────────────────────────────────────────
function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  return new Anthropic({ apiKey });
}

// ── System Prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an elite FIFA-certified football scout and sports scientist for Ada2ai platform in Saudi Arabia's Eastern Province.
Your role is to analyze athlete images using FIFA Quality Programme + Saudi Football Federation (SAFF) standards.
You specialize in youth talent identification (ages 10-21).

CRITICAL RULES:
1. Respond ONLY with valid JSON — no markdown fences, no explanations outside JSON
2. All "note" and descriptive text fields MUST be in Arabic
3. Scores are integers from 40-99 (never 100, never below 40)
4. Base scores on what you can visually observe — be realistic and honest
5. If image quality is low, reflect that in scoutConfidence (lower score)
6. Detect the sport type from the image (football, basketball, athletics, etc.)`;

function buildAnalysisPrompt(playerInfo: {
  name?: string; age?: string; position?: string; city?: string;
}) {
  const today = new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
  return `Analyze this athlete image carefully.

Player Info provided:
- Name: ${playerInfo.name || "غير محدد"}
- Age: ${playerInfo.age || "غير محدد"}
- Position: ${playerInfo.position || "غير محدد"}
- City: ${playerInfo.city || "المنطقة الشرقية، السعودية"}

Return ONLY this exact JSON structure (no markdown, no extra text):
{"reportId":"${nanoid(8)}","analysisDate":"${today}","detectedSport":{"sport":"كرة القدم","sportEn":"Football","confidence":85,"note":"Arabic note about sport detection"},"estimatedAge":{"range":"15-17","category":"U17","saff_category":"ناشئين","note":"Arabic note"},"physicalProfile":{"bodyType":"athletic","bodyTypeAr":"رياضي","heightEstimate":"average","heightEstimateAr":"متوسط","balance":75,"posture":"Arabic description of posture","coordinationIndicators":"Arabic description"},"athleticIndicators":{"speed":{"score":78,"label":"السرعة","note":"Arabic note"},"agility":{"score":75,"label":"الرشاقة","note":"Arabic note"},"explosiveness":{"score":72,"label":"الانفجارية","note":"Arabic note"},"stamina":{"score":70,"label":"التحمل","note":"Arabic note"}},"technicalIndicators":{"ballControl":{"score":76,"label":"التحكم بالكرة","note":"Arabic note"},"dribblingPosture":{"score":74,"label":"وضعية المراوغة","note":"Arabic note"},"firstTouch":{"score":72,"label":"اللمسة الأولى","note":"Arabic note"},"coordination":{"score":75,"label":"التنسيق","note":"Arabic note"},"passing":{"score":70,"label":"التمرير","note":"Arabic note"},"shooting":{"score":68,"label":"التسديد","note":"Arabic note"}},"tacticalProfile":{"positioning":{"score":72,"label":"التمركز","note":"Arabic note"},"pressing":{"score":68,"label":"الضغط","note":"Arabic note"},"transitionSpeed":{"score":74,"label":"سرعة الانتقال","note":"Arabic note"},"decisionMaking":{"score":70,"label":"اتخاذ القرار","note":"Arabic note"}},"mentalProfile":{"focus":{"score":74,"label":"التركيز"},"confidence":{"score":72,"label":"الثقة"},"leadership":{"score":68,"label":"القيادة"}},"overallRating":74,"sportDNA":{"RW":78,"LW":72,"ST":68,"CAM":70,"CM":65,"CDM":58,"RB":55,"LB":52,"CB":48,"GK":35},"bestPosition":"RW","bestPositionAr":"جناح أيمن","secondPosition":"ST","secondPositionAr":"مهاجم","tacticalHints":"Arabic 2-3 sentences about tactical profile and playing style","strengths":["Arabic strength 1 specific","Arabic strength 2 specific","Arabic strength 3 specific"],"developmentAreas":["Arabic development area 1 with advice","Arabic development area 2 with advice"],"fifaStandardComparison":{"technicalLevel":"Meets Standard","physicalLevel":"Above Standard","saffYouthBenchmark":72,"benchmarkNote":"Arabic note comparing to SAFF youth standards"},"scoutRecommendation":"Arabic 3-4 sentences professional scout recommendation","scoutConfidence":72,"confidenceNote":"Arabic explanation of analysis confidence level","imageQuality":"good"}`;
}

// ── Upload Endpoint ───────────────────────────────────────────────────────────
router.post("/upload", async (req, res) => {
  try {
    const { fileData, mimeType, fileName } = req.body as {
      fileData: string;
      mimeType: string;
      fileName: string;
    };

    if (!fileData || !mimeType) {
      return res.status(400).json({ error: "fileData and mimeType required" });
    }

    const buffer = Buffer.from(fileData, "base64");
    const key = `scout-analysis/${nanoid()}-${fileName || "upload"}`;
    const { url } = await storagePut(key, buffer, mimeType);

    return res.json({ url, key });
  } catch (err) {
    console.error("[Scout Upload]", err);
    return res.status(500).json({ error: "Upload failed" });
  }
});

// ── Analysis Endpoint ─────────────────────────────────────────────────────────
router.post("/analyze", async (req, res) => {
  // Set a 55-second timeout on the response
  res.setTimeout(55000, () => {
    if (!res.headersSent) {
      res.status(504).json({ error: "Analysis timeout" });
    }
  });

  try {
    const { imageUrl, playerInfo } = req.body as {
      imageUrl: string;
      playerInfo?: { name?: string; age?: string; position?: string; city?: string };
    };

    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl is required" });
    }

    console.log("[Scout Analysis] Starting Claude Vision analysis...");
    console.log("[Scout Analysis] Player:", playerInfo?.name || "Unknown");
    console.log("[Scout Analysis] Image:", imageUrl.substring(0, 80));

    const anthropic = getAnthropicClient();

    // Fetch image and convert to base64 for Claude
    let imageSource: Anthropic.Base64ImageSource | Anthropic.URLImageSource;

    try {
      const imgRes = await fetch(imageUrl, { signal: AbortSignal.timeout(15000) });
      if (!imgRes.ok) throw new Error(`Failed to fetch image: ${imgRes.status}`);
      const imgBuffer = await imgRes.arrayBuffer();
      const base64Data = Buffer.from(imgBuffer).toString("base64");
      const contentType = imgRes.headers.get("content-type") || "image/jpeg";
      const supportedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      const mediaType = supportedTypes.includes(contentType) ? contentType : "image/jpeg";
      imageSource = {
        type: "base64",
        media_type: mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
        data: base64Data,
      };
      console.log("[Scout Analysis] Image fetched, size:", imgBuffer.byteLength, "bytes");
    } catch (fetchErr) {
      console.warn("[Scout Analysis] Could not fetch image, using URL source:", fetchErr);
      imageSource = { type: "url", url: imageUrl };
    }

    const claudeResponse = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: imageSource },
            { type: "text", text: buildAnalysisPrompt(playerInfo || {}) },
          ],
        },
      ],
    });

    const rawText = claudeResponse.content[0].type === "text" ? claudeResponse.content[0].text : "";
    console.log("[Scout Analysis] Claude response length:", rawText.length);

    // Parse JSON — strip markdown fences if Claude added them
    let report;
    try {
      const cleaned = rawText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON object found in response");
      report = JSON.parse(jsonMatch[0]);
    } catch (parseErr) {
      console.error("[Scout Analysis] JSON parse error:", parseErr);
      console.error("[Scout Analysis] Raw response:", rawText.substring(0, 500));
      return res.status(500).json({ error: "Failed to parse AI response", raw: rawText.substring(0, 300) });
    }

    console.log("[Scout Analysis] ✅ Success! Overall rating:", report.overallRating);
    return res.json({ success: true, report, model: "claude-opus-4-5", source: "anthropic" });

  } catch (err: any) {
    console.error("[Scout Analysis] Error:", err?.message || err);
    if (!res.headersSent) {
      return res.status(500).json({ error: err?.message || "Analysis failed" });
    }
  }
});

// ── Health / Validate Key ─────────────────────────────────────────────────────
router.get("/health", (_req, res) => {
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  res.json({ status: "ok", service: "scout-analysis", anthropicKeySet: hasKey, model: "claude-opus-4-5" });
});

export function registerScoutAnalysisRoutes(app: import("express").Express) {
  app.use("/api/scout", router);
  console.log("[Scout Analysis] Routes registered at /api/scout (Claude Vision / Anthropic)");
}

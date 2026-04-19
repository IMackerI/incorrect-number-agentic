import "dotenv/config";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import type { TextToSpeechConvertRequestOutputFormat } from "@elevenlabs/elevenlabs-js/api/resources/textToSpeech/types";
import { languages } from "../src/lib/languages";

const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID || "XB0fDUnXU5powFXDhCwa";
const modelId = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";
const outputDir = process.env.ELEVENLABS_OUTPUT_DIR || "public/audio";
const outputFormat = (process.env.ELEVENLABS_OUTPUT_FORMAT || "mp3_44100_128") as TextToSpeechConvertRequestOutputFormat;

if (!apiKey) {
  console.error("Missing ELEVENLABS_API_KEY in .env");
  process.exit(1);
}

const client = new ElevenLabsClient({ apiKey });

async function writeAudioFile(filePath: string, stream: ReadableStream<Uint8Array>) {
  const arrayBuffer = await new Response(stream).arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await writeFile(filePath, buffer);
}

async function generateAudio(language: (typeof languages)[number]) {
  const baseRequest = {
    text: language.spokenText,
    outputFormat,
    applyTextNormalization: "on" as const,
    voiceSettings: {
      stability: 0.36,
      similarityBoost: 0.82,
      style: 0.18,
      useSpeakerBoost: true,
      speed: 0.96,
    },
    seed: 42,
  };

  try {
    return await client.textToSpeech.convert(voiceId, {
      ...baseRequest,
      modelId,
      languageCode: language.ttsCode,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const fallbackModelId = process.env.ELEVENLABS_FALLBACK_MODEL_ID || "eleven_v3";

    if (!message.includes("does not support language_code")) {
      throw error;
    }

    console.warn(
      "Retrying",
      language.label,
      "with fallback model",
      fallbackModelId,
      "without enforced language_code.",
    );

    return await client.textToSpeech.convert(voiceId, {
      ...baseRequest,
      modelId: fallbackModelId,
    });
  }
}

async function main() {
  const absoluteOutputDir = path.resolve(process.cwd(), outputDir);
  await mkdir(absoluteOutputDir, { recursive: true });

  const manifest = [] as Array<{ slug: string; label: string; file: string; text: string }>;

  for (const language of languages) {
    const fileName = language.slug + ".mp3";
    const filePath = path.join(absoluteOutputDir, fileName);

    console.log("Generating", language.label, "->", fileName);

    const audioStream = await generateAudio(language);
    await writeAudioFile(filePath, audioStream);

    manifest.push({
      slug: language.slug,
      label: language.label,
      file: fileName,
      text: language.preview,
    });
  }

  await writeFile(path.join(absoluteOutputDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

  console.log("Done. Audio files written to", absoluteOutputDir);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

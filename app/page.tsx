"use client";

import { useMemo, useState } from "react";
import { generatePrompt, type PromptOptions } from "@/lib/promptGenerator";

const platforms = ["Reels", "TikTok", "YouTube Shorts"] as const;
const tones = ["Funny", "Motivational", "Educational", "Relatable", "Savage"] as const;
const hooks = ["Shock", "Question", "Myth Bust", "Number Stat", "Story"] as const;

export default function HomePage() {
  const [options, setOptions] = useState<PromptOptions>({
    topic: "Productivity hacks",
    platform: "Reels",
    tone: "Relatable",
    hook: "Question",
    audience: "Students",
    withEmoji: true,
    language: "Hinglish",
    cta: "Follow"
  });

  const [customTopic, setCustomTopic] = useState(options.topic);
  const result = useMemo(() => generatePrompt({ ...options, topic: customTopic }), [options, customTopic]);

  function randomize() {
    const rand = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];
    setOptions((prev) => ({
      ...prev,
      platform: rand(platforms),
      tone: rand(tones),
      hook: rand(hooks),
      audience: rand(["Students", "Working Professionals", "Creators", "Fitness Beginners", "Entrepreneurs"]) as any,
      cta: rand(["Follow", "Comment", "Share", "Save"]) as any,
      withEmoji: Math.random() > 0.3,
      language: Math.random() > 0.5 ? "Hindi" : "Hinglish",
    }));
  }

  async function copy() {
    await navigator.clipboard.writeText(result);
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Viral Short Prompt Generator</h1>
        <p className="sub">Ak video promt likho ? short aur viral.</p>

        <div className="grid">
          <label>
            <span>Topic</span>
            <input
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g., Budget travel tips"
            />
          </label>

          <label>
            <span>Platform</span>
            <select
              value={options.platform}
              onChange={(e) => setOptions({ ...options, platform: e.target.value as any })}
            >
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Tone</span>
            <select
              value={options.tone}
              onChange={(e) => setOptions({ ...options, tone: e.target.value as any })}
            >
              {tones.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Hook Style</span>
            <select
              value={options.hook}
              onChange={(e) => setOptions({ ...options, hook: e.target.value as any })}
            >
              {hooks.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Audience</span>
            <input
              value={options.audience}
              onChange={(e) => setOptions({ ...options, audience: e.target.value })}
              placeholder="e.g., New parents"
            />
          </label>

          <label className="row">
            <span>Language</span>
            <div className="seg">
              <button
                className={options.language === "Hinglish" ? "active" : ""}
                onClick={() => setOptions({ ...options, language: "Hinglish" })}
                type="button"
              >
                Hinglish
              </button>
              <button
                className={options.language === "Hindi" ? "active" : ""}
                onClick={() => setOptions({ ...options, language: "Hindi" })}
                type="button"
              >
                Hindi
              </button>
            </div>
          </label>

          <label className="row">
            <span>Emojis</span>
            <div className="seg">
              <button
                className={options.withEmoji ? "active" : ""}
                onClick={() => setOptions({ ...options, withEmoji: true })}
                type="button"
              >
                On
              </button>
              <button
                className={!options.withEmoji ? "active" : ""}
                onClick={() => setOptions({ ...options, withEmoji: false })}
                type="button"
              >
                Off
              </button>
            </div>
          </label>

          <label>
            <span>CTA</span>
            <select
              value={options.cta}
              onChange={(e) => setOptions({ ...options, cta: e.target.value as any })}
            >
              {(["Follow", "Comment", "Share", "Save"] as const).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="actions">
          <button onClick={randomize} type="button">Randomize</button>
          <button onClick={copy} type="button" className="primary">Copy</button>
        </div>

        <label>
          <span>Prompt</span>
          <textarea value={result} readOnly rows={10} />
        </label>

        <footer>
          <small>
            Built for creators?generate a viral-ready script prompt in seconds.
          </small>
        </footer>
      </section>
    </main>
  );
}

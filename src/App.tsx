import * as Select from "@radix-ui/react-select";
import { ArrowDownToLine, Check, ChevronDown, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { defaultLanguage, findLanguageBySlug, languages } from "./lib/languages";

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage.slug);

  const activeLanguage = useMemo(() => {
    return findLanguageBySlug(selectedLanguage);
  }, [selectedLanguage]);

  const downloadHref = import.meta.env.BASE_URL + "audio/" + activeLanguage.slug + ".mp3";
  const downloadName = "incorrect-number-" + activeLanguage.slug + ".mp3";

  return (
    <main className="app-shell">
      <div className="background-frame" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <div className="aura aura-one" aria-hidden="true" />
      <div className="aura aura-two" aria-hidden="true" />
      <div className="aura aura-three" aria-hidden="true" />
      <div className="contour contour-left" aria-hidden="true" />
      <div className="contour contour-right" aria-hidden="true" />

      <motion.div
        className="hero-layout"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="hero-copy">
          <motion.div
            className="signal-orbit"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            transition={{ opacity: { duration: 1.1 }, scale: { duration: 1.1 }, rotate: { duration: 50, repeat: Infinity, ease: "linear" } }}
          >
            <div className="signal-ring signal-ring-one" />
            <div className="signal-ring signal-ring-two" />
            <div className="signal-ring signal-ring-three" />
            <div className="signal-core" />
          </motion.div>

          <div className="outline-word" aria-hidden="true">
            signal
          </div>

          <p className="eyebrow">
            <Sparkles size={14} strokeWidth={1.8} />
            agentic voice artifact
          </p>

          <h1>Make the wrong number feel intentional.</h1>

          <p className="lead">
            A one-action page for a single sentence, sculpted like a luxury interface. Choose the language,
            download the voice, and let everything else disappear into atmosphere.
          </p>

          <div className="fact-strip" aria-label="Highlights">
            <span>one dropdown</span>
            <span>one download</span>
            <span>ten languages</span>
            <span>elevenlabs ready</span>
          </div>

          <div className="artifact-plaque">
            <span className="artifact-plaque__eyebrow">current voice artifact / {activeLanguage.ttsCode.toUpperCase()}</span>
            <p>{activeLanguage.preview}</p>
            <span className="artifact-plaque__meta">Pre-generated with ElevenLabs for instant download and zero UI clutter.</span>
          </div>
        </section>

        <motion.section
          className="control-panel"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="control-panel__header">
            <span>single action</span>
            <span>{activeLanguage.ttsCode.toUpperCase()}</span>
          </div>

          <div className="panel-copy">
            <h2>Choose a language and take the message with you.</h2>
            <p>
              Audio files are generated ahead of time into <strong>public/audio</strong>, so the website stays
              fast, light, and beautifully still.
            </p>
          </div>

          <div className="control-stack">
            <label className="sr-only" htmlFor="language-trigger">
              Select language
            </label>

            <Select.Root value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <Select.Trigger id="language-trigger" className="select-trigger" aria-label="Language">
                <span className="select-prefix">language</span>
                <Select.Value className="select-value" aria-label={activeLanguage.label}>
                  {activeLanguage.label}
                </Select.Value>
                <Select.Icon className="select-icon">
                  <ChevronDown size={18} strokeWidth={1.8} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="select-content" position="popper" sideOffset={10}>
                  <Select.Viewport className="select-viewport">
                    {languages.map((language) => (
                      <Select.Item key={language.slug} value={language.slug} className="select-item">
                        <Select.ItemText>
                          <span className="select-item__label">{language.label}</span>
                          <span className="select-item__preview">{language.preview}</span>
                        </Select.ItemText>
                        <Select.ItemIndicator className="select-item__indicator">
                          <Check size={16} strokeWidth={2} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>

            <a className="download-button" href={downloadHref} download={downloadName}>
              <span className="download-copy">
                <span className="download-label">download voice message</span>
                <span className="download-caption">{activeLanguage.preview}</span>
              </span>
              <ArrowDownToLine size={20} strokeWidth={1.8} />
            </a>
          </div>

          <div className="panel-footnote">
            <p className="quote-mark">“{activeLanguage.preview}”</p>
            <p>Put your ElevenLabs API key into .env, run the generator once, and every language becomes a static download.</p>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}

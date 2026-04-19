export type LanguageOption = {
  slug: string;
  label: string;
  ttsCode: string;
  preview: string;
  spokenText: string;
};

export const languages: LanguageOption[] = [
  {
    slug: "en",
    label: "English",
    ttsCode: "en",
    preview: "You have the incorrect number.",
    spokenText: "You have the incorrect number.",
  },
  {
    slug: "sk",
    label: "Slovak",
    ttsCode: "sk",
    preview: "Vytočili ste nesprávne číslo.",
    spokenText: "Vytočili ste nesprávne číslo.",
  },
  {
    slug: "cs",
    label: "Czech",
    ttsCode: "cs",
    preview: "Vytočili jste nesprávné číslo.",
    spokenText: "Vytočili jste nesprávné číslo.",
  },
  {
    slug: "de",
    label: "German",
    ttsCode: "de",
    preview: "Sie haben die falsche Nummer gewählt.",
    spokenText: "Sie haben die falsche Nummer gewählt.",
  },
  {
    slug: "fr",
    label: "French",
    ttsCode: "fr",
    preview: "Vous avez composé le mauvais numéro.",
    spokenText: "Vous avez composé le mauvais numéro.",
  },
  {
    slug: "es",
    label: "Spanish",
    ttsCode: "es",
    preview: "Ha marcado el número equivocado.",
    spokenText: "Ha marcado el número equivocado.",
  },
  {
    slug: "it",
    label: "Italian",
    ttsCode: "it",
    preview: "Ha composto il numero sbagliato.",
    spokenText: "Ha composto il numero sbagliato.",
  },
  {
    slug: "pt",
    label: "Portuguese",
    ttsCode: "pt",
    preview: "Você ligou para o número errado.",
    spokenText: "Você ligou para o número errado.",
  },
  {
    slug: "pl",
    label: "Polish",
    ttsCode: "pl",
    preview: "Wybrano niewłaściwy numer.",
    spokenText: "Wybrano niewłaściwy numer.",
  },
  {
    slug: "hu",
    label: "Hungarian",
    ttsCode: "hu",
    preview: "Rossz számot tárcsázott.",
    spokenText: "Rossz számot tárcsázott.",
  }
];

export const defaultLanguage = languages[0];

export function findLanguageBySlug(slug: string) {
  return languages.find((language) => language.slug === slug) ?? defaultLanguage;
}

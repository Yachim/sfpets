export const langs = {
	cs: "🇨🇿",
	en: "🇬🇧"
} as const;
export type Langs = keyof typeof langs;
export const langList = Object.keys(langs) as Langs[];

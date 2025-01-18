import { langList, Langs } from "./data/translation";

export function getDefaultLang(): Langs {
	let lang = navigator.language.split("-")[0] as Langs
	if (!langList.includes(lang)) lang = "en"
	return lang
}

type Settings = {
	darkTheme: boolean;
	lang: Langs
	lastCharacter: string
};
export function getSettings(): Settings {
	const lang = (localStorage.getItem("lang") ?? getDefaultLang()) as Langs
	const darkTheme = (localStorage.getItem("darkTheme") ?? "true") == "true"
	const lastCharacter = localStorage.getItem("lastCharacter") ?? "-1"

	return {
		lang,
		darkTheme,
		lastCharacter,
	}
}

type SettingsPatch = Partial<Settings>
export function patchSettings(data: SettingsPatch) {
	if (data.darkTheme !== undefined) localStorage.setItem("darkTheme", data.darkTheme.toString())
	if (data.lang !== undefined) localStorage.setItem("lang", data.lang)
	if (data.lastCharacter !== undefined) localStorage.setItem("lastCharacter", data.lastCharacter)
}

type CharacterData = {
	name: string;
	world: string;
}

type CharacterInfo = CharacterData & {
	id: string;
	shadow_found: number[];
	light_found: number[];
	earth_found: number[];
	fire_found: number[];
	water_found: number[];
}

export function getCharacter(id: string): CharacterInfo {
	return JSON.parse(localStorage.getItem(id)!)
}

// returns id
export function createCharacter(data: CharacterData): string {
	const id = crypto.randomUUID()
	localStorage.setItem(id, JSON.stringify({
		id,
		...data,
		shadow_found: [],
		light_found: [],
		earth_found: [],
		fire_found: [],
		water_found: [],
	}))
	const characterIds = JSON.parse(localStorage.getItem("characterIds") ?? "[]") as string[]
	characterIds.push(id)
	localStorage.setItem("characterIds", JSON.stringify(characterIds))

	return id
}

function getCharacterIds(): string[] {
	return JSON.parse(localStorage.getItem("characterIds") ?? "[]") as string[]
}

export function getCharacters(): CharacterInfo[] {
	return getCharacterIds().map(id => getCharacter(id))
}

type CharacterInfoPatch = Partial<CharacterInfo> & {
	[P in "id"]: CharacterInfo["id"]
}
export function patchCharacter(data: CharacterInfoPatch) {
	console.log(data)
	let characterInfo = getCharacter(data.id);
	characterInfo = {
		...characterInfo,
		...data,
		id: characterInfo.id,
	}
	localStorage.setItem(data.id, JSON.stringify(characterInfo))
}

export function deleteCharacter(data: { id: CharacterInfo["id"] }) {
	localStorage.removeItem(data.id)
	const charactersIds = getCharacterIds()
	const filteredIds = charactersIds.filter(val => val !== data.id)
	localStorage.setItem("characterIds", JSON.stringify(filteredIds))
}

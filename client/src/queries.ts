import axios from "axios";
import { Langs } from "./data/translation";

const client = axios.create({
	// TODO: change to env var
	baseURL: "http://localhost:8000/api/",
});

type Credentials = {
	email: string;
	password: string;
};

export function isLoggedIn(): boolean {
	return !!client.defaults.headers.Authorization && client.defaults.headers.Authorization !== "";
}

export async function postRegister(data: Credentials) {
	client.post("register/", data);
}

export async function postLogin(data: Credentials) {
	const res = await client.post("login/", data);
	client.defaults.headers.Authorization = `Token ${res.data.token}`;
}

export async function postLogout() {
	client.post("logout/");
	delete client.defaults.headers.Authorization;
}

type AccountInfo = {
	id: number;
	email: string;
	dark_theme: boolean;
	lang: Langs
};
export async function getAccount(): Promise<AccountInfo> {
	const res = await client.get<AccountInfo>("account/");
	return res.data;
}

type AccountInfoPatch = {
	email?: string;
	dark_theme?: boolean;
	lang?: Langs
};
export async function patchAccount(data: AccountInfoPatch): Promise<AccountInfo> {
	const res = await client.patch("account/", data);
	return res.data;
}

export async function deleteAccount() {
	client.delete("account/");
	delete client.defaults.headers.Authorization;
}

type CharacterData = {
	name: string;
	world: string;
}

type CharacterInfo = {
	id: number;
	name: string;
	world: string;
	shadow_found: number[];
	light_found: number[];
	earth_found: number[];
	fire_found: number[];
	water_found: number[];
}

export async function postCharacters(data: CharacterData): Promise<CharacterInfo> {
	const res = await client.post("characters/", data);
	return res.data;
}

export async function getCharacters(): Promise<CharacterInfo[]> {
	const res = await client.get<CharacterInfo[]>("characters/");
	return res.data;
}

export async function getCharacter(id: number): Promise<CharacterInfo> {
	const res = await client.get<CharacterInfo>(`characters/${id}`);
	return res.data;
}

type CharacterInfoPatch = {
	id: number;
	name?: string;
	world?: string;
	shadow_found?: number[];
	light_found?: number[];
	earth_found?: number[];
	fire_found?: number[];
	water_found?: number[];
}
export async function patchCharacter(data: CharacterInfoPatch) {
	client.patch(`characters/${data.id}/`, data);
}

export async function deleteCharacter(data: { id: number }): Promise<CharacterInfo[]> {
	const res = await client.delete(`characters/${data.id}/`);
	return res.data;
}

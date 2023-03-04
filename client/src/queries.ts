import axios from "axios";

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
};
export async function getAccountInfo(): Promise<AccountInfo> {
	const res = await client.get<AccountInfo>("account/");
	return res.data;
}

type CharacterData = {
	name: string;
	world: string;
}
export async function postCharacters(data: CharacterData) {
	client.post("characters/", data)
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
export async function patchCharacter(data: CharacterInfo) {
	client.patch(`characters/${data.id}/`, data);
}

import axios from "axios";

const client = axios.create({
	baseURL: "http://localhost:8000/api/",
});

type Credentials = {
	email: string;
	password: string;
};

type PostOutput = {
	status: "success"
} | {
	status: "error",
	message: string
};
export async function postRegister(data: Credentials): Promise<PostOutput> {
	return client.post("register/", data).then(() => ({
		status: "success" as const
	})).catch((err) => ({
		status: "error",
		message: err.message
	}));
}

export async function postLogin(data: Credentials): Promise<PostOutput> {
	return client.post("login/", data).then((res) => {
		client.defaults.headers.Authorization = `Token ${res.data.token}`;
		return {
			status: "success" as const
		}
	}).catch((err) => ({
		status: "error",
		message: err.message
	}));
}

export async function postLogout() {
	const res = await client.post("logout/");
}

type AccountInfo = {
	status: "logged_in";
	id: number;
	email: string;
} | {
	status: "error";
	message: string;
};
export async function getAccountInfo(): Promise<AccountInfo> {
	return client.get("account/").then((res) => ({
		...res.data,
		status: "logged_in"
	})).catch((err) => ({
		status: "error",
		message: err.message
	}));
}

type CharacterData = {
	name: string;
	world: string;
}
export async function postCharacters(data: CharacterData): Promise<PostOutput> {
	return client.post("characters/", data).then(_ => ({
		status: "success" as const
	})).catch((err) => ({
		status: "error",
		message: err.message
	}))
}

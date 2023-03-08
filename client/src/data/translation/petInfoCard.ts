import { Translation } from ".";
import { Season, Time } from "../../types/pet";
import { image as petImage } from "./petCard";

export const image = petImage;

export const time: {
	[key in Time]: Translation
} = {
	day: {
		cs: "Den",
		en: "Day"
	},
	night: {
		cs: "Noc",
		en: "Night"
	},
	w_hour: {
		cs: "Hodina čarodějnic",
		en: "Withing hour"
	}
}

export const season: {
	[key in Season]: Translation
} = {
	spring: {
		cs: "Jaro",
		en: "Spring"
	},
	summer: {
		cs: "Léto",
		en: "Summer"
	},
	fall: {
		cs: "Podzim",
		en: "Fall"
	},
	winter: {
		cs: "Zima",
		en: "Winter"
	},
	december: {
		cs: "Prosinec",
		en: "December"
	}
}

export const status: {
	[key in "available" | "unavailable"]: Translation
} = {
	available: {
		cs: "Dostupný",
		en: "Available"
	},
	unavailable: {
		cs: "Nedostupný",
		en: "Unavailable"
	}
}


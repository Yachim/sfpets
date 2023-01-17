import { Pet } from "../types";
import {
	isAprilFools,
	isBDay,
	isDay,
	isDecember,
	isEaster,
	isFall,
	isFriday13,
	isNewYears,
	isNight,
	isSpring,
	isSummer,
	isValentine,
	isWHour,
	isWinter
} from "./timeUtils";

// events with fixed date/time
export const filterableEvents: {
	[key: string]: (date: Date) => boolean;
} = {
    "April Fools' Day": isAprilFools,
    "Birthday event": isBDay,
    "Valentine's day": isValentine,
    "New Year's Eve & Day": isNewYears,
    "Friday the 13th": isFriday13,
    Easter: isEaster
	// "Pentecost/Whitsun": () => {
    //     const dt = new Date();
    //     const year = dt.getFullYear();
    //     const [M, D] = Easter(year);

    //     const whitsunDate = new Date(year, M, D + 49);

    //     return (
    //         dt.getDate() === whitsunDate.getDate() &&
    //         dt.getMonth() === whitsunDate.getMonth()
    //     );
    // }
};

export const isSeason: {
	[key: string]: (date: Date) => boolean;
} = {
	spring: isSpring,
	summer: isSummer,
	fall: isFall,
	winter: isWinter,
	december: isDecember
} 

export function isAvailable(pet: Pet, date: Date): "available" | "unknown" | "unavailable" {
	if (pet.event) {
		if (
			pet.event.en in filterableEvents &&
			!filterableEvents[pet.event.en](date)
		) {
			return "unavailable";
		} else if (!(pet.event.en in filterableEvents)) {
			return "unknown";
		}
	}

	if (pet.dayOfWeek !== null) {
		if (date.getDay() !== pet.dayOfWeek) {
			return "unavailable";
		}
	}
	if (pet.season) {
		if (isSeason[pet.season](date)) {
			return "unavailable";
		}
	}
	if (pet.time) {
		if (pet.time === "day" && isDay(date)) {
			return "unavailable";
		}
		if (pet.time === "night" && isNight(date)) {
			return "unavailable";
		}
		if (pet.time === "w_hour" && isWHour(date)) {
			return "unavailable";
		}
	}

	return "available";
}


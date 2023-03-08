import { Translation } from "../data/translation";
import PetElement from "./element";

type Time = "day" | "night" | "w_hour";
type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type Season = "spring" | "summer" | "fall" | "winter" | "december";

type Pet = {
	names: Translation;
	loc_index: number | null;
	time: Time | null;
	dayOfWeek: DayOfWeek | null;
	event: Translation | null;
	season: Season | null;
	hof: {
		type: Translation;
		top: number;
		honor: number;
	} | null;
	notes: null | Translation;
	img: string;
	index: number;
	element: PetElement;
};

export default Pet;

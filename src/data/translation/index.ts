import { daysOfWeek } from "./daysOfWeek";
import { langList, Langs } from "./langList";
import * as page from "./page";
import * as header from "./header";
import * as elements from "./elements";
import * as filters from "./filters";
import * as userSettings from "./userSettings";
import locs from "./locs";
import * as languageSelect from "./languageSelect";
import * as loginMenu from "./loginMenu";
import * as petCard from "./petCard";
import * as petInfoCard from "./petInfoCard";

type Translation = {
	[key in Langs]: string
}

export {
	page,
	daysOfWeek,
	langList,
	elements,
	filters,
	userSettings,
	locs,
	header,
	languageSelect,
	loginMenu,
	petCard,
	petInfoCard
};

export type {
	Langs,
	Translation
}

import { useParams, useSearchParams } from "react-router-dom";
import { pets } from "../../data/pets";
import { Params, Pet, Season } from "../../types";
import styles from "../../scss/Pets.module.scss";
import { PetCard, PetProps } from "../PetCard";
import locs from "../../data/locs";
import { daysOfWeek, filterLabel } from "../../data/translation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faCaretUp,
    faFilter
} from "@fortawesome/free-solid-svg-icons";
import { isAprilFools, isBDay, isDecember, isEaster, isFall, isFriday13, isNewYears, isSpring, isSummer, isValentine, isWinter } from "../../utils/timeUtils";

type Filter = "available" | "unknown" | "unavailable" | "found" | "notFound";
type SortingDirection = "ascending" | "descending";
type Sort = "index" | "availability";

const availabilityValues = {
    available: 0,
    unknown: 1,
    unavailable: 2
};

// events with fixed date/time
const filterableEvents: {
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

const isSeason: {
	[key: string]: (date: Date) => boolean;
} = {
	spring: isSpring,
	summer: isSummer,
	fall: isFall,
	winter: isWinter,
	december: isDecember
} 

export function Pets() {
    const params = useParams<Params>();
    const lang = params.lang!;
    const element = params.element!;

    const [searchParams, setSearchParams] = useSearchParams();
    const filter: Filter[] = JSON.parse(
        searchParams.get("filter") ||
            '["available", "unknown", "unavailable", "found", "notFound"]'
    );
    const sort: Sort = (searchParams.get("sort") || "index") as Sort;
    const sortingDirection: SortingDirection = (searchParams.get(
        "sortingDirection"
    ) || "ascending") as SortingDirection;

    const [petsData, setPetsData] = useState<PetProps[]>([]);

    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 60_000);

        return () => clearInterval(interval);
        // TODO: set state (setDate) only in certain time periods (6:00, 18:00, 00:00, 1:00)
    }, []);

    function isAvailable(pet: Pet): "available" | "unknown" | "unavailable" {
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
			console.log(pet.season)
			console.log(isSeason)
            if (isSeason[pet.season](date)) {
                return "unavailable";
            }
        }
        if (pet.time) {
            const dayBeginning = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                6
            );
            const dayNight = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                18
            );
            const nightEnd = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + 1,
                6
            );

            if (
                pet.time === "day" &&
                !(dayBeginning < date && date < dayNight)
            ) {
                return "unavailable";
            }

            if (pet.time === "night" && !(dayNight < date && date < nightEnd)) {
                return "unavailable";
            }

            const wHourBeginning = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                0
            );
            const wHourEnd = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                1
            );
            if (
                pet.time === "w_hour" &&
                !(wHourBeginning < date && date < wHourEnd)
            ) {
                return "unavailable";
            }
        }

        return "available";
    }

    useEffect(() => {
        let editedPets: PetProps[] = pets[element].map((pet, i) => {
            let loc: string | null = null;
            if (pet.loc_index) loc = locs[pet.loc_index][lang];

            let day: string | null = null;
            if (pet.dayOfWeek !== null) day = daysOfWeek[pet.dayOfWeek][lang];

            let event: string | null = null;
            if (pet.event) event = pet.event[lang];

            let found: boolean = JSON.parse(
                localStorage.getItem(`${element}-${i}`) || "false"
            );

            return {
                name: pet.names[lang],
                location: loc,
                dayOfWeek: day,
                event: event,
                time: pet.time,
                season: pet.season,
                status: isAvailable(pet),
                img: pet.img,
                found: found,
                index: i
            };
        });

        if (filter.length > 0) {
            editedPets = editedPets.filter((pet) => {
                let found = true;
                if (filter.includes("found") && !filter.includes("notFound")) {
                    found = pet.found;
                } else if (
                    !filter.includes("found") &&
                    filter.includes("notFound")
                ) {
                    found = !pet.found;
                }

                let status = true;
                if (
                    filter.includes("available") ||
                    filter.includes("unavailable") ||
                    filter.includes("unknown")
                ) {
                    status = filter.includes(pet.status);
                }

                return found && status;
            });
        }

        if (sortingDirection === "ascending") {
            if (sort === "index") {
                editedPets.sort((a, b) => a.index - b.index);
            } else if (sort === "availability") {
                editedPets.sort(
                    (a, b) =>
                        availabilityValues[a.status] -
                        availabilityValues[b.status]
                );
            }
        } else {
            if (sort === "index") {
                editedPets.sort((a, b) => b.index - a.index);
            } else if (sort === "availability") {
                editedPets.sort(
                    (a, b) =>
                        availabilityValues[b.status] -
                        availabilityValues[a.status]
                );
            }
        }

        setPetsData([...editedPets]);
    }, [
        JSON.stringify(filter),
        sort,
        element,
        date,
        sortingDirection,
        JSON.stringify(petsData)
    ]);

    function toggleFound(index: number, newVal: boolean) {
        petsData[index].found = newVal;
        setPetsData([...petsData]);
    }

    return (
        <main className={styles["pets-grid"]}>
            <div className={styles.filters}>
                <div className={styles["filter-settings"]}>
                    <button className={styles["filters-select"]}>
                        {filterLabel[lang]} <FontAwesomeIcon icon={faFilter} />
                    </button>

                    <div className={styles["sort"]}>
                        <button
                            onClick={() => {
                                if (sortingDirection === "ascending") {
                                    searchParams.set(
                                        "sortingDirection",
                                        "descending"
                                    );
                                } else {
                                    searchParams.set(
                                        "sortingDirection",
                                        "ascending"
                                    );
                                }

                                setSearchParams(searchParams);
                            }}
                        >
                            {sortingDirection === "ascending" ? (
                                <FontAwesomeIcon icon={faCaretUp} />
                            ) : (
                                <FontAwesomeIcon icon={faCaretDown} />
                            )}
                        </button>
                        <select
                            onChange={(e) => {
                                searchParams.set("sort", e.target.value);
                                setSearchParams(searchParams);
                            }}
                        >
                            <option value="index">Index</option>
                            <option value="availability">Availability</option>
                        </select>
                    </div>
                </div>
            </div>

            {petsData.map((pet) => (
                <PetCard key={pet.name} {...pet} toggleFound={toggleFound} />
            ))}
        </main>
    );
}

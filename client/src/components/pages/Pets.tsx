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

type Filter = "available" | "unknown" | "unavailable" | "found" | "notFound";
type SortingDirection = "ascending" | "descending";
type Sort = "index" | "availability";

const availabilityValues = {
    available: 0,
    unknown: 1,
    unavailable: 2
};

function Easter(Y: number) {
    var C = Math.floor(Y / 100);
    var N = Y - 19 * Math.floor(Y / 19);
    var K = Math.floor((C - 17) / 25);
    var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
    I -= 30 * Math.floor(I / 30);
    I -=
        Math.floor(I / 28) *
        (1 -
            Math.floor(I / 28) *
                Math.floor(29 / (I + 1)) *
                Math.floor((21 - N) / 11));
    var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
    J -= 7 * Math.floor(J / 7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40) / 44);
    var D = L + 28 - 31 * Math.floor(M / 4);

    return [M, D];
}

// events with fixed date/time
const filterableEvents: {
    [key: string]: () => boolean;
} = {
    "April Fools' Day": () => {
        const dt = new Date();
        return dt.getDate() === 1 && dt.getMonth() === 3;
    },
    "Birthday event": () => {
        const dt = new Date();
        return dt.getDate() === 22 && dt.getMonth() === 5;
    },
    "Valentine's day": () => {
        const dt = new Date();
        return dt.getDate() === 14 && dt.getMonth() === 1;
    },
    "New Year's Eve & Day": () => {
        const dt = new Date();
        return (
            (dt.getMonth() === 0 && dt.getDate() === 1) ||
            (dt.getMonth() === 11 && dt.getDate() === 31)
        );
    },
    "Friday the 13th": () => {
        const dt = new Date();
        return dt.getDay() === 5 && dt.getDate() === 13;
    },
    Easter: () => {
        const dt = new Date();
        const [M, D] = Easter(dt.getFullYear());

        return dt.getDate() === D && dt.getMonth() + 1 === M;
    }
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

function getSeason(date: Date): Season {
    const year = date.getFullYear();

    const springFrom = new Date(year, 2, 1);
    const springTo = new Date(year, 5, 0);

    const summerFrom = new Date(year, 5, 1);
    const summerTo = new Date(year, 8, 0);

    const fallFrom = new Date(year, 8, 1);
    const fallTo = new Date(year, 11, 0);

    if (springFrom <= date && date <= springTo) return "spring";
    if (summerFrom <= date && date <= summerTo) return "summer";
    if (fallFrom <= date && date <= fallTo) return "fall";
    else return "winter";
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
                !filterableEvents[pet.event.en]()
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
            if (getSeason(date) !== pet.season) {
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

import { useParams, useSearchParams } from "react-router-dom";
import { pets } from "../../data/pets";
import { Params } from "../../types";
import styles from "../../scss/Pets.module.scss";
import locs from "../../data/locs";
import { daysOfWeek } from "../../data/translation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { isAvailable } from "../../utils/utils";
import { PetCard, Filters } from "../.";
import { PetProps } from "../PetCard";

export type Filter = "available" | "unknown" | "unavailable" | "found" | "notFound";
type SortingDirection = "ascending" | "descending";
type Sort = "index" | "availability";

const availabilityValues = {
    available: 0,
    unknown: 1,
    unavailable: 2
};

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
    }, []);

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
                status: isAvailable(pet, date),
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
        <main className={styles["pets-main"]}>
            <div className={styles.filters}>
				<Filters />

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

			<div className={styles["pets-grid"]}>
				{petsData.map((pet) => (
					<PetCard key={pet.name} {...pet} toggleFound={toggleFound} />
				))}
			</div>
        </main>
    );
}

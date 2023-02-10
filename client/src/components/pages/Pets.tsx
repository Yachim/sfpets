import { useParams, useSearchParams } from "react-router-dom";
import { pets } from "../../data/pets";
import { Params } from "../../types";
import styles from "../../scss/Pets.module.scss";
import locs from "../../data/locs";
import { daysOfWeek } from "../../data/translation";
import { useEffect, useState } from "react";
import { isAvailable } from "../../utils/utils";
import { PetCard, Filters } from "../.";
import { PetProps } from "../PetCard";

export type Filter = "available" | "unknown" | "unavailable" | "found" | "notFound";

export function Pets() {
	const params = useParams<Params>();
	const lang = params.lang!;
	const element = params.element!;

	const [searchParams, setSearchParams] = useSearchParams();
	const filter: Filter[] = JSON.parse(
		searchParams.get("filter") ||
		'["available", "unknown", "unavailable", "found", "notFound"]'
	);

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

		setPetsData([...editedPets]);
	}, [
		JSON.stringify(filter),
		element,
		date,
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
			</div>

			<div className={styles["pets-grid"]}>
				{petsData.map((pet) => (
					<PetCard key={pet.name} {...pet} toggleFound={toggleFound} />
				))}
			</div>
		</main>
	);
}

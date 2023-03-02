import { useParams, useSearchParams } from "react-router-dom";
import { pets } from "../../data/pets";
import { Params } from "../../types";
import styles from "../../scss/Pets.module.scss";
import locs from "../../data/locs";
import { daysOfWeek } from "../../data/translation";
import { useContext, useEffect, useState } from "react";
import { isAvailable } from "../../utils/utils";
import { PetCard, Filters } from "../.";
import { PetProps } from "../PetCard";
import { useQuery } from "react-query";
import { getCharacter, isLoggedIn } from "../../queries";
import { SelectedCharacterContext } from "./Page";

export type Filter = "available" | "unknown" | "unavailable" | "found" | "notFound";

const elementList: ["shadow", "light", "earth", "fire", "water"] = ["shadow", "light", "earth", "fire", "water"];

export function Pets() {
	const params = useParams<Params>();
	const lang = params.lang!;
	const element = params.element;

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

	const characterContext = useContext(SelectedCharacterContext);

	const characterQuery = useQuery("character", () => getCharacter(characterContext.value), {
		enabled: isLoggedIn() && characterContext.value !== -1
	});

	useEffect(() => {
		let basePets = !element ? [...pets.shadow, ...pets.light, ...pets.earth, ...pets.fire, ...pets.water] : pets[element];
		let editedPets: PetProps[] = basePets.map((pet, i) => {
			let loc: string | null = null;
			if (pet.loc_index) loc = locs[pet.loc_index][lang];

			let day: string | null = null;
			if (pet.dayOfWeek !== null) day = daysOfWeek[pet.dayOfWeek][lang];

			let event: string | null = null;
			if (pet.event) event = pet.event[lang];

			const petIndexInElement = i % 20;

			// FIXME: This solution is a mess. I am sorry, at this point I am too tired.
			// don't think it will get fixed though
			const elementIndex = Math.floor(i / 20);
			const petElement = elementList[elementIndex];
			const foundForElement = characterQuery.isSuccess ? characterQuery.data[`${petElement}_found`] : [];
			const found = foundForElement.includes(petIndexInElement);

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
				index: petIndexInElement
			};
		});

		if (!element) {
			editedPets = editedPets.filter((pet) =>
				(pet.status === "available" || pet.status === "unknown") &&
				!pet.found
			)

			setPetsData([...editedPets]);
		}
		else {
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
		}
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
			{element && <div className={styles.filters}>
				<Filters />
			</div>}

			<div className={styles["pets-grid"]}>
				{petsData.map((pet) => <PetCard key={pet.name} petInfo={pet} toggleFound={toggleFound} />)}
			</div>
		</main>
	);
}

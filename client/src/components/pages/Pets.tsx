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
import { useMutation, useQuery } from "react-query";
import { getCharacter, isLoggedIn, patchCharacter } from "../../queries";
import { SelectedCharacterContext } from "./Page";
import { PetElement } from "../../types/pet";
import { queryClient } from "../../App";

export type Filter = "available" | "unknown" | "unavailable" | "found" | "notFound";

export function Pets() {
	const params = useParams<Params>();
	const lang = params.lang!;
	const element = params.element;

	const [searchParams] = useSearchParams();
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

	const characterMutation = useMutation(patchCharacter, {
		onSuccess: () => queryClient.invalidateQueries("character")
	});

	useEffect(() => {
		let basePets = !element ? [...pets.shadow, ...pets.light, ...pets.earth, ...pets.fire, ...pets.water] : pets[element];
		let editedPets: PetProps[] = basePets.map((pet) => {
			let loc: string | null = null;
			if (pet.loc_index) loc = locs[pet.loc_index][lang];

			let day: string | null = null;
			if (pet.dayOfWeek !== null) day = daysOfWeek[pet.dayOfWeek][lang];

			let event: string | null = null;
			if (pet.event) event = pet.event[lang];

			const foundForElement = characterQuery.isSuccess ? characterQuery.data[`${pet.element}_found`] : [];
			const found = foundForElement.includes(pet.index);

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
				index: pet.index,
				element: pet.element,
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
		JSON.stringify(characterQuery.data),
		element,
		date,
		characterQuery.status
	]);

	function toggleFound(index: number, element: PetElement, newVal: boolean) {
		if (characterQuery.isSuccess) {
			console.log("mutating")
			const key = `${element}_found` as const;
			const el_arr = characterQuery.data[key];

			if (!newVal && el_arr.includes(index)) {
				const i = el_arr.findIndex((val) => val === index);
				el_arr.splice(i!);
			}
			else {
				el_arr.push(index);
			}

			console.log(el_arr)

			characterMutation.mutate({
				...characterQuery.data,
				[key]: el_arr
			});
		}
		else {
			console.log("session")
			const i = petsData.findIndex((pet) =>
				pet.element === element && pet.index === index
			);

			petsData[i].found = newVal;
			setPetsData([...petsData]);
		}
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

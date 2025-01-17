import { useParams, useSearchParams } from "react-router-dom";
import { pets } from "../../data/pets";
import { Params } from "../../types";
import styles from "../../scss/Pets.module.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import { isAvailable } from "../../utils/utils";
import { PetCard, Filters } from "../.";
import { PetProps } from "../PetCard";
import { useMutation, useQuery } from "react-query";
import { getCharacter, isLoggedIn, patchCharacter } from "../../queries";
import { SelectedCharacterContext } from "./../Context";
import { PetElement } from "../../types";
import { queryClient } from "../../App";

export type Filter = "available" | "unknown" | "unavailable" | "found" | "notFound";

export function Pets() {
	const params = useParams<Params>();
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

	const characterQuery = useQuery(["character", characterContext.value], async () => getCharacter(characterContext.value), {
		enabled: isLoggedIn() && characterContext.value !== -1
	});

	const characterMutation = useMutation(patchCharacter, {
		onSuccess: () => queryClient.invalidateQueries("character")
	});

	useEffect(() => {
		let basePets = !element ? [...pets.shadow, ...pets.light, ...pets.earth, ...pets.fire, ...pets.water] : pets[element];
		let editedPets: PetProps[] = basePets.map((pet) => {
			const foundForElement = characterQuery.isSuccess ? characterQuery.data[`${pet.element}_found`] : [];
			const found = foundForElement.includes(pet.index);

			return {
				...pet,
				status: isAvailable(pet, date),
				found: found,
				toggleFound: (_1, _2, _3) => { }
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

	const toggleFound = useCallback((index: number, element: PetElement, newVal: boolean) => {
		if (characterQuery.isSuccess) {
			const key = `${element}_found` as const;
			const el_arr = characterQuery.data[key];

			if (!newVal && el_arr.includes(index)) {
				const i = el_arr.findIndex((val) => val === index);
				el_arr.splice(i!);
			}
			else {
				el_arr.push(index);
			}


			characterMutation.mutate({
				id: characterQuery.data.id,
				[key]: el_arr
			});
		}
		else {
			const i = petsData.findIndex((pet) =>
				pet.element === element && pet.index === index
			);

			petsData[i].found = newVal;
			setPetsData([...petsData]);
		}
	}, [JSON.stringify(petsData)])

	return (
		<main className={styles["pets-main"]}>
			{element && <div className={styles.filters}>
				<Filters />
			</div>}

			<div className={styles["pets-grid"]}>
				{petsData.map((pet, i) => <PetCard key={i} {...pet} toggleFound={toggleFound} />)}
			</div>
		</main>
	);
}

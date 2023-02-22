import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../App";
import { getCharacters, postCharacters, postLogout } from "../queries";
import styles from "../scss/UserSettings.module.scss";
import { SelectedCharacterContext } from "./pages/Page";

export function UserSettings() {
	const logoutMutation = useMutation(postLogout, {
		onSuccess: () => queryClient.invalidateQueries("account")
	})

	const [characterName, setCharacterName] = useState("");
	const [characterWorld, setCharacterWorld] = useState("");

	const characterMutation = useMutation(postCharacters, {
		onSuccess: () => queryClient.invalidateQueries("characters")
	});
	const charactersQuery = useQuery("characters", getCharacters);

	function handleSubmit(e: FormEvent) {
		if (characterName === "" || characterWorld === "") return;

		characterMutation.mutate({
			name: characterName,
			world: characterWorld
		});

		e.preventDefault();
	}

	const characterContext = useContext(SelectedCharacterContext);

	function changeCharacter(e: ChangeEvent<HTMLSelectElement>) {
		characterContext.setValue(+e.currentTarget.value);
	}

	return (
		<div className={styles.menu}>
			{characterMutation.isSuccess && <p>Character added</p>}
			{characterMutation.isError && <p>Error while adding character</p>}

			{charactersQuery.isSuccess && charactersQuery.data!.length > 0 && (
				<label>
					Character:
					<select onChange={changeCharacter}>
						{charactersQuery.data!.map((character, i) => (
							<option
								key={i}
								value={character.id}
							>
								{character.world} - {character.name}
							</option>
						))}
					</select>
				</label>
			)}

			<form
				className={styles["add-character-data"]}
				onSubmit={handleSubmit}
			>
				<label>Name:
					<input
						value={characterName}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setCharacterName(e.currentTarget.value)}
						type="text"
						maxLength={50}
					/>
				</label>
				<label>World:
					<input
						value={characterWorld}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setCharacterWorld(e.currentTarget.value)}
						type="text"
						maxLength={8}
					/>
				</label>

				<input
					disabled={characterWorld === "" || characterName === ""}
					type="submit"
					value="Add character"
				/>
			</form>

			<button
				className={styles["logout-button"]}
				onClick={() => logoutMutation.mutate()}
			>
				Log out
			</button>
		</div >
	)
}

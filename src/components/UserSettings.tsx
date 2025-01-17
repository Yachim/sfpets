import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../App";
import { userSettings } from "../data/translation";
import { createCharacter, deleteCharacter, getCharacters } from "../queries";
import styles from "../scss/UserSettings.module.scss";
import { LangContext, SelectedCharacterContext } from "./Context";
import { select } from "../data/translation/userSettings";

export function UserSettings(props: { closeFunc: () => void }) {
	const [characterName, setCharacterName] = useState("");
	const [characterWorld, setCharacterWorld] = useState("");

	const characterContext = useContext(SelectedCharacterContext);
	const langContext = useContext(LangContext);

	const charactersQuery = useQuery("characters", getCharacters);

	function handleSubmit(e: FormEvent) {
		if (characterName === "" || characterWorld === "") return;

		const id = createCharacter({
			name: characterName,
			world: characterWorld
		});
		characterContext.setValue(id);
		queryClient.invalidateQueries("characters");

		e.preventDefault();
	}

	function changeCharacter(e: ChangeEvent<HTMLSelectElement>) {
		characterContext.setValue(e.currentTarget.value);
		queryClient.invalidateQueries("character")
	}

	return (
		<div className={styles.menu} style={{
			top: document.querySelector("header")?.clientHeight
		}}>
			{charactersQuery.isSuccess && charactersQuery.data!.length > 0 && (
				<label>
					{userSettings.character[langContext.value]}:
					<select value={characterContext.value} onChange={changeCharacter}>
						<option disabled value="-1">-- {select[langContext.value]} --</option>
						{charactersQuery.data!.map((character, i) => (
							<option
								key={i}
								value={character.id}
							>
								{character.name} - {character.world}
							</option>
						))}
					</select>
				</label>
			)}

			<p className={styles["add-character-form-heading"]}>
				{userSettings.addCharacter[langContext.value]}
			</p>
			<form
				className={styles["add-character-data"]}
				onSubmit={handleSubmit}
			>
				<label>{userSettings.name[langContext.value]}:
					<input
						value={characterName}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setCharacterName(e.currentTarget.value)}
						type="text"
						maxLength={50}
					/>
				</label>
				<label>{userSettings.world[langContext.value]}:
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
					value={userSettings.addCharacter[langContext.value]}
				/>
			</form>

			<button
				className={styles["delete-button"]}
				disabled={characterContext.value === "-1"}
				onClick={() => {
					if (confirm(
						userSettings.deleteCurrentCharacterConfirmation[langContext.value]
					)) {
						deleteCharacter({ id: characterContext.value })
						queryClient.invalidateQueries("characters");
						queryClient.invalidateQueries("character");
						characterContext.setValue("-1")
					}
				}}
			>
				{userSettings.deleteCurrentCharacter[langContext.value]}
			</button>
		</div >
	)
}

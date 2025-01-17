import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../App";
import { userSettings } from "../data/translation";
import { deleteAccount, deleteCharacter, getCharacters, isLoggedIn, postCharacters, postLogout } from "../queries";
import styles from "../scss/UserSettings.module.scss";
import { LangContext, SelectedCharacterContext } from "./Context";

export function UserSettings(props: { closeFunc: () => void }) {
	const logoutMutation = useMutation(postLogout, {
		onSuccess: () => {
			queryClient.invalidateQueries("account");
			queryClient.invalidateQueries("characters");
			props.closeFunc();
			characterContext.setValue(-1);
		}
	})

	const [characterName, setCharacterName] = useState("");
	const [characterWorld, setCharacterWorld] = useState("");

	const characterMutation = useMutation(postCharacters, {
		onSuccess: (res) => {
			queryClient.invalidateQueries("characters");
			characterContext.setValue(res.id);
		}
	});
	const charactersQuery = useQuery("characters", getCharacters, {
		enabled: isLoggedIn()
	});

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

	const deleteAccountMutation = useMutation(deleteAccount, {
		onSuccess: () => {
			queryClient.invalidateQueries("account");

			characterContext.setValue(-1);

			queryClient.invalidateQueries("characters");
		}
	})
	const deleteCharacterMutation = useMutation(deleteCharacter, {
		onSuccess: (res) => {
			if (res.length > 0) {
				characterContext.setValue(res[0].id)
			}
			else {
				characterContext.setValue(-1);
			}

			queryClient.invalidateQueries("characters");
		}
	})

	const langContext = useContext(LangContext);

	return (
		<div className={styles.menu} style={{
			top: document.querySelector("header")?.clientHeight
		}}>
			{characterMutation.isSuccess &&
				<p>{userSettings.characterAddedSuccess[langContext.value]}</p>
			}
			{characterMutation.isError &&
				<p>{userSettings.characterAddedError[langContext.value]}</p>
			}

			{charactersQuery.isSuccess && charactersQuery.data!.length > 0 && (
				<label>
					{userSettings.character[langContext.value]}:
					<select value={characterContext.value} onChange={changeCharacter}>
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
				className={styles["logout-button"]}
				onClick={() => logoutMutation.mutate()}
			>
				{userSettings.logout[langContext.value]}
			</button>

			<button
				className={styles["delete-button"]}
				disabled={characterContext.value === -1}
				onClick={() => {
					if (confirm(
						userSettings.deleteCurrentCharacterConfirmation[langContext.value]
					)) {
						deleteCharacterMutation.mutate({ id: characterContext.value })
					}
				}}
			>
				{userSettings.deleteCurrentCharacter[langContext.value]}
			</button>

			<button
				className={styles["delete-button"]}
				onClick={() => {
					if (confirm(
						userSettings.deleteAccountConfirmation[langContext.value]
					)) {
						deleteAccountMutation.mutate()
					}
				}}
			>
				{userSettings.deleteAccount[langContext.value]}
			</button>
		</div >
	)
}

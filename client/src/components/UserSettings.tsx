import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { queryClient } from "../App";
import { postCharacters, postLogout } from "../queries";
import styles from "../scss/UserSettings.module.scss";

export function UserSettings() {
	const logoutMutation = useMutation(postLogout, {
		onSuccess: () => queryClient.invalidateQueries("account")
	})

	const [characterName, setCharacterName] = useState("");
	const [characterWorld, setCharacterWorld] = useState("");

	const characterMutation = useMutation(postCharacters)

	function handleSubmit(e: FormEvent) {
		if (characterName === "" || characterWorld === "") return;

		characterMutation.mutate({
			name: characterName,
			world: characterWorld
		});

		e.preventDefault();
	}

	return (
		<div className={styles.menu}>
			<form
				className={styles["add-character-data"]}
				onSubmit={handleSubmit}
			>
				{characterMutation.data?.status === "success" && <p>Character added</p>}
				{characterMutation.data?.status === "error" && <p>Error while adding character</p>}
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
		</div>
	)
}

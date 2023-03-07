import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../App";
import { deleteAccount, deleteCharacter, getCharacters, isLoggedIn, postCharacters, postLogout } from "../queries";
import styles from "../scss/UserSettings.module.scss";
import { SelectedCharacterContext } from "./Context";

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

	return (
		<div className={styles.menu} style={{
			top: document.querySelector("header")?.clientHeight
		}}>
			{characterMutation.isSuccess && <p>Character added</p>}
			{characterMutation.isError && <p>Error while adding character</p>}

			{charactersQuery.isSuccess && charactersQuery.data!.length > 0 && (
				<label>
					Character:
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

			<button
				className={styles["delete-button"]}
				disabled={characterContext.value === -1}
				onClick={() => {
					if (confirm("Are you sure you want to delete this character?")) {
						deleteCharacterMutation.mutate({ id: characterContext.value })
					}
				}}
			>
				Delete current character
			</button>

			<button
				className={styles["delete-button"]}
				onClick={() => {
					if (confirm("Are you sure you want to delete your account?")) {
						deleteAccountMutation.mutate()
					}
				}}
			>
				Delete account
			</button>
		</div >
	)
}

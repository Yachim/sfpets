import { faCircleUser, faLanguage, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../App";
import { mainHeading } from "../data/translation";
import { getCharacter, isLoggedIn, patchAccount } from "../queries";
import {
	DarkThemeContext,
	LangContext,
	LangSelectShownContext,
	LoginShownContext,
	SelectedCharacterContext,
	UserSettingsShownContext
} from "./Context";
import styles from "../scss/Header.module.scss";
import { Link } from "react-router-dom";

export function Header() {
	const darkThemeContext = useContext(DarkThemeContext);
	const langContext = useContext(LangContext);
	const userSettingsShownContext = useContext(UserSettingsShownContext);
	const loginShownContext = useContext(LoginShownContext);
	const langSelectShownContext = useContext(LangSelectShownContext);

	const themeIcon = darkThemeContext.value ? faSun : faMoon;

	function changeTheme() {
		if (isLoggedIn()) {
			accountMutation.mutate({
				dark_theme: !darkThemeContext.value
			})
		}
		else {
			darkThemeContext.setValue((prev) => !prev);
		}
	}

	const accountMutation = useMutation(patchAccount, {
		onSuccess: () => queryClient.invalidateQueries("account")
	});

	const characterContext = useContext(SelectedCharacterContext);

	const characterQuery = useQuery(["character", characterContext.value], async () => getCharacter(characterContext.value), {
		enabled: isLoggedIn() && characterContext.value !== -1
	});

	return (
		<header className={styles["top-bar"]} id="header">
			<div>
				<Link to={`../`}>
					<h1>{mainHeading[langContext.value]}</h1>
				</Link>
				<p className={styles["selected-character"]}>{
					isLoggedIn() ?
						(
							characterQuery.isSuccess ?
								<><b>{characterQuery.data.name}</b> - {characterQuery.data!.world}</> :
								"No character selected. Select a character to save."
						) :
						"Log in and add character to save."
				}</p>
			</div>
			<div className={styles["user-settings"]}>
				<button
					className={styles["user-settings-button"]}
					onClick={changeTheme}
				>
					<FontAwesomeIcon icon={themeIcon} />
				</button>
				<button
					className={styles["user-settings-button"]}
					onClick={() => langSelectShownContext.setValue((prev) => !prev)}
					id="lang-select-button"
				>
					<FontAwesomeIcon icon={faLanguage} />
				</button>

				<button
					onClick={
						isLoggedIn() ?
							() => userSettingsShownContext.setValue((prev) => !prev) :
							() => loginShownContext.setValue((prev) => !prev)
					}
					className={styles["user-settings-button"]}
				>
					<FontAwesomeIcon icon={faCircleUser} />
				</button>
			</div>
		</header>
	);
}

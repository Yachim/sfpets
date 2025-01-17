import { faCircleUser, faLanguage, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useQuery } from "react-query";
import { queryClient } from "../App";
import { header } from "../data/translation";
import { getCharacter, patchSettings } from "../queries";
import {
	DarkThemeContext,
	LangContext,
	LangSelectShownContext,
	SelectedCharacterContext,
	UserSettingsShownContext
} from "./Context";
import styles from "../scss/Header.module.scss";
import { Link } from "react-router-dom";

export function Header() {
	const darkThemeContext = useContext(DarkThemeContext);
	const langContext = useContext(LangContext);
	const userSettingsShownContext = useContext(UserSettingsShownContext);
	const langSelectShownContext = useContext(LangSelectShownContext);

	const themeIcon = darkThemeContext.value ? faSun : faMoon;

	function changeTheme() {
		patchSettings({
			darkTheme: !darkThemeContext.value
		})
		queryClient.invalidateQueries("settings")
	}

	const characterContext = useContext(SelectedCharacterContext);

	const characterQuery = useQuery(["character", characterContext.value], async () => getCharacter(characterContext.value), {
		enabled: characterContext.value !== "-1"
	});

	return (
		<header className={styles["top-bar"]} id="header">
			<div>
				<Link to={`../`}>
					<h1>{header.heading[langContext.value]}</h1>
				</Link>
				<p className={styles["selected-character"]}>{
					characterQuery.isSuccess ?
						<><b>{characterQuery.data.name}</b> - {characterQuery.data!.world}</> :
						header.subheadingLoggedIn[langContext.value]
				}</p>
			</div>
			<div className={styles["user-settings"]}>
				<button
					className={styles["user-settings-button"]}
					onClick={changeTheme}
					title={header.themeSwitchTitle[langContext.value]}
				>
					<FontAwesomeIcon icon={themeIcon} />
				</button>
				<button
					className={styles["user-settings-button"]}
					onClick={() => langSelectShownContext.setValue((prev) => !prev)}
					id="lang-select-button"
					title={header.langTitle[langContext.value]}
				>
					<FontAwesomeIcon icon={faLanguage} />
				</button>

				<button
					onClick={
						() => userSettingsShownContext.setValue((prev) => !prev)
					}
					className={styles["user-settings-button"]}
					title={
						header.userSettingsTitle[langContext.value]
					}
				>
					<FontAwesomeIcon icon={faCircleUser} />
				</button>
			</div>
		</header>
	);
}

import styles from "../../scss/Page.module.scss";
import { page } from "../../data/translation";
import { useContext, useEffect, useMemo } from "react";
import {
	PetInfoCard,
	Pets,
	UserSettings,
	Header,
	LanguageSelect,
	Nav
} from "..";
import { getDefaultLang, getSettings } from "../../queries";
import { useQuery } from "react-query";
import {
	DarkThemeContext,
	LangContext,
	LangSelectShownContext,
	PetCardContext,
	SelectedCharacterContext,
	UserSettingsShownContext
} from "../Context";

export function Page() {
	const langContext = useContext(LangContext);
	const darkThemeContext = useContext(DarkThemeContext);
	const characterContext = useContext(SelectedCharacterContext);
	const userSettingsShownContext = useContext(UserSettingsShownContext);
	const petCardContext = useContext(PetCardContext);
	const langSelectShownContext = useContext(LangSelectShownContext);

	useQuery("settings", getSettings, {
		onSuccess: (res) => {
			langContext.setValue(res.lang)
			darkThemeContext.setValue(res.darkTheme)
			if (characterContext.value === "-1" && res.lastCharacter !== "-1") characterContext.setValue(res.lastCharacter)
		}
	});

	document.title = page.title[langContext.value];
	document
		.querySelector("meta[name='description']")
		?.setAttribute("content", page.desc[langContext.value ?? getDefaultLang()]);

	const themeClass = useMemo(() => `${darkThemeContext.value ? "dark" : "light"}-theme`, [darkThemeContext.value])

	useEffect(() => {
		document.documentElement.classList.remove("dark-theme");
		document.documentElement.classList.remove("light-theme");

		document.documentElement.classList.add(themeClass);
	}, [themeClass]);

	return (
		<div
			className={styles.app}
		>
			{langSelectShownContext.value && <LanguageSelect closeFunc={() => langSelectShownContext.setValue(false)} />}
			{userSettingsShownContext.value && <UserSettings closeFunc={() => userSettingsShownContext.setValue(false)} />}
			{petCardContext.value && <PetInfoCard
				{...petCardContext.value}
				closeFunc={() => petCardContext.setValue(null)}
			/>}
			<div className={styles["modal-overlay"]} data-visible={
				langSelectShownContext.value || !!petCardContext.value
			} />

			<Header />

			<Nav />

			<Pets />
		</div>
	);
}

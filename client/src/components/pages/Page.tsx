import { Link, useParams, useSearchParams } from "react-router-dom";
import { Params } from "../../types";
import styles from "../../scss/Page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFire,
	faMoon,
	faSeedling,
	faSun,
	faWater
} from "@fortawesome/free-solid-svg-icons";
import { desc, Langs, title } from "../../data/translation";
import { CSSProperties, useEffect, useState, createContext, Dispatch, SetStateAction } from "react";
import { LoginMenu, PetInfoCard, Pets, UserSettings, Header } from "..";
import { PetProps } from "../PetCard";
import { getAccount, isLoggedIn } from "../../queries";
import { useQuery } from "react-query";
import { getLang } from "../../utils/utils";

export const LangContext = createContext<{
	value: Langs,
	setValue: (val: Langs) => void
}>({
	value: getLang(),
	setValue: (_) => { }
});

export const DarkThemeContext = createContext<{
	value: boolean,
	setValue: Dispatch<SetStateAction<boolean>>
}>({
	value: true,
	setValue: (_) => { }
});

export type PetInfoCardContextValueType = {
	current: PetProps | null,
	setValue: (current: PetProps | null) => void
};

export const PetInfoCardContext = createContext<PetInfoCardContextValueType>({
	current: null,
	setValue: (_) => { }
});

export type SelectedCharacterContextType = {
	value: number;
	setValue: (val: number) => void;
}
export const SelectedCharacterContext = createContext<SelectedCharacterContextType>({
	value: -1,
	setValue: (_) => { }
});

export const UserSettingsShownContext = createContext<{
	value: boolean,
	setValue: Dispatch<SetStateAction<boolean>>
}>({
	value: false,
	setValue: (_) => { }
});

export const LoginShownContext = createContext<{
	value: boolean,
	setValue: Dispatch<SetStateAction<boolean>>
}>({
	value: false,
	setValue: (_) => { }
});

export function Page() {
	const params = useParams<Params>();
	const element = params.element;

	const [searchParams] = useSearchParams();

	const [lang, setLang] = useState<Langs>(getLang());
	const [darkTheme, setDarkTheme] = useState(true);

	useQuery("account", getAccount, {
		enabled: isLoggedIn(),
		onSuccess: (res) => {
			setLang(res.lang)
			setDarkTheme(res.dark_theme)
		}
	});

	document.title = title[lang];
	document
		.querySelector("meta[name='description']")
		?.setAttribute("content", desc[lang]);

	function generateUrl(
		new_element: "shadow" | "light" | "earth" | "fire" | "water"
	) {
		return `../${new_element}?${searchParams.toString()}`;
	}

	const [loginShown, setLoginShown] = useState(false);
	const [userSettingsShown, setUserSettingsShown] = useState(false);
	const [petCard, setPetCard] = useState<PetProps | null>(null);

	const themeClass = `${darkTheme ? "dark" : "light"}-theme`;

	useEffect(() => {
		document.documentElement.classList.remove("dark-theme");
		document.documentElement.classList.remove("light-theme");

		document.documentElement.classList.add(themeClass);
	}, [themeClass]);

	const [selectedCharacter, setSelectedCharacter] = useState(-1);

	return (
		<LangContext.Provider value={{
			value: lang,
			setValue: setLang
		}}>
			<DarkThemeContext.Provider value={{
				value: darkTheme,
				setValue: setDarkTheme
			}}>
				<LoginShownContext.Provider value={{
					value: loginShown,
					setValue: setLoginShown
				}}>
					<UserSettingsShownContext.Provider value={{
						value: userSettingsShown,
						setValue: setUserSettingsShown
					}}>
						<SelectedCharacterContext.Provider value={{
							value: selectedCharacter,
							setValue: setSelectedCharacter
						}}>
							<PetInfoCardContext.Provider value={{
								current: petCard,
								setValue: setPetCard
							}}>
								<div
									className={styles.app}
									data-login-open={loginShown}
								>
									{loginShown && <LoginMenu closeFunc={() => setLoginShown(false)} />}
									{userSettingsShown && <UserSettings closeFunc={() => setUserSettingsShown(false)} />}
									{petCard && <PetInfoCard
										{...petCard}
										closeFunc={() => setPetCard(null)}
									/>}
									<div className={styles["modal-overlay"]} data-visible={loginShown || !!petCard} />

									<Header />

									<nav className={styles["nav-bar"]}>
										<Link
											to={generateUrl("shadow")}
											data-active={element === "shadow"}
											className={styles.icon}
											style={{ "--hover-color": "gray" } as CSSProperties}
										>
											<FontAwesomeIcon icon={faMoon} />
										</Link>
										<Link
											to={generateUrl("light")}
											data-active={element === "light"}
											className={styles.icon}
											style={{ "--hover-color": "yellow" } as CSSProperties}
										>
											<FontAwesomeIcon icon={faSun} />
										</Link>
										<Link
											to={generateUrl("earth")}
											data-active={element === "earth"}
											className={styles.icon}
											style={{ "--hover-color": "green" } as CSSProperties}
										>
											<FontAwesomeIcon icon={faSeedling} />
										</Link>
										<Link
											to={generateUrl("fire")}
											data-active={element === "fire"}
											className={styles.icon}
											style={{ "--hover-color": "orangered" } as CSSProperties}
										>
											<FontAwesomeIcon icon={faFire} />
										</Link>
										<Link
											to={generateUrl("water")}
											data-active={element === "water"}
											className={styles.icon}
											style={{ "--hover-color": "lightskyblue" } as CSSProperties}
										>
											<FontAwesomeIcon icon={faWater} />
										</Link>
									</nav>
									<Pets />
								</div>
							</PetInfoCardContext.Provider>
						</SelectedCharacterContext.Provider>
					</UserSettingsShownContext.Provider >
				</LoginShownContext.Provider >
			</DarkThemeContext.Provider >
		</LangContext.Provider >
	);
}

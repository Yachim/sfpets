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
import { desc, title } from "../../data/translation";
import { CSSProperties, useContext, useEffect } from "react";
import { LoginMenu, PetInfoCard, Pets, UserSettings, Header, LanguageSelect } from "..";
import { getAccount, isLoggedIn } from "../../queries";
import { useQuery } from "react-query";
import {
	DarkThemeContext,
	LangContext,
	LangSelectShownContext,
	LoginShownContext,
	PetCardContext,
	UserSettingsShownContext
} from "../Context";

export function Page() {
	const langContext = useContext(LangContext);
	const darkThemeContext = useContext(DarkThemeContext);
	const loginShownContext = useContext(LoginShownContext);
	const userSettingsShownContext = useContext(UserSettingsShownContext);
	const petCardContext = useContext(PetCardContext);
	const langSelectShownContext = useContext(LangSelectShownContext);

	const params = useParams<Params>();
	const element = params.element;

	const [searchParams] = useSearchParams();

	useQuery("account", getAccount, {
		enabled: isLoggedIn(),
		onSuccess: (res) => {
			langContext.setValue(res.lang)
			darkThemeContext.setValue(res.dark_theme)
		}
	});

	document.title = title[langContext.value];
	document
		.querySelector("meta[name='description']")
		?.setAttribute("content", desc[langContext.value]);

	function generateUrl(
		new_element: "shadow" | "light" | "earth" | "fire" | "water"
	) {
		return `../${new_element}?${searchParams.toString()}`;
	}

	const themeClass = `${darkThemeContext.value ? "dark" : "light"}-theme`;

	useEffect(() => {
		document.documentElement.classList.remove("dark-theme");
		document.documentElement.classList.remove("light-theme");

		document.documentElement.classList.add(themeClass);
	}, [themeClass]);

	return (
		<div
			className={styles.app}
			data-login-open={loginShownContext.value}
		>
			{langSelectShownContext.value && <LanguageSelect closeFunc={() => langSelectShownContext.setValue(false)} />}
			{loginShownContext.value && <LoginMenu closeFunc={() => loginShownContext.setValue(false)} />}
			{userSettingsShownContext.value && <UserSettings closeFunc={() => userSettingsShownContext.setValue(false)} />}
			{petCardContext.value && <PetInfoCard
				{...petCardContext.value}
				closeFunc={() => petCardContext.setValue(null)}
			/>}
			<div className={styles["modal-overlay"]} data-visible={
				langSelectShownContext.value || loginShownContext.value || !!petCardContext.value
			} />

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
	);
}

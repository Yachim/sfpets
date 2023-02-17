import { Link, useParams, useSearchParams } from "react-router-dom";
import { Params } from "../../types";
import styles from "../../scss/Page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleUser,
	faFire,
	faLanguage,
	faMoon,
	faSeedling,
	faSun,
	faWater
} from "@fortawesome/free-solid-svg-icons";
import { desc, mainHeading, title } from "../../data/translation";
import { CSSProperties, useEffect, useState, createContext } from "react";
import { LoginMenu, PetInfoCard, Pets } from "..";
import { PetProps } from "../PetCard";

export type PetInfoCardContextValueType = {
	current: PetProps | null,
	setValue: (current: PetProps | null) => void
};

export const PetInfoCardContext = createContext<PetInfoCardContextValueType>({
	current: null,
	setValue: (_) => { }
});

export function Page(props: { children?: React.ReactNode }) {
	const params = useParams<Params>();
	const lang = params.lang!;
	const element = params.element;

	const [searchParams] = useSearchParams();

	document.title = title[lang];
	document
		.querySelector("meta[name='description']")
		?.setAttribute("content", desc[lang]);

	function generateUrl(
		element: "shadow" | "light" | "earth" | "fire" | "water"
	) {
		return `../${lang}/${element}?${searchParams.toString()}`;
	}

	const [loginShown, setLoginShown] = useState(false);
	const [petCard, setPetCard] = useState<PetInfoCardContextValueType>({
		current: null,
		setValue: (current: PetProps | null) => {
			setPetCard(prevState => {
				prevState!.current = current;

				return { ...prevState };
			});
		}
	});
	const [darkTheme, setDarkTheme] = useState(true);

	const themeIcon = darkTheme ? faSun : faMoon;
	const themeClass = `${darkTheme ? "dark" : "light"}-theme`;

	useEffect(() => {
		document.documentElement.classList.remove("dark-theme");
		document.documentElement.classList.remove("light-theme");

		document.documentElement.classList.add(themeClass);
	}, [themeClass]);

	return (
		<PetInfoCardContext.Provider value={petCard}>
			<div
				className={styles.app}
				data-login-open={loginShown}
			>
				{loginShown && <LoginMenu closeFunc={() => setLoginShown(false)} />}
				{petCard.current && <PetInfoCard
					{...petCard.current}
					closeFunc={() => petCard.setValue(null)}
				/>}
				<div className={styles["modal-overlay"]} data-visible={loginShown || !!petCard.current} />

				<header className={styles["top-bar"]}>
					<Link to="../">
						<h1>{mainHeading[lang]}</h1>
					</Link>
					<div className={styles["user-settings"]}>
						<button
							className={styles["user-settings-button"]}
							onClick={() => setDarkTheme((prev) => !prev)}
						>
							<FontAwesomeIcon icon={themeIcon} />
						</button>
						<button
							className={styles["user-settings-button"]}
						>
							<FontAwesomeIcon icon={faLanguage} />
						</button>
						<button
							onClick={() => setLoginShown((prev) => !prev)}
							className={styles["user-settings-button"]}
						>
							<FontAwesomeIcon icon={faCircleUser} />
						</button>
					</div>
				</header>

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
	);
}

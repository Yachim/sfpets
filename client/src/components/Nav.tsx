import { faFire, faMoon, faSeedling, faSun, faWater } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useContext } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { elements } from "../data/translation";
import styles from "../scss/Nav.module.scss";
import { Params } from "../types";
import { LangContext } from "./Context";

export function Nav() {
	const params = useParams<Params>();
	const element = params.element;

	const [searchParams] = useSearchParams();

	function generateUrl(
		new_element: "shadow" | "light" | "earth" | "fire" | "water"
	) {
		return `../${new_element}?${searchParams.toString()}`;
	}

	const langContext = useContext(LangContext);

	return (
		<nav className={styles["nav-bar"]}>
			<Link
				to={generateUrl("shadow")}
				data-active={element === "shadow"}
				className={styles.icon}
				style={{ "--hover-color": "gray" } as CSSProperties}
				title={elements.shadow[langContext.value]}
			>
				<FontAwesomeIcon icon={faMoon} />
			</Link>
			<Link
				to={generateUrl("light")}
				data-active={element === "light"}
				className={styles.icon}
				style={{ "--hover-color": "yellow" } as CSSProperties}
				title={elements.light[langContext.value]}
			>
				<FontAwesomeIcon icon={faSun} />
			</Link>
			<Link
				to={generateUrl("earth")}
				data-active={element === "earth"}
				className={styles.icon}
				style={{ "--hover-color": "green" } as CSSProperties}
				title={elements.earth[langContext.value]}
			>
				<FontAwesomeIcon icon={faSeedling} />
			</Link>
			<Link
				to={generateUrl("fire")}
				data-active={element === "fire"}
				className={styles.icon}
				style={{ "--hover-color": "orangered" } as CSSProperties}
				title={elements.fire[langContext.value]}
			>
				<FontAwesomeIcon icon={faFire} />
			</Link>
			<Link
				to={generateUrl("water")}
				data-active={element === "water"}
				className={styles.icon}
				style={{ "--hover-color": "lightskyblue" } as CSSProperties}
				title={elements.water[langContext.value]}
			>
				<FontAwesomeIcon icon={faWater} />
			</Link>
		</nav>
	);
}

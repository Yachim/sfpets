import { faFire, faMoon, faSeedling, faSun, faWater } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import styles from "../scss/Nav.module.scss";
import { Params } from "../types";

export function Nav() {
	const params = useParams<Params>();
	const element = params.element;

	const [searchParams] = useSearchParams();

	function generateUrl(
		new_element: "shadow" | "light" | "earth" | "fire" | "water"
	) {
		return `../${new_element}?${searchParams.toString()}`;
	}

	return (
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
	);
}

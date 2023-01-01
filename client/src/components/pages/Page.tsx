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
import { desc, mainHeading, title } from "../../data/translation";
import { CSSProperties } from "react";

// TODO: implement hidden link
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

    return (
        <div className={styles.app}>
            <div className={styles["top-bar"]}>
                <Link to="../">
                    <h1>{mainHeading[lang]}</h1>
                </Link>
            </div>
            <nav className={styles["nav-bar"]}>
                <Link
                    to={generateUrl("shadow")}
                    data-active={element === "shadow"}
                    className={styles.icon}
					style={{"--hover-color": "gray"} as CSSProperties}
                >
                    <FontAwesomeIcon icon={faMoon} />
                </Link>
                <Link
                    to={generateUrl("light")}
                    data-active={element === "light"}
                    className={styles.icon}
					style={{"--hover-color": "yellow"} as CSSProperties}
                >
                    <FontAwesomeIcon icon={faSun} />
                </Link>
                <Link
                    to={generateUrl("earth")}
                    data-active={element === "earth"}
                    className={styles.icon}
					style={{"--hover-color": "green"} as CSSProperties}
                >
                    <FontAwesomeIcon icon={faSeedling} />
                </Link>
                <Link
                    to={generateUrl("fire")}
                    data-active={element === "fire"}
                    className={styles.icon}
					style={{"--hover-color": "orangered"} as CSSProperties}
                >
                    <FontAwesomeIcon icon={faFire} />
                </Link>
                <Link
                    to={generateUrl("water")}
                    data-active={element === "water"}
                    className={styles.icon}
					style={{"--hover-color": "lightskyblue"} as CSSProperties}
                >
                    <FontAwesomeIcon icon={faWater} />
                </Link>
            </nav>
            {props.children}
        </div>
    );
}

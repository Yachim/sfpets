import { Link, useParams } from "react-router-dom";
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

export function Page(props: { children?: React.ReactNode }) {
    const params = useParams<Params>();
    const lang = params.lang!;
    let element = "";
    if (params.element) element = params.element;

    document.title = title[lang];
    document
        .querySelector("meta[name='description']")
        ?.setAttribute("content", desc[lang]);

    return (
        <div className={styles.app}>
            <div className={styles["top-bar"]}>
                <Link to="../">
                    <h1>{mainHeading[lang]}</h1>
                </Link>
            </div>
            <nav className={styles["nav-bar"]}>
                <Link
                    to={`../${lang}/shadow`}
                    data-active={element === "shadow"}
                    className={styles["shadow-icon"]}
                >
                    <FontAwesomeIcon icon={faMoon} />
                </Link>
                <Link
                    to={`../${lang}/light`}
                    data-active={element === "light"}
                    className={styles["light-icon"]}
                >
                    <FontAwesomeIcon icon={faSun} />
                </Link>
                <Link
                    to={`../${lang}/earth`}
                    data-active={element === "earth"}
                    className={styles["earth-icon"]}
                >
                    <FontAwesomeIcon icon={faSeedling} />
                </Link>
                <Link
                    to={`../${lang}/fire`}
                    data-active={element === "fire"}
                    className={styles["fire-icon"]}
                >
                    <FontAwesomeIcon icon={faFire} />
                </Link>
                <Link
                    to={`../${lang}/water`}
                    data-active={element === "water"}
                    className={styles["water-icon"]}
                >
                    <FontAwesomeIcon icon={faWater} />
                </Link>
            </nav>
            {props.children}
        </div>
    );
}

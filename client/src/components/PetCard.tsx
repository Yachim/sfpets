import { useParams } from "react-router-dom";
import { Params } from "../types";
import styles from "../scss/PetCard.module.scss";
import { season, time } from "../data/translation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBroom,
    faCheck,
    faLeaf,
    faMoon,
    faSeedling,
    faSleigh,
    faSnowflake,
    faSun,
    faUmbrellaBeach,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

const timeIcons = {
    w_hour: faBroom,
    night: faMoon,
    day: faSun
};

const seasonIcons = {
    spring: faSeedling,
    summer: faUmbrellaBeach,
    fall: faLeaf,
    winter: faSnowflake,
    december: faSleigh
};

export type PetTimeProps = {
    dayOfWeek: string | null;
    event: string | null;
    time: "w_hour" | "night" | "day" | null;
    season: "spring" | "summer" | "fall" | "winter" | "december" | null;
};

export type PetProps = PetTimeProps & {
    name: string;
    location: string | null;
    status: "available" | "unknown" | "unavailable";
    img: string;
    found: boolean;
    index: number;
};

export function PetCard(
    props: PetProps & { toggleFound: (index: number, newVal: boolean) => void }
) {
    const params = useParams<Params>();
    const element = params.element!;
    const lang = params.lang!;

    let data: string[] = [];

    if (props.location) {
        data.push(props.location);
    }
    if (props.dayOfWeek) {
        data.push(props.dayOfWeek);
    }
    if (props.event) {
        data.push(props.event);
    }

    function TimeIcon() {
        if (props.time)
            return (
                <div>
                    <FontAwesomeIcon icon={timeIcons[props.time]} />
                    <span>{time[lang]}</span>
                </div>
            );
        return <></>;
    }

    function SeasonIcon() {
        if (props.season)
            return (
                <div>
                    <FontAwesomeIcon icon={seasonIcons[props.season]} />
                    <span>{season[lang]}</span>
                </div>
            );
        return <></>;
    }

    let indexClassList = [
        styles["pet-index"],
        styles[`pet-index--${props.status}`]
    ];

    function toggleFound() {
        const newStatus: boolean = !props.found;

        localStorage.setItem(
            `${element}-${props.index}`,
            JSON.stringify(newStatus)
        );

        props.toggleFound(props.index, newStatus);
    }

    return (
        <div className={styles["pet-card"]} data-found={props.found}>
            <img src={props.img} alt={props.name} />

            <div className={styles["pet-data"]}>
                <p>{data.join(" •\u00A0")}</p>
                <p>{props.name}</p>
            </div>

            <div className={styles["pet-info__wrapper"]}>
                {(props.time || props.season) && (
                    <div className={styles.icons}>
                        <TimeIcon />
                        <SeasonIcon />
                    </div>
                )}
                <button onClick={toggleFound} className={styles["change-status-icon"]}>
                    {props.found ? (
                        <FontAwesomeIcon
                            className={styles["x-icon"]}
                            icon={faXmark}
                        />
                    ) : (
                        <FontAwesomeIcon
                            className={styles["check-icon"]}
                            icon={faCheck}
                        />
                    )}
                </button>
            </div>

            <p className={indexClassList.join(" ")}>{props.index + 1}</p>
        </div>
    );
}

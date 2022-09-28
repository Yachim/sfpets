import { useParams } from "react-router-dom";
import { Params, Pet } from "../types";
import styles from "../scss/PetCard.module.scss";
import locs from "../data/locs";
import { daysOfWeek } from "../data/translation";
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
    faUmbrellaBeach
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

export function PetCard(props: Pet) {
    const lang = useParams<Params>().lang!;

    const name = props.names[lang];
    let data: string[] = [];

    if (props.loc_index) {
        const loc = locs[props.loc_index][lang];
        data.push(loc);
    }
    if (props.day_of_week) {
        const day = daysOfWeek[props.day_of_week - 1][lang];
        data.push(day);
    }
    if (props.event) {
        const event = props.event[lang];
        data.push(event);
    }

    function TimeIcon() {
        if (props.time) return <FontAwesomeIcon icon={timeIcons[props.time]} />;
        return <></>;
    }

    function SeasonIcon() {
        if (props.season)
            return <FontAwesomeIcon icon={seasonIcons[props.season]} />;
        return <></>;
    }

    return (
        <div className={styles["pet-card"]}>
            <img src={props.img} alt={props.names[lang]} />

            <div className={styles["pet-data"]}>
                <p>{data.join(" •\u00A0")}</p>
                <p>{name}</p>
            </div>

            <div className={styles["pet-info__wrapper"]}>
                {(props.time || props.season) && (
                    <p className={styles.icons}>
                        <TimeIcon />
                        <SeasonIcon />
                    </p>
                )}
                <button className={styles["remove-icon"]}>
                    <FontAwesomeIcon
                        className={styles["check-icon"]}
                        icon={faCheck}
                    />
                    {/* <FontAwesomeIcon
                        className={styles["x-icon"]}
                        icon={faXmark}
                    /> */}
                </button>
            </div>

            <p className={styles["pet-index"]}>{props.index}</p>
        </div>
    );
}

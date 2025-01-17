import {
	faBan,
	faBroom,
	faCalendar,
	faCheck,
	faCompass,
	faLeaf,
	faMagnifyingGlass,
	faMoon,
	faNoteSticky,
	faSeedling,
	faSleigh,
	faSnowflake,
	faStar,
	faSun,
	faUmbrellaBeach,
	faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext, useEffect } from "react";
import { daysOfWeek, locs, petInfoCard } from "../data/translation";
import styles from "../scss/PetInfoCard.module.scss";
import { LangContext } from "./Context";
import { PetProps } from "./PetCard";

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

const statusIcons = {
	available: faCheck,
	unavailable: faBan
}

export function PetInfoCard(props: PetProps & { closeFunc: () => void }) {
	const handleKeyPress = useCallback((e: KeyboardEvent) => {
		if (e.key === "Escape") {
			props.closeFunc()
		}
	}, [])

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);

		return () => document.removeEventListener("keydown", handleKeyPress);
	}, [handleKeyPress]);

	const langContext = useContext(LangContext);

	const name = props.names[langContext.value];
	const location = !!props.loc_index ? locs[props.loc_index][langContext.value] : null;
	const dayOfWeek = !!props.dayOfWeek ? daysOfWeek[props.dayOfWeek][langContext.value] : "";

	const timeTitle = !!props.time ? petInfoCard.time[props.time][langContext.value] : "";
	const seasonTitle = !!props.season ? petInfoCard.season[props.season][langContext.value] : "";
	const statusTitle = props.status !== "unknown" ? petInfoCard.status[props.status][langContext.value] : "";

	return (
		<div className={styles["pet-info-card"]}>
			<p className={styles["pet-name"]}>
				{props.index + 1}. {name}
				{(props.time || props.season || props.found || props.status !== "unknown") &&
					<span className={styles["pet-simple-info"]}>
						{props.time && <FontAwesomeIcon title={timeTitle} icon={timeIcons[props.time]} />}
						{props.season && <FontAwesomeIcon title={seasonTitle} icon={seasonIcons[props.season]} />}
						{props.found && <FontAwesomeIcon title="Found" icon={faMagnifyingGlass} />}
						{props.status !== "unknown" && <FontAwesomeIcon title={statusTitle} icon={statusIcons[props.status]} />}
					</span>
				}
			</p>
			<button onClick={props.closeFunc} className={styles["close-button"]}>
				<FontAwesomeIcon icon={faXmark} />
			</button>
			<img className={styles.img} src={props.img} alt={petInfoCard.image[langContext.value]} />
			<div className={styles["pet-data"]}>
				{location && <p className={styles["pet-attr"]}>
					<FontAwesomeIcon icon={faCompass} />{location}
				</p>}
				{props.dayOfWeek && <p className={styles["pet-attr"]}>
					<FontAwesomeIcon icon={faCalendar} />{dayOfWeek}
				</p>}
				{props.event && <p className={styles["pet-attr"]}>
					<FontAwesomeIcon icon={faStar} />{props.event[langContext.value]}
				</p>}
				{props.notes && <p className={styles["pet-attr"]}>
					<FontAwesomeIcon icon={faNoteSticky} />{props.notes[langContext.value]}
				</p>}
			</div>
		</div>
	);
}

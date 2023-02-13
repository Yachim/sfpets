import {
	faBan,
	faBroom,
	faCalendar,
	faCheck,
	faCompass,
	faLeaf,
	faMagnifyingGlass,
	faMoon,
	faSeedling,
	faSleigh,
	faSnowflake,
	faStar,
	faSun,
	faUmbrellaBeach,
	faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../scss/PetInfoCard.module.scss";
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
	return (
		<div className={styles["pet-info-card"]}>
			<p className={styles["pet-name"]}>
				{props.index + 1}. {props.name}
				{(props.time || props.season || props.found || props.status !== "unknown") &&
					<div className={styles["pet-simple-info"]}>
						{props.time && <FontAwesomeIcon title={props.time} icon={timeIcons[props.time]} />}
						{props.season && <FontAwesomeIcon title={props.season} icon={seasonIcons[props.season]} />}
						{props.found && <FontAwesomeIcon title="Found" icon={faMagnifyingGlass} />}
						{props.status !== "unknown" && <FontAwesomeIcon title={props.status} icon={statusIcons[props.status]} />}
					</div>
				}
			</p>
			<button onClick={props.closeFunc} className={styles["close-button"]}>
				<FontAwesomeIcon icon={faXmark} />
			</button>
			<img className={styles.img} src={props.img} />
			<div className={styles["pet-data"]}>
				{props.location && <p className={styles["pet-attr"]}>
					<FontAwesomeIcon icon={faCompass} />{props.location}
				</p>}
				{props.dayOfWeek && <p className={styles["pet-attr"]}>
					<FontAwesomeIcon icon={faCalendar} />{props.dayOfWeek}
				</p>}
				{props.event && <p className={styles["pet-attr"]}>
					<FontAwesomeIcon icon={faStar} />{props.event}
				</p>}
			</div>
		</div>
	);
}

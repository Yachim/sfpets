import { useParams } from "react-router-dom";
import { Params } from "../types";
import styles from "../scss/PetCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleInfo,
	faMagnifyingGlass,
	faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";

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
				{props.location && <p className={styles["pet-loc"]}>{props.location}</p>}
				<p>{props.name}</p>
			</div>

			<div className={styles["pet-info__wrapper"]}>
				<button onClick={toggleFound} className={styles["overlay-button"]}>
					{props.found ? (
						<>
							<FontAwesomeIcon
								className={styles["not-found-icon"]}
								icon={faMagnifyingGlassMinus}
							/>
							Not<br />Found
						</>
					) : (
						<>
							<FontAwesomeIcon
								className={styles["found-icon"]}
								icon={faMagnifyingGlass}
							/>
							Found
						</>
					)}
				</button>
				<button onClick={toggleFound} className={styles["overlay-button"]}>
					<FontAwesomeIcon
						className={styles["info-icon"]}
						icon={faCircleInfo}
					/>
					Info
				</button>
			</div>

			<p className={indexClassList.join(" ")}>{props.index + 1}</p>
		</div>
	);
}

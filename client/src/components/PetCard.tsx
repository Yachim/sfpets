import { useParams } from "react-router-dom";
import { Params } from "../types";
import styles from "../scss/PetCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleInfo,
	faMagnifyingGlass,
	faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { PetInfoCardContext } from "./pages/Page";

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
	props: { petInfo: PetProps, toggleFound: (index: number, newVal: boolean) => void }
) {
	const params = useParams<Params>();
	const element = params.element!;


	let indexClassList = [
		styles["pet-index"],
		styles[`pet-index--${props.petInfo.status}`]
	];

	function toggleFound() {
		const newStatus: boolean = !props.petInfo.found;

		localStorage.setItem(
			`${element}-${props.petInfo.index}`,
			JSON.stringify(newStatus)
		);

		props.toggleFound(props.petInfo.index, newStatus);
	}

	const context = useContext(PetInfoCardContext);

	return (
		<div className={styles["pet-card"]} data-found={props.petInfo.found}>
			<img src={props.petInfo.img} alt={props.petInfo.name} />

			<div className={styles["pet-data"]}>
				{props.petInfo.location && <p className={styles["pet-loc"]}>{props.petInfo.location}</p>}
				<p>{props.petInfo.name}</p>
			</div>

			<div className={styles["pet-info__wrapper"]}>
				<button onClick={toggleFound} className={styles["overlay-button"]}>
					{props.petInfo.found ? (
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
				<button
					className={styles["overlay-button"]}
					onClick={() => context.setValue(props.petInfo)}
				>
					<FontAwesomeIcon
						className={styles["info-icon"]}
						icon={faCircleInfo}
					/>
					Info
				</button>
			</div>

			<p className={indexClassList.join(" ")}>{props.petInfo.index + 1}</p>
		</div >
	);
}

import styles from "../scss/PetCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleInfo,
	faMagnifyingGlass,
	faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { PetCardContext } from "./Context";
import { PetElement } from "../types/pet";

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
	element: PetElement;
};

export function PetCard(
	props: {
		petInfo: PetProps,
		toggleFound: (index: number, element: PetElement, newVal: boolean) => void
	}
) {
	let indexClassList = [
		styles["pet-index"],
		styles[`pet-index--${props.petInfo.status}`]
	];

	const context = useContext(PetCardContext);

	return (
		<div className={styles["pet-card"]} data-found={props.petInfo.found}>
			<img src={props.petInfo.img} alt={props.petInfo.name} />

			<div className={styles["pet-data"]}>
				{props.petInfo.location && <p className={styles["pet-loc"]}>{props.petInfo.location}</p>}
				<p>{props.petInfo.name}</p>
			</div>

			<div className={styles["pet-info__wrapper"]}>
				<button onClick={() => {
					props.toggleFound(props.petInfo.index, props.petInfo.element, !props.petInfo.found)
				}} className={styles["overlay-button"]}>
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

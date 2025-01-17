import styles from "../scss/PetCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleInfo,
	faMagnifyingGlass,
	faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { LangContext, PetCardContext } from "./Context";
import { Pet, PetElement } from "../types";
import { locs, petCard } from "../data/translation";

export type PetProps = Pet & {
	status: "available" | "unknown" | "unavailable";
	found: boolean;
	toggleFound: (index: number, element: PetElement, newVal: boolean) => void;
};

export function PetCard(
	props: PetProps
) {
	let indexClassList = [
		styles["pet-index"],
		styles[`pet-index--${props.status}`]
	];

	const petCardContext = useContext(PetCardContext);
	const langContext = useContext(LangContext);

	const name = props.names[langContext.value];
	const location = !!props.loc_index ? locs[props.loc_index][langContext.value] : null;

	return (
		<div className={styles["pet-card"]} data-found={props.found}>
			<img src={props.img} alt={`${petCard.image[langContext.value]} ${name}`} />

			<div className={styles["pet-data"]}>
				{location && <p className={styles["pet-loc"]}>{location}</p>}
				<p>{name}</p>
			</div>

			<div className={styles["pet-info__wrapper"]}>
				<button onClick={() => {
					props.toggleFound(props.index, props.element, !props.found)
				}} className={styles["overlay-button"]}>
					{props.found ? (
						<>
							<FontAwesomeIcon
								className={styles["not-found-icon"]}
								icon={faMagnifyingGlassMinus}
							/>
							{petCard.notFound[langContext.value]}
						</>
					) : (
						<>
							<FontAwesomeIcon
								className={styles["found-icon"]}
								icon={faMagnifyingGlass}
							/>
							{petCard.found[langContext.value]}
						</>
					)}
				</button>
				<button
					className={styles["overlay-button"]}
					onClick={() => petCardContext.setValue(props)}
				>
					<FontAwesomeIcon
						className={styles["info-icon"]}
						icon={faCircleInfo}
					/>
					{petCard.info[langContext.value]}
				</button>
			</div>

			<p className={indexClassList.join(" ")}>{props.index + 1}</p>
		</div >
	);
}

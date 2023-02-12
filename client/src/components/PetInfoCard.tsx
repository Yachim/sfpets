import styles from "../scss/PetInfoCard.module.scss";
import { PetProps } from "./PetCard";

export function PetInfoCard(props: PetProps & { closeFunc: () => void }) {
	return (
		<div className={styles["pet-info-card"]}>
			<p>{props.name}</p>
			<button onClick={props.closeFunc}> Close</button>
		</div>
	);
}

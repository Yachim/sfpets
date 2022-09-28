import { useParams } from "react-router-dom";
import { pets } from "../../data/pets";
import { Params } from "../../types";
import styles from "../../scss/Pets.module.scss";
import { PetCard } from "../PetCard";

export function Pets() {
    const params = useParams<Params>();
    const element = params.element!;

    return (
        <div className={styles["pets-grid"]}>
            {pets[element].map((pet, i) => (
                <PetCard key={pet.names.cs} {...pet} />
            ))}
        </div>
    );
}

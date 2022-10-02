import { useParams } from "react-router-dom";
import { pets } from "../../data/pets";
import { Params } from "../../types";
import styles from "../../scss/Pets.module.scss";
import { PetCard, PetProps } from "../PetCard";
import locs from "../../data/locs";
import { daysOfWeek } from "../../data/translation";
import { useState } from "react";

function isAvailable() {}

export function Pets() {
    const params = useParams<Params>();
    const lang = params.lang!;
    const element = params.element!;

    const [petsData, setPetsData] = useState<PetProps[]>(
        pets[element].map((pet, i) => {
            let loc: string | null = null;
            if (pet.loc_index) loc = locs[pet.loc_index][lang];

            let day: string | null = null;
            if (pet.day_of_week) day = daysOfWeek[pet.day_of_week!][lang];

            let event: string | null = null;
            if (pet.event) event = pet.event![lang];

            let found: boolean = JSON.parse(
                localStorage.getItem(`${element}-${i}`) || "false"
            );

            return {
                name: pet.names[lang],
                location: loc,
                dayOfWeek: day,
                event: event,
                time: pet.time,
                season: pet.season,
                status: "available",
                img: pet.img,
                found: found,
                index: i
            };
        })
    );

    function toggleFound(index: number, newVal: boolean) {
        petsData[index].found = newVal;
        setPetsData([...petsData]);
    }

    return (
        <div className={styles["pets-grid"]}>
            {petsData.map((pet) => (
                <PetCard key={pet.name} {...pet} toggleFound={toggleFound} />
            ))}
        </div>
    );
}

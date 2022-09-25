import "../scss/Help.scss";
import { PetMock } from ".";
import earthPets from "../data/pets/earth";
import firePets from "../data/pets/fire";
import lightPets from "../data/pets/light";
import shadowPets from "../data/pets/shadow";
import waterPets from "../data/pets/water";
import { LangContext } from "../LangContext";
import { useContext } from "react";
import { state1, state2, state3, state4, state5 } from "../data/translation";

export function Help() {
    const lang = useContext(LangContext);

    return (
        <div className="help">
            <p>Rozlišení karet</p>
            <div className="help-pet-container">
                <PetMock {...shadowPets[0]} status={1} />
                <PetMock {...lightPets[0]} status={2} />
                <PetMock {...earthPets[0]} status={3} />
                <PetMock {...firePets[0]} status={4} />
                <PetMock {...waterPets[0]} status={5} />
                <span>{state1[lang]}</span>
                <span>{state2[lang]}</span>
                <span>{state3[lang]}</span>
                <span>{state4[lang]}</span>
                <span>{state5[lang]}</span>
            </div>
        </div>
    );
}

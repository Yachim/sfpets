import { Pet as PetType } from "../types";
import locs from "../data/locs.json";
import "../scss/Pet.scss";
import { LangContext } from "../LangContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faNoteSticky } from "@fortawesome/free-solid-svg-icons";

export function Pet(props: PetType) {
    const lang = useContext(LangContext);

    let location: string | null = null;
    if (props.loc_index) location = locs[props.loc_index][lang];

    return (
        <div>
            <h3>
                {props.names[lang]} ({props.index}.)
            </h3>
            <img alt="" src={props.img}></img>
            {location && (
                <p>
                    <FontAwesomeIcon icon={faMap} />
                    &nbsp;&nbsp;{location}
                </p>
            )}
            {props.notes && (
                <p>
                    <FontAwesomeIcon icon={faNoteSticky} />
                    &nbsp;&nbsp;
                    {props.notes[lang]}
                </p>
            )}
        </div>
    );
}

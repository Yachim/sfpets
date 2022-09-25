import { Pet as PetType } from "../types";
import locs from "../data/locs";
import "../scss/Pet.scss";
import { LangContext } from "../LangContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAward,
    faBroom,
    faCalendar,
    faMap,
    faMoon,
    faNoteSticky,
    faSun,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";

const honorTranslation = {
    cs: "věhlas",
    en: "honor"
};

export function Pet(props: PetType) {
    const lang = useContext(LangContext);

    let location: string | null = null;
    if (props.loc_index !== null) location = locs[props.loc_index][lang];

    let icon: IconDefinition | null = null;
    if (props.time === "w_hour") icon = faBroom;
    else if (props.time === "night") icon = faMoon;
    else if (props.time === "day") icon = faSun;

    return (
        <div className="pet-card">
            <h3>
                {props.names[lang]} ({props.index}.)
            </h3>
            {props.time && (
                <FontAwesomeIcon className="time-icon" icon={icon!} />
            )}
            <img alt="" src={props.img}></img>
            {location && (
                <p>
                    <FontAwesomeIcon icon={faMap} />
                    {location}
                </p>
            )}
            {props.event && (
                <p>
                    <FontAwesomeIcon icon={faCalendar} />
                    {props.event[lang]}
                </p>
            )}
            {props.hof && (
                <p>
                    <FontAwesomeIcon icon={faAward} />
                    {props.hof.type[lang]} top {props.hof.top}/
                    {honorTranslation[lang]} {props.hof.honor}
                </p>
            )}
            {props.notes && (
                <p>
                    <FontAwesomeIcon icon={faNoteSticky} />

                    {props.notes[lang]}
                </p>
            )}
        </div>
    );
}

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
    faBroom,
    faMoon,
    faSun,
    faMap,
    faCalendar,
    faAward,
    faNoteSticky
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import locs from "../data/locs";
import {
    honorTranslation,
    addTranslation,
    removeTranslation
} from "../data/translation";
import { LangContext } from "../LangContext";
import { Pet as PetType } from "../types";

export function PetMock(
    props: PetType & {
        status: 1 | 2 | 3 | 4 | 5;
    }
) {
    const lang = useContext(LangContext);

    let location: string | null = null;
    if (props.loc_index !== null) location = locs[props.loc_index][lang];

    let icon: IconDefinition | null = null;
    if (props.time === "w_hour") icon = faBroom;
    else if (props.time === "night") icon = faMoon;
    else if (props.time === "day") icon = faSun;

    const classes = `pet-mock pet-card pet-${props.status}`;

    return (
        <div className={classes}>
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

            {props.status === 5 ? (
                <p className="remove-add">{addTranslation[lang]}</p>
            ) : (
                <p className="remove-add">{removeTranslation[lang]}</p>
            )}
        </div>
    );
}

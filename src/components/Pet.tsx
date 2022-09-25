import { Pet as PetType } from "../types";
import locs from "../data/locs";
import "../scss/Pet.scss";
import { LangContext } from "../LangContext";
import { Dispatch, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAward,
    faBroom,
    faCalendar,
    faClock,
    faLeaf,
    faMap,
    faMoon,
    faNoteSticky,
    faSeedling,
    faSleigh,
    faSnowflake,
    faSun,
    faUmbrellaBeach,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {
    addTranslation,
    daysOfWeek,
    honorTranslation,
    removeTranslation
} from "../data/translation";

export function Pet(
    props: PetType & {
        status: 1 | 2 | 3 | 4 | 5;
        element: string;
        setState: Dispatch<React.SetStateAction<PetType[]>>;
    }
) {
    const lang = useContext(LangContext);

    let location: string | null = null;
    if (props.loc_index !== null) location = locs[props.loc_index][lang];

    let timeIcon: IconDefinition | null = null;
    if (props.time === "w_hour") timeIcon = faBroom;
    else if (props.time === "night") timeIcon = faMoon;
    else if (props.time === "day") timeIcon = faSun;

    let seasonIcon: IconDefinition | null = null;
    if (props.season === "spring") seasonIcon = faSeedling;
    else if (props.season === "summer") seasonIcon = faUmbrellaBeach;
    else if (props.season === "fall") seasonIcon = faLeaf;
    else if (props.season === "winter") seasonIcon = faSnowflake;
    else if (props.season === "december") seasonIcon = faSleigh;

    const classes = `pet-card pet-${props.status}`;

    function changeCompletion() {
        let completion = "1";
        if (props.status === 5) {
            completion = "0";
        }

        localStorage.setItem(`${props.element}-${props.index}`, completion);
        props.setState((state) => [...state]);
    }

    return (
        <div className={classes} onClick={changeCompletion}>
            <h3>
                {props.names[lang]} ({props.index}.)
            </h3>

            {timeIcon && (
                <FontAwesomeIcon className="time-icon" icon={timeIcon} />
            )}
            {seasonIcon && (
                <FontAwesomeIcon className="season-icon" icon={seasonIcon} />
            )}

            <img alt="" src={props.img}></img>
            {location && (
                <p>
                    <FontAwesomeIcon icon={faMap} />
                    {location}
                </p>
            )}
            {props.day_of_week && (
                <p>
                    <FontAwesomeIcon icon={faClock} />
                    {daysOfWeek[props.day_of_week - 1][lang]}
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

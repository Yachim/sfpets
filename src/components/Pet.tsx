import { Pet as PetType } from "../types";
import locs from "../data/locs";
import "../scss/Pet.scss";
import { LangContext } from "../LangContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAward,
    faCalendar,
    faMap,
    faNoteSticky
} from "@fortawesome/free-solid-svg-icons";

const honorTranslation = {
    cs: "věhlas",
    en: "honor"
};

export function Pet(props: PetType) {
    const lang = useContext(LangContext);

    let location: string | null = null;
    if (props.loc_index) location = locs[props.loc_index][lang];

    return (
        <div className="pet-card">
            <h3>
                {props.names[lang]} ({props.index}.)
            </h3>
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

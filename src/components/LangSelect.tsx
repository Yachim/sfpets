import { useContext } from "react";
import { Link } from "react-router-dom";
import { LangContext } from "../LangContext";
import "../scss/LangSelect.scss";

const langIcons = {
    en: [
        "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg",
        "en"
    ],
    cs: [
        "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
        "cs"
    ]
};

export function LangSelect() {
    const lang = useContext(LangContext);

    let newPath: string;
    if (lang === "en") newPath = "/cs";
    else newPath = "/en";

    return (
        <Link to={newPath}>
            <img alt={langIcons[lang][1]} src={langIcons[lang][0]} />
        </Link>
    );
}

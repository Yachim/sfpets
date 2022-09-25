import { useContext } from "react";
import { Link } from "react-router-dom";
import { LangContext } from "../LangContext";
import "../scss/LangSelect.scss";

const langIcons = {
    en: "🇨🇿",
    cs: "🇺🇸"
};

export function LangSelect() {
    const lang = useContext(LangContext);

    let newPath: string;
    if (lang === "en") newPath = "/cs";
    else newPath = "/en";

    return <Link to={newPath}>{langIcons[lang]}</Link>;
}

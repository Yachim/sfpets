import { useContext } from "react";
import { LangContext } from "../LangContext";
import "../scss/LangSelect.scss";

const langIcons = {
    cs: "🇨🇿",
    en: "🇺🇸"
};

export function LangSelect() {
    const lang = useContext(LangContext);

    let newPath: string;
    if (lang === "en") newPath = "cs";
    else newPath = "en";

    return <a href={newPath}>{langIcons[lang]}</a>;
}

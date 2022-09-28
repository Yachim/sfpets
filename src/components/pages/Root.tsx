import { Navigate, useParams } from "react-router-dom";
import { Langs, langList } from "../../data/translation";
import { Params } from "../../types";

export function Root() {
    const langParam = useParams<Params>().lang;

    let lang: Langs;
    if (langParam === undefined) {
        const localLang = navigator.language.slice(0, 2);
        // if no language equals to localLang
        if (langList.every((l) => l !== localLang)) {
            lang = "en";
        } else {
            lang = localLang as Langs;
        }
    } else {
        lang = langParam.slice(0, 2) as Langs;
    }
    const route = `/${lang}`;

    return <Navigate to={route} />;
}

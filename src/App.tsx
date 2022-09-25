import { useState } from "react";
import { DayOfWeek, Pet as PetType, Season, Time } from "./types";
import earthPets from "./data/pets/earth";
import firePets from "./data/pets/fire";
import lightPets from "./data/pets/light";
import shadowPets from "./data/pets/shadow";
import waterPets from "./data/pets/water";
import { Pet, LangSelect } from "./components";
import "./scss/App.scss";
import { LangContext } from "./LangContext";
import { useParams } from "react-router-dom";

function Easter(Y: number) {
    var C = Math.floor(Y / 100);
    var N = Y - 19 * Math.floor(Y / 19);
    var K = Math.floor((C - 17) / 25);
    var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
    I -= 30 * Math.floor(I / 30);
    I -=
        Math.floor(I / 28) *
        (1 -
            Math.floor(I / 28) *
                Math.floor(29 / (I + 1)) *
                Math.floor((21 - N) / 11));
    var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
    J -= 7 * Math.floor(J / 7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40) / 44);
    var D = L + 28 - 31 * Math.floor(M / 4);

    return [M, D];
}

// events with fixed date/time
const filterableEvents: {
    [key: string]: () => boolean;
} = {
    "April Fools' Day": () => {
        const dt = new Date();
        return dt.getDate() === 1 && dt.getMonth() === 3;
    },
    "Birthday event": () => {
        const dt = new Date();
        return dt.getDate() === 22 && dt.getMonth() === 5;
    },
    "Valentine's day": () => {
        const dt = new Date();
        return dt.getDate() === 14 && dt.getMonth() === 1;
    },
    "New Year's Eve & Day": () => {
        const dt = new Date();
        return (
            (dt.getMonth() === 0 && dt.getDate() === 1) ||
            (dt.getMonth() === 11 && dt.getDate() === 31)
        );
    },
    "Friday the 13th": () => {
        const dt = new Date();
        return dt.getDay() === 5 && dt.getDate() === 13;
    },
    Easter: () => {
        const dt = new Date();
        const [M, D] = Easter(dt.getFullYear());

        return dt.getDate() === D && dt.getMonth() + 1 === M;
    }
    // "Pentecost/Whitsun": () => {
    //     const dt = new Date();
    //     const year = dt.getFullYear();
    //     const [M, D] = Easter(year);

    //     const whitsunDate = new Date(year, M, D + 49);

    //     return (
    //         dt.getDate() === whitsunDate.getDate() &&
    //         dt.getMonth() === whitsunDate.getMonth()
    //     );
    // }
};

function filterTimeExclusivePets(
    pets: PetType[],
    day_of_week: DayOfWeek,
    day_or_night: Time,
    isWHour: boolean,
    season: Season,
    month: number
) {
    return pets.filter((pet: PetType) => {
        if (pet.event) {
            if (!(pet.event.en in filterableEvents)) return false;
            if (!filterableEvents[pet.event.en]()) return false;
        }

        if (!(!pet.day_of_week || pet.day_of_week === day_of_week))
            return false;
        if (
            !(
                !pet.time ||
                pet.time === day_or_night ||
                (pet.time === "w_hour" && isWHour)
            )
        )
            return false;
        if (
            !(
                !pet.season ||
                pet.season === season ||
                (pet.season === "december" && month === 11)
            )
        )
            return false;
        if (!pet.day_of_week && !pet.time && !pet.season && !pet.event)
            return false;

        return true;
    });
}

function filterNotTimeExclusivePets(
    pets: PetType[],
    day_of_week: DayOfWeek,
    day_or_night: Time,
    isWHour: boolean,
    season: Season,
    month: number
) {
    return pets.filter(
        (pet: PetType) =>
            !pet.day_of_week && !pet.time && !pet.season && !pet.event
    );
}

function filterEventExclusivePets(
    pets: PetType[],
    day_of_week: DayOfWeek,
    day_or_night: Time,
    isWHour: boolean,
    season: Season,
    month: number
) {
    return pets.filter(
        (pet: PetType) => pet.event && !(pet.event.en in filterableEvents)
    );
}

function getSeason(date: Date): Season {
    const year = date.getFullYear();

    const springFrom = new Date(year, 2, 1);
    const springTo = new Date(year, 5, 0);

    const summerFrom = new Date(year, 5, 1);
    const summerTo = new Date(year, 8, 0);

    const fallFrom = new Date(year, 8, 1);
    const fallTo = new Date(year, 11, 0);

    if (springFrom <= date && date <= springTo) return "spring";
    if (summerFrom <= date && date <= summerTo) return "summer";
    if (fallFrom <= date && date <= fallTo) return "fall";
    else return "winter";
}

const mainHeading = {
    cs: "Dnešní mazlíčci",
    en: "Today's pets"
};

const timeExHeading = {
    cs: "Vázané na dnešek",
    en: "Bound to today"
};

const eventExHeading = {
    cs: "Vázané na event",
    en: "Bound to an event"
};

const timenotExHeading = {
    cs: "Nevázané ani na čas, ani event (většinou s extra požadavky)",
    en: "Not bound to a time or event (usually with extra requirements)"
};

const title = {
    cs: "SfGame dnešní mazlíčci",
    en: "SfGame today's pets"
};

const desc = {
    cs: "Dnešní mazlíčci na Shakes and Fidget",
    en: "Today's pets on Shakes and Fidget"
};

function App() {
    const [date] = useState(new Date());
    const [dayOfWeek] = useState<DayOfWeek>(date.getDay() as DayOfWeek);
    const [day] = useState(date.getDate());
    const [month] = useState(date.getMonth());
    const [year] = useState(date.getFullYear());

    const [from] = useState(new Date(year, month, day, 6));
    const [to] = useState(new Date(year, month, day, 18));
    const [dayOrNight] = useState<"day" | "night">(
        from < date && date < to ? "day" : "night"
    );

    const [fromWHour] = useState(new Date(year, month, day, 0));
    const [toWHour] = useState(new Date(year, month, day, 1));
    const [isWHour] = useState(fromWHour < date && date < toWHour);

    const [season] = useState<Season>(getSeason(date));

    const args: [DayOfWeek, Time, boolean, Season, number] = [
        dayOfWeek,
        dayOrNight,
        isWHour,
        season,
        month
    ];
    const [earthTimeExclusive] = useState(
        filterTimeExclusivePets(earthPets, ...args)
    );
    const [fireTimeExclusive] = useState(
        filterTimeExclusivePets(firePets, ...args)
    );
    const [lightTimeExclusive] = useState(
        filterTimeExclusivePets(lightPets, ...args)
    );
    const [shadowTimeExclusive] = useState(
        filterTimeExclusivePets(shadowPets, ...args)
    );
    const [waterTimeExcluxive] = useState(
        filterTimeExclusivePets(waterPets, ...args)
    );

    const [earthEventExclusive] = useState(
        filterEventExclusivePets(earthPets, ...args)
    );
    const [fireEventExclusive] = useState(
        filterEventExclusivePets(firePets, ...args)
    );
    const [lightEventExclusive] = useState(
        filterEventExclusivePets(lightPets, ...args)
    );
    const [shadowEventExclusive] = useState(
        filterEventExclusivePets(shadowPets, ...args)
    );
    const [waterEventExcluxive] = useState(
        filterEventExclusivePets(waterPets, ...args)
    );

    const [earthNotTimeExclusive] = useState(
        filterNotTimeExclusivePets(earthPets, ...args)
    );
    const [fireNotTimeExclusive] = useState(
        filterNotTimeExclusivePets(firePets, ...args)
    );
    const [lightNotTimeExclusive] = useState(
        filterNotTimeExclusivePets(lightPets, ...args)
    );
    const [shadowNotTimeExclusive] = useState(
        filterNotTimeExclusivePets(shadowPets, ...args)
    );
    const [waterNotTimeExcluxive] = useState(
        filterNotTimeExclusivePets(waterPets, ...args)
    );

    const params = useParams();

    const lang = params.lang as "en" | "cs";

    document.title = title[lang];
    document
        .querySelector("meta[name='description']")
        ?.setAttribute("content", desc[lang]);

    return (
        <LangContext.Provider value={lang}>
            <div className="App">
                <LangSelect />

                <main>
                    <h1>{mainHeading[lang]}</h1>
                    <h2>{timeExHeading[lang]}</h2>
                    <div className="container">
                        <div className="element-container">
                            {shadowTimeExclusive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                        <div className="element-container">
                            {lightTimeExclusive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                        <div className="element-container">
                            {earthTimeExclusive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                        <div className="element-container">
                            {fireTimeExclusive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                        <div className="element-container">
                            {waterTimeExcluxive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                    </div>

                    <h2>{eventExHeading[lang]}</h2>
                    <div className="container">
                        <div className="element-container">
                            {shadowEventExclusive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                        <div className="element-container">
                            {lightEventExclusive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                        <div className="element-container">
                            {earthEventExclusive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                        <div className="element-container">
                            {fireEventExclusive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                        <div className="element-container">
                            {waterEventExcluxive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                    </div>

                    <h2>{timenotExHeading[lang]}</h2>
                    <div className="container">
                        <div className="element-container">
                            {shadowNotTimeExclusive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                        <div className="element-container">
                            {lightNotTimeExclusive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                        <div className="element-container">
                            {earthNotTimeExclusive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                        <div className="element-container">
                            {fireNotTimeExclusive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                        <div className="element-container">
                            {waterNotTimeExcluxive.map((pet, i) => (
                                <Pet key={i} {...pet} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </LangContext.Provider>
    );
}

export default App;

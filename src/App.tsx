import { useState } from "react";
import { DayOfWeek, Pet as PetType, Season, Time } from "./types";
import ePets from "./data/pets/earth.json";
import fPets from "./data/pets/fire.json";
import lPets from "./data/pets/light.json";
import sPets from "./data/pets/shadow.json";
import wPets from "./data/pets/water.json";
import { Pet } from "./components";
import "./scss/App.scss";
import { LangContext } from "./LangContext";
import { LangSelect } from "./components/LangSelect";
import { useParams } from "react-router-dom";

const earthPets: PetType[] = ePets as PetType[];
const firePets: PetType[] = fPets as PetType[];
const lightPets: PetType[] = lPets as PetType[];
const shadowPets: PetType[] = sPets as PetType[];
const waterPets: PetType[] = wPets as PetType[];

function filterTimeExclusivePets(
    pets: PetType[],
    day_of_week: DayOfWeek,
    day_or_night: Time,
    isWHour: boolean,
    season: Season,
    month: number
) {
    return pets.filter((pet: PetType) => {
        if (pet.event) return false;

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
        if (!pet.day_of_week && !pet.time && !pet.season) return false;

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
    return pets.filter((pet: PetType) => pet.event);
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
    en: "Not bound to a time or event (usualy with extra requirements)"
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

    return (
        <LangContext.Provider value={lang}>
            <div className="App">
                <h1>{mainHeading[lang]}</h1>
                <h2>{timeExHeading[lang]}</h2>
                <div className="pet-container">
                    <div>
                        {shadowTimeExclusive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {lightTimeExclusive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {earthTimeExclusive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {fireTimeExclusive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {waterTimeExcluxive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                </div>

                <h2>{eventExHeading[lang]}</h2>
                <div className="pet-container">
                    <div>
                        {shadowEventExclusive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {lightEventExclusive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {earthEventExclusive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {fireEventExclusive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {waterEventExcluxive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                </div>

                <h2>{timenotExHeading[lang]}</h2>
                <div className="pet-container">
                    <div>
                        {shadowNotTimeExclusive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {lightNotTimeExclusive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {earthNotTimeExclusive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {fireNotTimeExclusive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {waterNotTimeExcluxive.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                </div>

                <LangSelect />
            </div>
        </LangContext.Provider>
    );
}

export default App;

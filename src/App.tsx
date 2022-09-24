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

const earthPets: PetType[] = ePets as PetType[];
const firePets: PetType[] = fPets as PetType[];
const lightPets: PetType[] = lPets as PetType[];
const shadowPets: PetType[] = sPets as PetType[];
const waterPets: PetType[] = wPets as PetType[];

function filterPets(
    pets: PetType[],
    day_of_week: DayOfWeek,
    day_or_night: Time,
    isWHour: boolean,
    season: Season,
    month: number
) {
    return pets.filter((pet: PetType) => {
        if (!(pet.day_of_week === null || pet.day_of_week === day_of_week))
            return false;
        if (
            !(
                pet.time === null ||
                pet.time === day_or_night ||
                (pet.time === "w_hour" && isWHour)
            )
        )
            return false;
        if (
            !(
                pet.season === null ||
                pet.season === season ||
                (pet.season === "december" && month === 11)
            )
        )
            return false;

        return true;
    });
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

const headings = {
    cs: "Dnešní mazlíčci",
    en: "Today's pets"
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
    const [isWHour] = useState(fromWHour < date && toWHour < date);

    const [season] = useState<Season>(getSeason(date));

    const args: [DayOfWeek, Time, boolean, Season, number] = [
        dayOfWeek,
        dayOrNight,
        isWHour,
        season,
        month
    ];
    const [earthTimeAvailable] = useState(filterPets(earthPets, ...args));
    const [fireTimeAvailable] = useState(filterPets(firePets, ...args));
    const [lightTimeAvailable] = useState(filterPets(lightPets, ...args));
    const [shadowTimeAvailable] = useState(filterPets(shadowPets, ...args));
    const [waterTimeAvailable] = useState(filterPets(waterPets, ...args));

    const [lang, setLang] = useState<"en" | "cs">("en");

    return (
        <LangContext.Provider value={lang}>
            <div className="App">
                <h1>{headings[lang]}</h1>
                <div className="pet-container">
                    <div>
                        {shadowTimeAvailable.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {lightTimeAvailable.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {earthTimeAvailable.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {fireTimeAvailable.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                    <div>
                        {waterTimeAvailable.map((pet, i) => (
                            <Pet key={i} {...pet} />
                        ))}
                    </div>
                </div>
            </div>
        </LangContext.Provider>
    );
}

export default App;

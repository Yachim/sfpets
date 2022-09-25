import { useState, useEffect } from "react";
import { DayOfWeek, Pet as PetType, Season } from "./types";
import ePets from "./data/pets/earth";
import fPets from "./data/pets/fire";
import lPets from "./data/pets/light";
import sPets from "./data/pets/shadow";
import wPets from "./data/pets/water";
import { Pet, LangSelect, Help } from "./components";
import "./scss/App.scss";
import { LangContext } from "./LangContext";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { title, desc, mainHeading } from "./data/translation";

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

function App() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setDate(new Date());
        }, 60000);

        return () => clearInterval(id);
    }, [setDate]);

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

    const params = useParams();

    const lang = params.lang as "en" | "cs";

    document.title = title[lang];
    document
        .querySelector("meta[name='description']")
        ?.setAttribute("content", desc[lang]);

    // 1 = only now, 2 = always, 3 = event, 4 = not available
    function getPetStatus(pet: PetType, element: string): 1 | 2 | 3 | 4 | 5 {
        const data = localStorage.getItem(`${element}-${pet.index}`);
        if (data === "1") {
            return 5;
        }

        if (!pet.day_of_week && !pet.time && !pet.season && !pet.event)
            return 2;
        if (pet.event && !(pet.event.en in filterableEvents)) return 3;

        if (pet.event) {
            if (!(pet.event.en in filterableEvents)) return 4;
            if (!filterableEvents[pet.event.en]()) return 4;
        }

        if (!(!pet.day_of_week || pet.day_of_week === dayOfWeek)) return 4;
        if (
            !(
                !pet.time ||
                pet.time === dayOrNight ||
                (pet.time === "w_hour" && isWHour)
            )
        )
            return 4;
        if (
            !(
                !pet.season ||
                pet.season === season ||
                (pet.season === "december" && month === 11)
            )
        )
            return 4;
        if (!pet.day_of_week && !pet.time && !pet.season && !pet.event)
            return 4;

        return 1;
    }

    function sortPets(pets: PetType[], element: string) {
        return pets
            .map((pet) => ({
                pet: pet,
                status: getPetStatus(pet, element)
            }))
            .sort((a, b) => a.status - b.status);
    }

    const [shadowPets, setShadowPets] = useState(sPets);
    const [lightPets, setLightPets] = useState(lPets);
    const [earthPets, setEarthPets] = useState(ePets);
    const [firePets, setFirePets] = useState(fPets);
    const [waterPets, setWaterPets] = useState(wPets);

    const shadowPetsStatus = sortPets(shadowPets, "shadow");
    const lightPetsStatus = sortPets(lightPets, "light");
    const earthPetsStatus = sortPets(earthPets, "earth");
    const firePetsStatus = sortPets(firePets, "fire");
    const waterPetsStatus = sortPets(waterPets, "water");

    const [helpVisible, setHelpVisible] = useState(false);

    return (
        <LangContext.Provider value={lang}>
            <div className="App">
                {helpVisible && <Help />}

                <h1>
                    {mainHeading[lang]} - {date.getDate()}. {date.getMonth()}.{" "}
                    {date.getFullYear()} {date.getHours()}:{date.getMinutes()}
                </h1>

                <nav>
                    <LangSelect />
                    <button onClick={() => setHelpVisible((prev) => !prev)}>
                        <FontAwesomeIcon icon={faQuestion} />
                    </button>
                </nav>

                <main>
                    <div className="container">
                        <div className="element-container">
                            {shadowPetsStatus.map((pet, i) => (
                                <Pet
                                    key={i}
                                    {...pet.pet}
                                    status={pet.status}
                                    element="shadow"
                                    setState={setShadowPets}
                                />
                            ))}
                        </div>
                        <div className="element-container">
                            {lightPetsStatus.map((pet, i) => (
                                <Pet
                                    key={i}
                                    {...pet.pet}
                                    status={pet.status}
                                    element="light"
                                    setState={setLightPets}
                                />
                            ))}
                        </div>
                        <div className="element-container">
                            {earthPetsStatus.map((pet, i) => (
                                <Pet
                                    key={i}
                                    {...pet.pet}
                                    status={pet.status}
                                    element="earth"
                                    setState={setEarthPets}
                                />
                            ))}
                        </div>
                        <div className="element-container">
                            {firePetsStatus.map((pet, i) => (
                                <Pet
                                    key={i}
                                    {...pet.pet}
                                    status={pet.status}
                                    element="fire"
                                    setState={setFirePets}
                                />
                            ))}
                        </div>
                        <div className="element-container">
                            {waterPetsStatus.map((pet, i) => (
                                <Pet
                                    key={i}
                                    {...pet.pet}
                                    status={pet.status}
                                    element="water"
                                    setState={setWaterPets}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </LangContext.Provider>
    );
}

export default App;

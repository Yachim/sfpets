type Time = "day" | "night" | "w_hour" | null;
type LocIndex = number | null;
type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7 | null;
type Season = null | "spring" | "summer" | "fall" | "winter" | "december";

type Pet = {
    names: {
        en: string;
        cs: string;
    };
    loc_index: LocIndex;
    time: Time;
    day_of_week: DayOfWeek;
    event: null | string;
    season: Season;
    hof: {
        type: "";
        top: number;
        honor: number;
    };
    notes: null | {
        cs: string;
        en: string;
    };
    img: string;
};

export default Pet;
export { Time, LocIndex, DayOfWeek, Season };

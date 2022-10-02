import { Pet } from "../../types";

const earthPets: Pet[] = [
    {
        names: { en: "Mamoton", cs: "Mamuton" },
        loc_index: 19,
        time: "day",
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet1.jpg"
    },
    {
        names: { en: "Monkorrage", cs: "Opopěst" },
        loc_index: 6,
        time: "night",
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet2.jpg"
    },
    {
        names: { en: "Smaponyck", cs: "Pyskoník" },
        loc_index: 3,
        time: "day",
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet3.jpg"
    },
    {
        names: { en: "Bittnutz", cs: "Kruťovevruch" },
        loc_index: null,
        time: "day",
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet4.jpg"
    },
    {
        names: { en: "Roarear", cs: "Řevoval" },
        loc_index: 11,
        time: "night",
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet5.jpg"
    },
    {
        names: { en: "Muscudon", cs: "Krutokel" },
        loc_index: 20,
        time: "day",
        day_of_week: null,
        event: null,
        season: "summer",
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet6.jpg"
    },
    {
        names: { en: "Apstick", cs: "Klackopice" },
        loc_index: 1,
        time: "day",
        day_of_week: null,
        event: null,
        season: "fall",
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet7.jpg"
    },
    {
        names: { en: "Horrnington", cs: "Kozobuch" },
        loc_index: 16,
        time: "day",
        day_of_week: null,
        event: null,
        season: "winter",
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet8.jpg"
    },
    {
        names: { en: "Boaringg", cs: "Vepřokul" },
        loc_index: 8,
        time: "day",
        day_of_week: null,
        event: null,
        season: "spring",
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet9.jpg"
    },
    {
        names: { en: "Mameloth", cs: "Kulokam" },
        loc_index: 10,
        time: "night",
        day_of_week: 7,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet10.jpg"
    },
    {
        names: { en: "Rheynooh", cs: "Nosorohub" },
        loc_index: 7,
        time: "day",
        day_of_week: 1,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet11.jpg"
    },
    {
        names: { en: "Rockastonn", cs: "Kamenolam" },
        loc_index: 2,
        time: "night",
        day_of_week: 2,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet12.jpg"
    },
    {
        names: { en: "Redwoofox", cs: "Rudoliška" },
        loc_index: 4,
        time: "day",
        day_of_week: 3,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet13.jpg"
    },
    {
        names: { en: "Lilbeatzup", cs: "Osinečka" },
        loc_index: 13,
        time: "day",
        day_of_week: 4,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet14.jpg"
    },
    {
        names: { en: "Forror", cs: "Stromochod" },
        loc_index: 7,
        time: null,
        day_of_week: null,
        event: {
            cs: "Velikonoce",
            en: "Easter"
        },
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet15.jpg"
    },
    {
        names: { en: "Nipprabs", cs: "Krabokul" },
        loc_index: 17,
        time: null,
        day_of_week: null,
        event: {
            cs: "Svatudušní neděle",
            en: "Pentecost/Whitsun"
        },
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet16.jpg"
    },
    {
        names: { en: "Armoruck", cs: "Obrňouch" },
        loc_index: 12,
        time: null,
        day_of_week: null,
        event: {
            cs: "Vše je zlato, co se třpytí",
            en: "Glorious galore"
        },
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet17.jpg"
    },
    {
        names: { en: "Canocle", cs: "Zlatozub" },
        loc_index: 19,
        time: null,
        day_of_week: null,
        event: null,
        season: null,
        hof: {
            type: {
                cs: "Pevnost",
                en: "Fortress"
            },
            top: 100,
            honor: 2500
        },
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet18.jpg"
    },
    {
        names: { en: "Tricerawood", cs: "Kořenomlat" },
        loc_index: null,
        time: null,
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: {
            cs: "Lze nalézt v dolu na drahokamy.",
            en: "Found in the gem mine."
        },
        img: "https://en.sfporadnik.pl/img/pets/earth-pet19.jpg"
    },
    {
        names: { en: "Mouthrexor", cs: "Obrotlam" },
        loc_index: 9,
        time: null,
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/earth-pet20.jpg"
    }
];

export default earthPets;

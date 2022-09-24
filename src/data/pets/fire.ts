import { Pet } from "../../types";

const firePets: Pet[] = [
    {
        names: { en: "Firimp", cs: "Rožík" },
        loc_index: 10,
        time: "day",
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet1.jpg",
        index: 1
    },
    {
        names: { en: "Gullps", cs: "Tydýt" },
        loc_index: 5,
        time: "night",
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet2.jpg",
        index: 2
    },
    {
        names: { en: "Pyrophibus", cs: "Žabopal" },
        loc_index: 1,
        time: "night",
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet3.jpg",
        index: 3
    },
    {
        names: { en: "Flamechirr", cs: "Ohňolet" },
        loc_index: 20,
        time: "day",
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet4.jpg",
        index: 4
    },
    {
        names: { en: "Tectospit", cs: "Škrtopliv" },
        loc_index: 2,
        time: "night",
        day_of_week: 2,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet5.jpg",
        index: 5
    },
    {
        names: { en: "Pyroplant", cs: "Pyrozel" },
        loc_index: 9,
        time: "night",
        day_of_week: null,
        event: null,
        season: "fall",
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet6.jpg",
        index: 6
    },
    {
        names: { en: "Kokofire", cs: "Kokoheň" },
        loc_index: 16,
        time: "day",
        day_of_week: 1,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet7.jpg",
        index: 7
    },
    {
        names: { en: "Peppryon", cs: "Pulcožár" },
        loc_index: 18,
        time: "day",
        day_of_week: null,
        event: null,
        season: "spring",
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet8.jpg",
        index: 8
    },
    {
        names: { en: "Boomywoomy", cs: "Bombin" },
        loc_index: 12,
        time: "day",
        day_of_week: null,
        event: null,
        season: "winter",
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet9.jpg",
        index: 9
    },
    {
        names: { en: "Tikiricky", cs: "Kmenožár" },
        loc_index: 17,
        time: "night",
        day_of_week: 3,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet10.jpg",
        index: 10
    },
    {
        names: { en: "Matchlit", cs: "Krabkin" },
        loc_index: 19,
        time: "day",
        day_of_week: 4,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet11.jpg",
        index: 11
    },
    {
        names: { en: "Birblazey", cs: "Ptakopal" },
        loc_index: 0,
        time: "day",
        day_of_week: null,
        event: null,
        season: "summer",
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet12.jpg",
        index: 12
    },
    {
        names: { en: "Infernox", cs: "Ohňotřas" },
        loc_index: 8,
        time: "day",
        day_of_week: 5,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet13.jpg",
        index: 13
    },
    {
        names: { en: "Humbuzzish", cs: "Hmyzozlat" },
        loc_index: 4,
        time: "night",
        day_of_week: 6,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet14.jpg",
        index: 14
    },
    {
        names: { en: "Dragopyr", cs: "Drakopýr" },
        loc_index: null,
        time: null,
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: {
            cs: "Lze koupit ve zbrojírně.",
            en: "Bought from the weapon shop."
        },
        img: "https://en.sfporadnik.pl/img/pets/fire-pet15.jpg",
        index: 15
    },
    {
        names: { en: "Mantiflame", cs: "Kudloheň" },
        loc_index: 7,
        time: null,
        day_of_week: null,
        event: {
            cs: "Zametání před vlastním prahem",
            en: "Tidy Toilet Time"
        },
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet16.jpg",
        index: 16
    },
    {
        names: { en: "Finnettle", cs: "Ryboheň" },
        loc_index: 5,
        time: null,
        day_of_week: null,
        event: {
            cs: "Valentýn",
            en: "Valentine's day"
        },
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet17.jpg",
        index: 17
    },
    {
        names: { en: "Etrock", cs: "Raketčík" },
        loc_index: 4,
        time: null,
        day_of_week: null,
        event: {
            cs: "Silvestr a Nový rok",
            en: "New Year's Eve & Day"
        },
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet18.jpg",
        index: 18
    },
    {
        names: { en: "Blazingtongues", cs: "Peklobliz" },
        loc_index: 15,
        time: null,
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: {
            cs: "Musí být vyčištěn démonický portál v režimu pro jednoho hráče.",
            en: "Single-player demon portal needs to be cleared."
        },
        img: "https://en.sfporadnik.pl/img/pets/fire-pet19.jpg",
        index: 19
    },
    {
        names: { en: "Devastator", cs: "Devastor" },
        loc_index: 6,
        time: null,
        day_of_week: null,
        event: null,
        season: null,
        hof: null,
        notes: null,
        img: "https://en.sfporadnik.pl/img/pets/fire-pet20.jpg",
        index: 20
    }
];

export default firePets;

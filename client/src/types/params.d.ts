import { pets } from "../data/pets";
import { Langs } from "../data/translation";

export type Params = {
    lang: Langs;
    element: keyof typeof pets;
};

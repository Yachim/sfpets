import { pets } from "../data/pets";
import { Langs } from "../data/translation";

type Params = {
	lang: Langs;
	element: keyof typeof pets;
};

export default Params;

import { pets } from "../data/pets";

type PetElement = keyof typeof pets;

export default PetElement;

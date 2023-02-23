import { heroes } from "../data/heroes";

/**
 * Return the hero from the heroes array whose id matches the id argument.
 * @param id - The id of the hero you want to find.
 * @returns The hero object with the matching id.
 */
export const getHeroById = (id) => {
  return heroes.find((hero) => hero.id === id);
};

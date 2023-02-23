import { heroes } from "../data/heroes";

/**
 * It takes a name as a parameter, and returns an array of heroes whose superhero name contains the
 * name parameter.
 * @param [name] - The name of the hero you want to search for.
 * @returns An array of objects.
 */
export const getHeroesByName = (name = "") => {
  name = name.toLocaleLowerCase().trim();

  if (name.length === 0) return [];

  return heroes.filter((hero) =>
    hero.superhero.toLocaleLowerCase().includes(name)
  );
};

import { heroes } from "../data/heroes";

/**
 * It takes a publisher name as an argument and returns an array of heroes that belong to that
 * publisher
 * @param publisher - The publisher of the heroes we want to retrieve.
 * @returns An array of objects.
 */
export const getHeroesByPublisher = (publisher) => {
  const validPublishers = ["DC Comics", "Marvel Comics"];
  if (!validPublishers.includes(publisher)) {
    throw new Error("Invalid publisher");
  }

  return heroes.filter((hero) => hero.publisher === publisher);
};

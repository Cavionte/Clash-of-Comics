const superHeros = "https://akabab.github.io/superhero-api/api/all.json";

export const fetchCharacters = () => {
  return fetch(superHeros)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get gang");
      }
      return response.json();
    })
    .then((heroes) => {
      console.log({ heroes });

      const fighters = heroes.map((hero) => ({
        id: hero.id,
        name: hero.name,
        stats: {
          intelligence: hero.powerstats.intelligence,
          strength: hero.powerstats.strength,
          speed: hero.powerstats.speed,
          durability: hero.powerstats.durability,
          power: hero.powerstats.power,
          combat: hero.powerstats.combat,
        },
        smallImg: hero.images.sm.endsWith("/no-portrait.jpg")
          ? "https://i.pinimg.com/736x/a8/33/9c/a8339cffe5af9c3d99c51d2f20660239.jpg"
          : hero.images.sm,
      }));
      console.log(fighters);
      return fighters;
    })
    .catch((err) => {
      console.warn(err.message);
      throw err;
    });
};

export const getIndividualCharacter = (id) => {
  return fetch(`https://akabab.github.io/superhero-api/api/id/${id}.json`)
    .then((char) => {
      if (!char.ok) {
        throw new Error("Failed to get the one");
      }
      return char.json();
    })
    .then((hero) => {
      const fighter = {
        id: hero.id,
        name: hero.name,
        stats: {
          intelligence: hero.powerstats.intelligence,
          strength: hero.powerstats.strength,
          speed: hero.powerstats.speed,
          durability: hero.powerstats.durability,
          power: hero.powerstats.power,
          combat: hero.powerstats.combat,
          img: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/${
            hero.id
          }-${hero.name.toLowerCase().replace(/ /g, "-")}.jpg`,
        },
      };
      console.log(fighter);
      return fighter;
    });
};

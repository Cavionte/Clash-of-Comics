import "./style.css";
import { fetchCharacters, getIndividualCharacter } from "./fetchFunctions";

import { renderCharacters } from "./renderFunctions";

document.querySelector("#app").innerHTML = `
  <header>Clash of Comics</header>
   <div id="playerone"></div>
   <div id="playertwo"></div>
   <button>FIGHT!</button>
   <button>Search</button>
   <div id="fighters"><ul></ul></div>
`;
const charList = document.querySelector("#fighters ul");
const main = () => {
  fetchCharacters()
    .then((char) => {
      renderCharacters(charList, char);
    })
    .catch((error) => {
      console.error("Looks like you're alone in this one.", error);
    });
      getIndividualCharacter(1);
  };

main();

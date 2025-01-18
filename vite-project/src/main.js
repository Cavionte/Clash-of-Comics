import "./style.css";
import { fetchCharacters, getIndividualCharacter } from "./fetchFunctions";

import {
  renderCharacters,
  renderPlayerOne,
  renderPlayerTwo,
} from "./renderFunctions";

document.querySelector("#app").innerHTML = `
  <header>Clash of Comics</header>
   <div id="players-container">
      <div id="playerone" class='selected'></div>
      <img src="src/images/vs.gif" alt="VS" id="vs-image">
      <div id="playertwo" class='selected'></div>
    </div>
   <button>FIGHT!</button>
   <button>Search</button>
   <div id="fighters"><ul></ul></div>
`;
const charList = document.querySelector("#fighters ul");
const playerOneDiv = document.querySelector("#playerone");
const playerTwoDiv = document.querySelector("#playertwo");
const main = () => {
  fetchCharacters()
    .then((char) => {
      renderCharacters(charList, char);
    })
    // .then((char) => {
    //   if (char) {
    //     renderPlayerOne(playerOneDiv, fighter);
    //     const playerOneButton = document.querySelectorAll(".player-one");
    //     playerOneButton.addEventlistener("click", (event) => {
    //       if (event.target.tagName === "BUTTON") {
    //         const id= event.target.getAttribute("data-id");
    //         getIndividualCharacter(id);
    //     });
    //   }
    // })
    .catch((error) => {
      console.error("Looks like you're alone in this one.", error);
    });

  document.addEventListener("click", (e) => {
    if (e.target.matches(".player-one")) {
      const id = e.target.dataset.id;
      getIndividualCharacter(id)
        .then((fighter) => renderPlayerOne(playerOneDiv, fighter))
        .catch((error) => {
          console.error("Looks like the this fighter called out.", error);
        });
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches(".player-two")) {
      const id = e.target.dataset.id;
      getIndividualCharacter(id)
        .then((fighter) => renderPlayerTwo(playerTwoDiv, fighter))
        .catch((error) => {
          console.error("Looks like the this fighter called out.", error);
        });
    }
  });
};

main();

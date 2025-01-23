import "./style.css";
import { fetchCharacters, getIndividualCharacter } from "./fetchFunctions";

import {
  renderBattle,
  renderCharacters,
  renderPlayerOne,
  renderPlayerTwo,
} from "./renderFunctions";

document.querySelector("#app").innerHTML = `
  <header>Clash of Comics</header>
   <div id="players-container">
      <div id="playerone" class='selected'>
      <img src="src/images/squareup.jpg" alt="placeholder fighter meme" id="placeholder1">
      <h2>Select Fighter</h2>
      </div>
      <img src="src/images/vs.gif" alt="VS" id="vs-image">
      <div id="playertwo" class='selected'>
      <img src="src/images/squareup.jpg" alt="placeholder fighter meme" id="placeholder2">
      <h2>Select Fighter</h2>
      </div>
    </div>
   <button id="start">FIGHT!</button>
   
   <div id="fighters"><ul></ul></div>
`;
const charList = document.querySelector("#fighters ul");
const playerOneDiv = document.querySelector("#playerone");
const playerTwoDiv = document.querySelector("#playertwo");
const fightDiv = document.querySelector("#app");
const openButton = document.querySelector("#start");
const fighterOne = document.querySelector("#fighter-one");
const fighterTwo = document.querySelector("#fighter-two");
const main = async () => {
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
        .then((fighter) => renderPlayerOne(fighterOne, playerOneDiv, fighter))
        .catch((error) => {
          console.error("Looks like the this fighter called out.", error);
        });
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches(".player-two")) {
      const id = e.target.dataset.id;
      getIndividualCharacter(id)
        .then((fighter) => renderPlayerTwo(fighterTwo, playerTwoDiv, fighter))
        .catch((error) => {
          console.error("Looks like the this fighter called out.", error);
        });
    }
  });
  openButton.addEventListener("click", () => {
    renderBattle(openButton, fightDiv);
  });
  // Animations
  const fighterOne = document.getElementById("fighterOne");
  const fighterTwo = document.getElementById("fighterTwo");
  const winner = document.getElementById("winner");
  const cartoon = document.getElementsByClassName("the-fight");
  // Start the animation
};

main();

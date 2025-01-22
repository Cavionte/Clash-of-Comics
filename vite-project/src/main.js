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
   <div id="playerone"></div>
   <div id="playertwo"></div>
   <button>FIGHT!</button>
   <button id="finder">Search</button>
   <label for="site-search">Find Your Fighter:</label>
  <input type="text" id="site-search" name="q" />
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
   <button>Search</button>
   <div id="fighters"><ul></ul></div>
`;
const charList = document.querySelector("#fighters ul");
const playerOneDiv = document.querySelector("#playerone");
const playerTwoDiv = document.querySelector("#playertwo");
const fightDiv = document.querySelector("#app");
const openButton = document.querySelector("#start");
const fighterOne = document.querySelector("#fighter-one");
const fighterTwo = document.querySelector("#fighter-two");
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

  // Start the animation
  setTimeout(() => {
    // Remove fighters after collision
    fighterOne.style.transition = "opacity 1s";
    fighterTwo.style.transition = "opacity 1s";
    fighterOne.style.opacity = 0;
    fighterTwo.style.opacity = 0;

    // Show the winner after 3 seconds
    setTimeout(() => {
      fighterOne.style.display = "none";
      fighterTwo.style.display = "none";
      winner.classList.remove("hidden");
      winner.style.opacity = 1; // Fade-in effect
    }, 3000); // Wait for the collision animation to finish
  }, 2000); // Start after fighters collide
};

main();

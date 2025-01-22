import { getIndividualCharacter } from "./fetchFunctions";

export const renderCharacters = (charList, fighters) => {
  charList.innerHTML = ""; // Clear existing list
  fighters.forEach((char) => {
    const listItem = document.createElement("li"); // Correctly create "li" element
    listItem.classList.add("character-card");
    listItem.dataset.id = char.id;

    const name = document.createElement("h2");
    name.textContent = char.name;
    listItem.appendChild(name);
    const img = document.createElement("img");

    img.src = char.smallImg;
    img.alt = char.name;
    listItem.appendChild(img);

    const statsButton = document.createElement("button");
    statsButton.textContent = "Stats";
    listItem.appendChild(statsButton);

    const statsList = document.createElement("dialog");
    statsList.innerHTML = `
        <h3>${char.name}</h3>
        <ul>
          <li>Intelligence: ${char.stats.intelligence}</li>
          <li>Strength: ${char.stats.strength}</li>
          <li>Speed: ${char.stats.speed}</li>
          <li>Durability: ${char.stats.durability}</li>
          <li>Power: ${char.stats.power}</li>
          <li>Combat: ${char.stats.combat}</li>
        </ul>
        <button class="close-dialog">Close</button>
      `;
    listItem.appendChild(statsList);

    statsButton.addEventListener("click", () => {
      statsList.showModal();
    });

    statsList.querySelector(".close-dialog").addEventListener("click", () => {
      statsList.close();
    });

    const playerOneButton = document.createElement("button");
    playerOneButton.classList.add("player-one");
    playerOneButton.textContent = "Select Player 1";
    playerOneButton.dataset.id = char.id;
    // playerOneButton.addEventListener("click", () => {
    //   getIndividualCharacter(char.id).then(
    //     renderPlayerOne(playerOneDiv, fighter)
    //   );
    // });

    listItem.appendChild(playerOneButton);
    const playerTwoButton = document.createElement("button");
    playerTwoButton.classList.add("player-two");
    playerTwoButton.textContent = "Select Player 2";
    playerTwoButton.dataset.id = char.id;
    listItem.appendChild(playerTwoButton);

    charList.appendChild(listItem);
  });
};
export const renderPlayerOne = (fighterOne, playerOneDiv, fighter) => {
  playerOneDiv.innerHTML = "";
  playerOneDiv.classList.add("select-one");
  let fighterImg = document.createElement("img");
  fighterImg.src = fighter.stats.img;
  fighterImg.alt = fighter.name;
  fighterImg.classList.add("select-one");
  fighterImg.dataset.score =
    fighter.stats.intelligence +
    fighter.stats.strength +
    fighter.stats.speed +
    fighter.stats.durability +
    fighter.stats.power +
    fighter.stats.combat;

  playerOneDiv.appendChild(fighterImg);

  let fightersName = document.createElement("h2");
  fightersName.textContent = fighter.name;
  playerOneDiv.appendChild(fightersName);

  // fighterOne.src = fighter.stats.img;
  // fighterOne.dataset.sum =
  //   fighter.stats.intelligence +
  //   fighter.stats.strength +
  //   fighter.stats.speed +
  //   fighter.stats.durability +
  //   fighter.stats.power +
  //   fighter.stats.combat;
};

export const renderPlayerTwo = (fighterTwo, playerTwoDiv, fighter) => {
  playerTwoDiv.innerHTML = "";
  playerTwoDiv.classList.add("select-two");
  let fighterImg = document.createElement("img");
  fighterImg.src = fighter.stats.img;
  fighterImg.alt = fighter.name;
  fighterImg.classList.add("select-two");
  fighterImg.dataset.score =
    fighter.stats.intelligence +
    fighter.stats.strength +
    fighter.stats.speed +
    fighter.stats.durability +
    fighter.stats.power +
    fighter.stats.combat;
  playerTwoDiv.appendChild(fighterImg);

  let fightersName = document.createElement("h2");
  fightersName.textContent = fighter.name;
  playerTwoDiv.appendChild(fightersName);

  // fighterTwo.src = fighter.stats.img;
  // fighterTwo.dataset.sum =
  //   fighter.stats.intelligence +
  //   fighter.stats.strength +
  //   fighter.stats.speed +
  //   fighter.stats.durability +
  //   fighter.stats.power +
  //   fighter.stats.combat;
};

export const renderBattle = (openButton, fightDiv) => {
  const fight = document.createElement("dialog");
  //fight.innerHTML = "";
  fight.classList.add("the-fight");
  if (!fight) {
    fight = document.createElement("dialog");
    fight.classList.add("the-fight");
    fightDiv.appendChild(fight);

    // Listen for the close event to reset the modal
    fight.addEventListener("close", () => {
      fight.innerHTML = ""; // Clear the modal content
    });
  }

  const playerOneImg = document.querySelector("#playerone  img");
  const playerTwoImg = document.querySelector("#playertwo  img");

  if (!playerOneImg || !playerTwoImg) {
    console.error("One or both player images are missing.");
    return;
  }
  fight.innerHTML = `
  <div class="fighter-container">
    <img id="fighterOne" src="${
      playerOneImg.src
    }" alt="Player One" class="fighter fighter-one" data-score="${
    playerOneImg.dataset.score
  }">
    <img id="fighterTwo" src="${
      playerTwoImg.src
    }" alt="Player Two" class="fighter fighter-two" data-score="${
    playerTwoImg.dataset.score
  }">
  </div>
  <img id="winner" src="${
    playerOneImg.dataset.score > playerTwoImg.dataset.score
      ? playerOneImg.src
      : playerTwoImg.src
  }" alt="Winner" class="winner hidden">
  <button class="close-fight">Close</button>
`;

  // fight.innerHTML = `
  //   <img id=fighterOne src="${playerOneImg.src}" alt="Player data-score=${
  //   playerOneImg.dataset.score
  // } One">
  //   <img id=fighterTwo src="${playerTwoImg.src}" alt="Player data-score=${
  //   playerTwoImg.dataset.score
  // } Two">
  //  <img id=winner src="${
  //    playerOneImg.dataset.score > playerTwoImg.dataset.score
  //      ? playerOneImg.src
  //      : playerTwoImg.src
  //  }" alt="Winner">
  //   <button class="close-fight">Close</button>
  // `;

  fightDiv.appendChild(fight);

  //const openButton = document.querySelector("#start");
  // openButton.addEventListener("click", () => {

  // });
  fight.showModal();
  fight.querySelector(".close-fight").addEventListener("click", () => {
    location.reload();
  });
};
// export const renderBattle = (openButton, fightDiv) => {
//   const existingFight = fightDiv.querySelector(".the-fight");
//   if (existingFight) {
//     existingFight.showModal();
//     return;
//   }

//   const fight = document.createElement("dialog");
//   fight.classList.add("the-fight");

//   const playerOneImg = document.querySelector("#playerone img");
//   const playerTwoImg = document.querySelector("#playertwo img");

//   if (!playerOneImg || !playerTwoImg) {
//     console.error("One or both player images are missing.");
//     return;
//   }

//   fight.innerHTML = `
//   <img id="fighter-one" src="${playerOneImg.src}" alt="Player One" data-score="${playerOneImg.dataset.score}">
//   <img id="fighter-two" src="${playerTwoImg.src}" alt="Player Two" data-score="${playerTwoImg.dataset.score}">
//   <button class="close-fight">Close</button>
// `;

//   fightDiv.appendChild(fight);

//   fight.querySelector(".close-fight").addEventListener("click", () => {
//     fight.close();
//   });

//   fight.showModal(); // Open the modal immediately after rendering
// };

// const openButton = document.querySelector("#start");
// const fightDiv = document.querySelector("#fight-container");

// if (openButton && fightDiv) {
//   openButton.addEventListener("click", () => {
//     renderBattle(openButton, fightDiv);
//   });
// } else {
//   console.error("Open button or fight container is missing.");
// }
